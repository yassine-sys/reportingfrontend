import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepsComponent } from './steps/steps.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ChooseFlowComponent } from './choose-flow/choose-flow.component';
import { FieldsComponent } from './fields/fields.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepsRoutingModule {}
