import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { ChartService } from 'src/app/services/chart.service';
import { ExcelServiceService } from 'src/app/services/excel.service';
import 'leaflet.heat';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  locations: any;
  map: L.Map;
  markerCluster: L.MarkerClusterGroup;
  heatLayer: L.HeatLayer;
  markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
  });
  osmMapnik = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '',
    }
  );

  osmHOT = L.tileLayer(
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '',
    }
  );

  esriWorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: '',
    }
  );
  cartoDBVoyager = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  );
  baseMaps = {
    OpenStreetMap: this.osmMapnik,
    'OpenStreetMap HOT': this.osmHOT,
    'Esri World Imagery': this.esriWorldImagery,
    'CartoDB Voyager': this.cartoDBVoyager,
  };

  typeCalls: any[] = [
    { label: 'SMSMO', value: 'SMSMO' },
    { label: 'SMSMT', value: 'SMSMT' },
    { label: 'MO', value: 'MO' },
    { label: 'MT', value: 'MT' },
  ];
  orderOptions: any[] = [
    { label: 'Top', value: 'desc' },
    { label: 'Bot', value: 'asc' },
  ];
  todayStr: string;
  yesterdayStr: string;
  typeCall: string = 'MO';
  order: string = 'desc';
  limit = 100;
  startDate: any;
  endDate: any;
  typeCdr: any;
  heatMapEnabled: boolean = false;
  minCallCount: any;
  maxCallCount: any;
  colorScale: any;

  private markerDataMap: Map<L.Marker, any> = new Map();
  constructor(
    private http: HttpClient,
    private chartService: ChartService,
    private excelService: ExcelServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.typeCdr = params['type'];
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));
      this.getMapLocations(today, yesterday, true);
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of year
    let month = (date.getMonth() + 1).toString(); // Get month (0-11, thus add 1)
    let day = date.getDate().toString();

    // Ensure month and day are two digits
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');

    return `${year}${month}${day}`;
  }

  formatDate2(date: Date): string {
    const year = date.getFullYear().toString(); // Get last two digits of year
    let month = (date.getMonth() + 1).toString(); // Get month (0-11, thus add 1)
    let day = date.getDate().toString();

    // Ensure month and day are two digits
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');

    return `${day}/${month}/${year}`;
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const center = L.latLng(26.3351, 17.2283);
    this.map = L.map('map', {
      center,
      zoom: 5,
      layers: [this.osmMapnik],
    });

    L.control.layers(this.baseMaps).addTo(this.map);
    this.markerCluster = new L.MarkerClusterGroup().addTo(this.map);

    this.heatLayer = L.heatLayer([], {
      radius: 25,
      blur: 15,
      gradient: {
        0.2: 'blue',
        0.5: 'lime',
        0.9: 'red',
      },
    }).addTo(this.map);

    this.markerCluster.on('clustermouseover', (e) => {
      let sumDurations = 0;
      let sumSubs = 0;
      let sumCall = 0;

      e.layer.getAllChildMarkers().forEach((marker: any) => {
        const data = this.markerDataMap.get(marker);
        if (data) {
          sumDurations += parseFloat(data.duration) || 0;
          sumSubs += parseFloat(data.subscribers) || 0;
          sumCall += parseInt(data.call_count, 10) || 0;
        }
      });

      const popupContent = `
        <b>Total Duration:</b> ${sumDurations.toFixed(2)} min<br>
        <b>Total Call Count:</b> ${sumCall}<br>
        <b>Total Subscribers:</b> ${sumSubs}`;

      // Show popup at the cluster's position
      L.popup()
        .setLatLng(e.layer.getLatLng())
        .setContent(popupContent)
        .openOn(this.map);
    });

    const toggleHeatmapControl = L.Control.extend({
      options: {
        position: 'topright',
      },
      onAdd: (map: L.Map) => {
        const div = L.DomUtil.create('div', 'toggle-heatmap-control');
        const button = L.DomUtil.create('button', '', div);
        button.innerHTML = 'Heatmap';
        button.onclick = () => {
          this.toggleHeatmap();
        };

        return div;
      },
    });
    new toggleHeatmapControl().addTo(this.map);
  }

  toggleHeatmap(): void {
    this.heatMapEnabled = !this.heatMapEnabled;
    this.updateHeatmapLayer();
  }

  updateHeatmapLayer(): void {
    this.heatLayer.setLatLngs([]);
    this.markerCluster.clearLayers();
    this.addMarkers(
      this.locations.filter(
        (location: any) => location.latitude && location.longitude
      )
    );

    if (this.heatMapEnabled) {
      // Logic to show heatmap
      const heatMapData = this.locations
        .filter((loc: any) => loc.latitude && loc.longitude)
        .map((loc: any) => {
          const intensities = this.locations.map((loc: any) => loc.call_count);
          const maxIntensity = Math.min(...intensities);
          this.minCallCount = Math.min(...intensities);
          this.maxCallCount = Math.max(...intensities);

          const intensity = this.exponentialScale(loc.call_count, maxIntensity);
          return [loc.latitude, loc.longitude, intensity];
        });

      this.heatLayer.setLatLngs(heatMapData);
      //console.log(this.locations.length);
    }
  }

  exponentialScale(value: any, min: number = 1) {
    if (value < min) {
      value = min;
    }
    return Math.log(value);
  }

  getMapLocations(startDate: any, endDate: any, onStart: boolean): void {
    const limit = onStart ? -1 : this.limit;

    this.startDate = startDate;
    this.endDate = endDate;

    startDate = this.formatDate(new Date(startDate));
    endDate = this.formatDate(new Date(endDate));

    if (this.markerCluster) {
      this.markerCluster.clearLayers();
    }
    this.chartService
      .getMapLocation(
        startDate,
        endDate,
        this.typeCall,
        this.order,
        limit,
        this.typeCdr
      )
      .subscribe((locations: any) => {
        this.locations = locations;
        this.updateHeatmapLayer();
      });
  }

  addMarkers(locations: any[]): void {
    this.markerCluster.clearLayers();
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: this.markerIcon,
      }).bindPopup(this.generatePopupContent(location));

      // Store location data (including duration, call_count, and subscribers) with the marker
      this.markerDataMap.set(marker, location);

      this.markerCluster.addLayer(marker);
    });
  }

  toglleHeatMap() {
    this.heatMapEnabled = !this.heatMapEnabled;
  }

  generatePopupContent(location: any): string {
    return `<b>Site ID:</b> ${location.site_id || 'N/A'}<br>
            <b>Technology:</b> ${location.technology}<br>
            <b>Duration:</b> ${location.duration.toFixed(2)} min<br>
            <b>Call Count:</b> ${location.call_count}<br>
            <b>Subscribers:</b> ${location.subscribers}`;
  }

  setOrder(order: string): void {
    this.order = order;
  }

  exportExcel(): void {
    const fileToExport = this.locations.map((items: any) => {
      return {
        site_id: items?.site_id,
        latitude: items?.latitude,
        longitude: items?.longitude,
        subscribers: items?.subscribers,
        call_count: items?.call_count,
        duration: items?.duration,
      };
    });

    this.excelService.exportToExcel(
      fileToExport,
      `${this.order == 'desc' ? 'TOP-' : 'BOT-'}${this.limit}-${
        this.typeCall
      }-National-Roaming-Traffic-${this.formatDate2(
        this.startDate
      )}-${this.formatDate2(this.endDate)}`
    );
  }
}
