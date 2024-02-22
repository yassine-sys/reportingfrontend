import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map: L.Map;
  markerCluster: L.MarkerClusterGroup;
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

  constructor(private http: HttpClient, private chartService: ChartService) {}

  ngOnInit(): void {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    this.getMapLocations(today, yesterday);
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
  }

  getMapLocations(startDate: any, endDate: any): void {
    this.startDate = startDate;
    this.endDate = endDate;

    startDate = this.formatDate(new Date(startDate));
    endDate = this.formatDate(new Date(endDate));

    if (this.markerCluster) {
      this.markerCluster.clearLayers();
    }
    this.chartService
      .getMapLocation(startDate, endDate, this.typeCall, this.order, this.limit)
      .subscribe((locations: any) => {
        this.addMarkers(
          locations.filter(
            (location: any) => location.latitude && location.longitude
          )
        );
      });
  }

  addMarkers(locations: any[]): void {
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: this.markerIcon,
      }).bindPopup(this.generatePopupContent(location));

      this.markerCluster.addLayer(marker);
    });
  }

  generatePopupContent(location: any): string {
    return `<b>Site ID:</b> ${location.site_id || 'N/A'}<br>
            <b>Duration:</b> ${location.duration.toFixed(2)} min<br>
            <b>Call Count:</b> ${location.call_count}<br>
            <b>Subscribers:</b> ${location.subscribers}`;
  }

  setOrder(order: string): void {
    this.order = order;
  }
}
