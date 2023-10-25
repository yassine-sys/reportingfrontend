import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-collect-status',
  templateUrl: './collect-status.component.html',
  styleUrls: ['./collect-status.component.css']
})
export class CollectStatusComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: Table;
  data: any[] = [];
  dataM: any[] = [];
  statuses: any[] = [
    { label: 'UP', value: 'UP' },
    { label: 'DOWN', value: 'DOWN' }
  ];
  selectedStatus: string = '';
  cols: any[] = [
    { field: 'date', header: 'Date' },
    { field: 'name_flow', header: 'Name Flow' },
    { field: 'nbfiles', header: 'Number of Files' },
    { field: 'nbrecord', header: 'Number of Records' },
    { field: 'nbfileprocessed', header: 'Files Processed' },
    { field: 'nbfilecorrupted', header: 'Corrupted Files' },
    { field: 'average', header: 'Average' },
  ];

  constructor(private service: ChartService) {}

  ngOnInit() {
    this.service.getDailyEtatCollect().subscribe((response: any[]) => {
      // Filter items where frequency is 'd'
      this.data = response
        .filter(item => item.frequency === 'd')
        .map(item => ({
          ...item,
          severity: item.nbrecord === 0 ? 'DOWN' : 'UP',
        }));
    });

    this.service.getMonthlyEtatCollect().subscribe((response: any[]) =>{
      this.dataM = response
      .filter(item=>item.frequency === 'm')
      .map(item=>({
        ...item,
        severity: item.nbrecord === 0 ? 'DOWN' : 'UP',
      }))
    })
    
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
}
