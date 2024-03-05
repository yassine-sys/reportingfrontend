import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ChartService } from 'src/app/services/chart.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { ThemeService } from 'src/app/services/theme.service';
import * as FileSaver from 'file-saver';
import * as Highcharts from 'highcharts';
import { HIGHCHARTS_TYPES } from 'src/model/HIGHCHARTS_TYPES';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css'],
})
export class TableDialogComponent {
  parentRow: any;
  columns: string[];
  title: any;
  dataSource: MatTableDataSource<any>;
  tableData: any;
  searchActive: boolean = false;
  isoperator: boolean = false;
  iscarrier: boolean = false;
  isnested: boolean = false;
  lvl4: boolean = false;
  hasDetails: boolean = false;
  report: any;

  lvl1: any;
  lvl2: any;
  rows: any;
  idrep: any;

  filter: any;

  Highcharts = Highcharts;
  chartOptions: any;
  highchartsTypes = HIGHCHARTS_TYPES;
  chartType: any = 'table';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dt2') dataTable!: Table;

  exporting: boolean = false;
  exportProgress: number = 0;

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public service: ChartService, // @Inject(MAT_DIALOG_DATA) data: any, // private dialogRef: MatDialogRef<TableDialogComponent>
    private darkModeService: DarkModeService,
    private themeService: ThemeService
  ) {
    ////console.log(data);
    this.tableData = this.config.data;
    this.rows = this.config.data.rows;
    this.columns = this.config.data.columns;
    this.title = this.config.data.title;
    this.isoperator = this.config.data.isoperator;
    this.iscarrier = this.config.data.iscarrier;
    this.isnested = this.config.data.isnested;
    this.lvl1 = this.config.data.lvl1;
    this.lvl2 = this.config.data.lvl2;
    this.idrep = this.config.data.idrep;
    this.parentRow = this.config.data.parentRow;
    this.hasDetails = this.config.data.hasDetails;
    this.report = this.config.data.report;
    this.filter = this.config.data.filter;

    if (this.isoperator) {
      this.service.getOperatorsDest().subscribe((operators) => {
        this.updateRowsWithOperators(operators);
      });
    }

    if (this.isnested) {
      this.lvl4 = true;
    }

    this.dataSource = new MatTableDataSource<any>(this.config.data.rows);

    this.subscriptionDarkMode = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
        if (this.darkModeEnabled) {
          this.themeService.switchTheme('lara-dark-blue');
        } else {
          this.themeService.switchTheme('lara-light-blue');
        }
      }
    );
  }

  ngOnInit() {
    //console.log(this.report);
    //console.log(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //this.chartOptions = this.createChart();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  saveAsXLSX() {
    //console.log(this.parentRow);
    import('xlsx').then((xlsx) => {
      this.exporting = true;
      this.exportProgress = 0;

      const rows = this.tableData.rows;
      const title = this.title;
      const parentRow = this.parentRow; // Assuming you have a parentRow object

      // Add parentRow to each row
      const rowsWithParent = rows.map((row: any) => ({
        ...parentRow,
        ...row,
      }));
      // Convert the new data to a worksheet
      const worksheet = xlsx.utils.json_to_sheet(rowsWithParent);

      // Create the workbook
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `${title}.xlsx`);
      this.exporting = false;
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  updateRowsWithOperators(operators: any[]): void {
    const rows = this.tableData.rows;

    rows.forEach((row: { [x: string]: any }) => {
      const firstColumnValue = row[this.columns[0]]; // Get the value of the first column

      const matchingOperator = operators.find(
        (operator) => operator.id === firstColumnValue
      );

      if (matchingOperator) {
        row[this.columns[0]] = matchingOperator.nomDestination; // Replace the first column with the operator name
      }
    });

    // Update the data source
    this.dataSource.data = rows;
  }

  clear(table: Table) {
    table.clear();
    this.clearSearchInput();
  }

  clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = ''; // Clear the input value
      //this.applyFilterGlobal(); // Optionally, trigger the filter function after clearing
    }
  }
  applyFilterGlobal(event: Event) {
    if (this.dataTable) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataTable.filterGlobal(filterValue, 'contains');
    }
  }

  // checkColumnTypes(column: string): string {
  //   return typeof this.rows[0][column] === 'number' ? 'numeric' : 'text';
  // }

  checkColumnTypes(column: string): string {
    if (
      this.rows &&
      this.rows.length > 0 &&
      this.rows[0][column] !== undefined
    ) {
      return typeof this.rows[0][column] === 'number' ? 'numeric' : 'text';
    }
    return 'text'; // Default to text if unsure
  }

  createChart(chartType: any) {
    const series: any = [];
    const xAxisCategories = this.report.list_de_donnees.map(
      (row: any) => row[0]
    );

    this.report.listnamereptab
      .slice(1)
      .forEach((columnName: any, columnIndex: any) => {
        const seriesData = this.report.list_de_donnees.map(
          (row: any) => row[columnIndex + 1]
        );
        series.push({
          name: columnName,
          data: seriesData,
        });
      });

    const chartOptions = {
      chart: {
        type: chartType,
        animation: true,
        colorCount: 100,
        reflow: true,
        plotBorderWidth: 1,
        plotShadow: true,
        borderRadius: 10,
        style: {
          fontFamily: "'Open Sans', sans-serif",
        },
        zooming: {
          mouseWheel: {
            enabled: false,
          },
        },
      },
      title: {
        text: '',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      xAxis: {
        categories: xAxisCategories,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Values',
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function (
          this: Highcharts.TooltipFormatterContextObject
        ): string {
          let tooltipHtml = `<b>${this.x}</b><br/>`; // Assuming `this.x` is defined
          // Assuming `this.points` is defined and is an array
          (this.points || []).forEach((point) => {
            tooltipHtml += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b><br/>`;
          });
          return tooltipHtml;
        },
        shared: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      exporting: {
        enabled: true,
        fallbackToExportServer: false,
        libURL: 'assets/js/',
        chartOptions: {
          chart: {
            width: 1000,
            height: 800,
          },
        },
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'separator',
              'downloadPNG',
              'downloadPDF',
              'downloadSVG',
              'downloadCSV',
            ],
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: series,
    };

    // Return the chart options
    return chartOptions;
  }

  updateChartType(event: MatSelectChange) {
    this.chartType = event.value;
    this.chartOptions = this.createChart(this.chartType);
  }
}

function saveAs(blob: Blob | MediaSource, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  // Revoke the object URL after the download
  URL.revokeObjectURL(url);
}
