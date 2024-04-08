import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ChartService } from 'src/app/services/chart.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-collect-status',
  templateUrl: './collect-status.component.html',
  styleUrls: ['./collect-status.component.css'],
})
export class CollectStatusComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: Table;
  data: any[] = [];
  dataM: any[] = [];
  data1: any[] = [];
  columnNames: any[] = [];
  columns: any[] = [];
  columns2: any[] = [];
  data2: any[] = [];
  idrep: any = 0;
  statuses: any[] = [
    { label: 'UP', value: 'UP' },
    { label: 'DOWN', value: 'DOWN' },
  ];
  selectedStatus: string = '';
  cols: any[] = [
    { field: 'date', header: 'Date', filterType: 'date' },
    { field: 'name_flow', header: 'Name Flow', filterType: 'text' },
    { field: 'nbfiles', header: 'Number of Files', filterType: 'text' },
    { field: 'nbrecord', header: 'Number of Records', filterType: 'text' },
    { field: 'nbfileprocessed', header: 'Files Processed', filterType: 'text' },
    { field: 'nbfilecorrupted', header: 'Corrupted Files', filterType: 'text' },
    { field: 'average', header: 'Average', filterType: 'text' },
    { field: 'severity', header: 'Status', filterType: 'text' },
  ];

  constructor(private service: ChartService) {}

  ngOnInit() {
    this.service.getDailyEtatCollect().subscribe((response: any[]) => {
      if (response.length > 0) {
        // const filteredData = response.filter(
        //   (item) => item.frequency === 'd' || item.frequency === null
        // );
        if (response.length > 0) {
          // this.columns = Object.keys(response[0]);
          // this.columns = [...this.columns, 'Status'];
          this.columns = [
            'date',
            'name_flow',
            'name_rep',
            'switch',
            'nbfiles',
            'nbrecord',
            'nbfileprocessed',
            'nbfilecorrupted',
            'average',
            'Status',
          ];
          this.data = response.map((item) => {
            return [
              this.formatDate(item.date),
              item.name_flow === 'Interco' ? 'switch' : item.name_flow,
              item.name_rep,
              item.frequency,
              item.nbfiles,
              item.nbrecord,
              item.nbfileprocessed,
              item.nbfilecorrupted,
              item.average,
              item.nbrecord === 0 ? 'DOWN' : 'UP',
            ];
          });
        }
      } else {
        this.columns = [
          'Date',
          'Name Flow',
          'Name Rep',
          'switch',
          'Number of Files',
          'Number of Records',
          'Files Processed',
          'Corrupted Files',
          'Average',
          'Status',
        ];
        this.data = [];
      }
    });

    // this.service.getMonthlyEtatCollect().subscribe((response: any[]) => {
    //   const filteredData = response.filter((item) => item.frequency === 'm');
    //   if (filteredData.length > 0) {
    //     this.dataM = filteredData.map((item) => ({
    //       ...item,
    //       severity: item.nbrecord === 0 ? 'DOWN' : 'UP',
    //     }));
    //   }
    // });

    this.service.getEtatCollect().subscribe((response: any[]) => {
      if (response.length > 0) {
        // const filteredData = response.filter(
        //   (item) => item.frequency === 'd' || item.frequency === null
        // );
        if (response.length > 0) {
          //this.columnNames = Object.keys(response[0]);
          this.columnNames = [
            'date',
            'name_flow',
            'name_rep',
            'switch',
            'nbfiles',
            'nbrecord',
            'nbfileprocessed',
            'nbfilecorrupted',
            'average',
            'Status',
          ];
          //this.columnNames = [...this.columnNames, 'Status'];
          this.data1 = response.map((item) => {
            return [
              this.formatDate(item.date),
              item.name_flow === 'Interco' ? 'switch' : item.name_flow,
              item.name_rep,
              item.frequency,
              item.nbfiles,
              item.nbrecord,
              item.nbfileprocessed,
              item.nbfilecorrupted,
              item.average,
              item.nbrecord === 0 ? 'DOWN' : 'UP',
            ];
          });
        }
      } else {
        this.columnNames = [
          'Date',
          'Name Flow',
          'Name Rep',
          'switch',
          'Number of Files',
          'Number of Records',
          'Files Processed',
          'Corrupted Files',
          'Average',
          'Status',
        ];
        this.data1 = [];
      }
    });

    this.service.getTodayEtatCollect().subscribe((response: any[]) => {
      if (response.length > 0) {
        // const filteredData = response.filter(
        //   (item) => item.frequency === 'd' || item.frequency === null
        // );
        if (response.length > 0) {
          // this.columns2 = Object.keys(response[0]);
          // this.columns2 = [...this.columns2, 'Status'];
          this.columns2 = [
            'date',
            'name_flow',
            'name_rep',
            'switch',
            'nbfiles',
            'nbrecord',
            'nbfileprocessed',
            'nbfilecorrupted',
            'average',
            'Status',
          ];
          this.data2 = response.map((item) => {
            return [
              this.formatDate(item.date),
              item.name_flow === 'Interco' ? 'switch' : item.name_flow,
              item.name_rep,
              item.frequency,
              item.nbfiles,
              item.nbrecord,
              item.nbfileprocessed,
              item.nbfilecorrupted,
              item.average,
              item.nbrecord === 0 ? 'DOWN' : 'UP',
            ];
          });
        }
      } else {
        this.columns2 = [
          'Date',
          'Name Flow',
          'Name Rep',
          'switch',
          'Number of Files',
          'Number of Records',
          'Files Processed',
          'Corrupted Files',
          'Average',
          'Status',
        ];
        this.data2 = [];
      }
    });
  }

  filterTable(event: any, field: string) {
    this.dataTable.filter(event.target.value, field, 'contains');
  }

  filter(status: string) {
    this.dataTable.filter(status, 'severity', 'equals');
  }

  applyStatusFilter() {
    if (this.selectedStatus) {
      this.dataTable.filter(this.selectedStatus, 'severity', 'equals');
    } else {
      this.dataTable.reset();
    }
  }

  clearFilters() {
    this.selectedStatus = '';
    this.dataTable.clear();
  }

  formatDate(dateStr: string): string {
    // Assuming dateStr is in the format "YYMMDD"
    const year = '20' + dateStr.substring(0, 2); // Extract the year part
    const month = dateStr.substring(2, 4); // Extract the month part
    const day = dateStr.substring(4, 6); // Extract the day part

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  }

  exportToExcel(columns: any[], data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      columns,
      ...data,
    ]);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(dataBlob, fileName + '.xlsx');
  }
}
