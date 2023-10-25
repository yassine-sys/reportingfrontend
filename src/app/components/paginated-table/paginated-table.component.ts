import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { ChartService } from 'src/app/services/chart.service';
import { MatSort } from '@angular/material/sort';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { FunctionChartsComponent } from '../function-charts/function-charts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';
import { FunctionService } from 'src/app/services/function.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements AfterViewInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() idrep: any[] = [];
  @Input() title!: String;
  
  dataSource: MatTableDataSource<any>;
  selectedRow: any;
  searchActive: boolean = false;

  newCols:any[]=['date_appel' ,'voice' ,'sms' ,'data' ,'roaming' , 'offer' , 'transert' ,'com' ,'loan' ,'evd' ,'mobile_money' , 'total']
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FunctionChartsComponent) func!: FunctionChartsComponent;
  
  @Output() commentAdded = new EventEmitter<void>();
  
  constructor(public dialog: MatDialog, public chartService: ChartService,
    private route: ActivatedRoute,
    private router:Router,
    private filterService:FilterService,
    private userService:UserService,
    private service:AuthService,
    private toastr: ToastrService,
    private loaderService:LoaderService,
    private functionService:FunctionService,
    private changeDetectorRef: ChangeDetectorRef,
    private commentService: CommentService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  
  ngOnChanges(): void {
    if (this.columns.length === 0 || this.columns[0] === "") {
      // Use newCols when listenamereptab is empty or undefined
      this.columns = this.newCols;
    }
    this.dataSource.data = this.transformData(this.data, this.columns);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  
  transformData(data: any[], columns: string[]): any[] {
    if (columns.includes('"Impact(dinar)"')) {
      return data.filter(row => row[columns.indexOf('"Impact(dinar)"')] > 0)
        .map(row => {
          let obj: { [key: string]: any } = {};
          row.forEach((cell: any, index: any) => {
            obj[columns[index]] = cell;
          });
          return obj;
        });
    } else {
      return data.map(row => {
        let obj: { [key: string]: any } = {};
        row.forEach((cell: any, index: any) => {
          obj[columns[index]] = cell;
        });
        
        return obj;
      });
    }
  }
  
  
  
  
 formatNumber(value: any): string {
    if (typeof value === 'number') {
      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      };
      const formattedValue = value.toLocaleString('en-GB', options);
      const parts = formattedValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      const newValue = parts.join('.').replace(/,/g, ' '); // Replace commas with spaces
  
      return newValue;
    }
    return value;
  }
  
  
  openDialog(row: any): void {
    if (this.title ==='LCR Alert') {
      const dialogRef = this.dialog.open(CommentFormComponent, {
        width: '400px', // Adjust the width as needed
        data: {data:row} // You can pass data to the dialog if needed
      });
  
      dialogRef.afterClosed().subscribe((comment: string) => {
        // this.commentAdded.emit();
        // let func1 =new FunctionChartsComponent(this.chartService,this.route,this.router,this.filterService,this.dialog,this.userService,this.service,this.toastr,this.loaderService,this.functionService,this.changeDetectorRef)
        // func1.ngOnInit()
        
      });
    }
    // Fetch data from the API
    else{
      this.chartService.getDetails(this.idrep, row[this.columns[0]]).subscribe(response => {
        const columns = response.listnamereptab;
        const data = response.list_de_donnees.map((d: any) => {
          let obj: { [key: string]: any } = {};
          d.forEach((cell: any, index: any) => {
            obj[columns[index]] = cell;
          });
          return obj;
        });
    
        this.dialog.open(TableDialogComponent, {
          data: {
            columns,
            rows: data,
            title: this.title
          }
        });
      });
    }
  }
  
  selectRow(row: any) {
    this.selectedRow = row;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  

  
  
}
