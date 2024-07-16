import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepsRoutingModule } from './steps-routing.module';
import { StepsModule as STM } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { StepsComponent } from './steps/steps.component';
import { ChooseFlowComponent } from './choose-flow/choose-flow.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FieldsComponent } from './fields/fields.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportInfoComponent } from './report-info/report-info.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { QuerybuilderComponent } from './querybuilder/querybuilder.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { TreeTableModule } from 'primeng/treetable';
import { DetailledfieldsComponent } from './detailledfields/detailledfields.component';
import { ReprapportComponent } from './reprapport/reprapport.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ListdetailledreportsComponent } from './listdetailledreports/listdetailledreports.component';
import { AssigndialogComponent } from './assigndialog/assigndialog.component';
import { IgxQueryBuilderModule } from 'igniteui-angular';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { ShowreportComponent } from './showreport/showreport.component';
import { QuerymodalComponent } from './querymodal/querymodal.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OperationQueryComponent } from './operation-query/operation-query.component';
import { FiltreOperationComponent } from './filtre-operation/filtre-operation.component';
import { CustomComponent } from './custom/custom.component';
import { CustomdialogComponent } from './customdialog/customdialog.component';
import { GenerateCustomiseComponent } from './generate-customise/generate-customise.component';
import { OperationComponent } from './operation/operation.component';
import { ReportinfoComponent } from './reportinfo/reportinfo.component';
import { QuerybuilderCComponent } from './querybuilder-c/querybuilder-c.component';
import { ReportassignComponent } from '../reportassign/reportassign.component';

@NgModule({
  declarations: [
    StepsComponent,
    ChooseFlowComponent,
    FieldsComponent,
    ReportInfoComponent,
    GenerateReportComponent,
    QuerybuilderComponent,
    DetailledfieldsComponent,
    ReprapportComponent,
    ReportDetailsComponent,
    ListdetailledreportsComponent,
    AssigndialogComponent,
    ShowreportComponent,
    QuerymodalComponent,
    OperationQueryComponent,
    FiltreOperationComponent,
    CustomComponent,
    CustomdialogComponent,
    GenerateCustomiseComponent,
    OperationComponent,
    ReportinfoComponent,
    QuerybuilderCComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StepsRoutingModule,
    STM,
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatDialogModule,
    TreeTableModule,
    ToastrModule.forRoot(),
    IgxQueryBuilderModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    HighchartsChartModule,
    MessagesModule,
    MessageModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [DialogService],
})
export class StepsModule {}
