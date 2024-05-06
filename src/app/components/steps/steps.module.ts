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
  ],
})
export class StepsModule {}
