import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepsComponent } from './steps/steps.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ChooseFlowComponent } from './choose-flow/choose-flow.component';
import { FieldsComponent } from './fields/fields.component';
import { ReportInfoComponent } from './report-info/report-info.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { DetailledfieldsComponent } from './detailledfields/detailledfields.component';
import { ReprapportComponent } from './reprapport/reprapport.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ListdetailledreportsComponent } from './listdetailledreports/listdetailledreports.component';

const routes: Routes = [
  {
    path: '',
    component: StepsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'choose-flow',
        component: ChooseFlowComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fields',
        component: FieldsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report-info',
        component: ReportInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'confirmation',
        component: GenerateReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detailledfields',
        component: DetailledfieldsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'reprapport',
        component: ReprapportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addreport',
        component: ReportDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listdetailledreport',
        component: ListdetailledreportsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepsRoutingModule {}
