import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { GroupModuleService } from 'src/app/services/group-module.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { Module } from 'src/model/Module';
import { SubModule } from 'src/model/SubModule';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assignfunctiondialog',
  templateUrl: './assignfunctiondialog.component.html',
  styleUrls: ['./assignfunctiondialog.component.css'],
  providers: [MessageService],
})
export class AssignfunctiondialogComponent {
  idGrp: any;
  fonctions: any;
  selectedFonction: any;
  modules: any[] = [];

  selectedModule!: Module;
  selectedSubModule!: SubModule;
  selectedFunctions!: any[];

  constructor(
    //public dialogRef: MatDialogRef<AssignfunctiondialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private functionService: FunctionService,
    private groupModuleService: GroupModuleService,
    private moduleService: ModuleServicesService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.idGrp = this.config.data.groupId;
  }

  onAssignClick(): void {
    if (this.selectedFunctions && this.selectedFunctions.length > 0) {
      this.groupModuleService
        .addModuleToGroup(this.idGrp, this.selectedModule.id)
        .subscribe(
          () => {},
          (error) => {
            console.error('Error occurred while assigning module:', error);
          }
        );
      let successCount = 0;
      //console.log(this.selectedFunctions);

      this.selectedFunctions.forEach((selectedFunction) => {
        const functionId = selectedFunction.id;

        this.groupModuleService
          .addFonctionToGroup(this.idGrp, functionId)
          .subscribe(
            () => {
              console.log(`Function ${functionId} assigned successfully`);
              successCount++;

              // Show success toast for each function
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Function ${functionId} assigned successfully`,
              });

              if (successCount === this.selectedFunctions.length) {
                console.log('All functions assigned successfully');
                // Show a summary toast message
                this.messageService.add({
                  severity: 'success',
                  summary: 'All Done',
                  detail: 'All functions have been assigned successfully',
                });
                this.onCloseDialog();
              }
            },
            (error) => {
              console.error(
                `Error occurred while assigning function ${functionId}:`,
                error
              );
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to assign function ${functionId}`,
              });
            }
          );
      });
    } else {
      console.warn('No functions selected for assignment');
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No functions selected for assignment',
      });
    }
  }

  ngOnInit(): void {
    this.functionService.getAllFunction().subscribe((data) => {
      this.fonctions = data;
    });

    this.moduleService.getAllModules().subscribe((resp) => {
      this.modules = resp;
      console.log(this.modules);
    });
  }

  getSubModules() {
    return this.selectedModule ? this.selectedModule.list_sub_modules : [];
  }

  getFunctions() {
    return this.selectedSubModule ? this.selectedSubModule.functions : [];
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
