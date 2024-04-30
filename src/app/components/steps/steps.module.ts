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

@NgModule({
  declarations: [StepsComponent, ChooseFlowComponent, FieldsComponent],
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
  ],
})
export class StepsModule {}
