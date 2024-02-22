import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { Module } from 'src/model/Module';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-submoduleform',
  templateUrl: './submoduleform.component.html',
  styleUrls: ['./submoduleform.component.css'],
})
export class SubmoduleformComponent implements OnInit {
  moduleId: any;
  addSubmoduleForm!: FormGroup;
  modules: Module[] = [];
  moduleCtrl = new FormControl();
  filteredModules!: Observable<Module[]>;
  selectedModule: any;

  constructor(
    private formBuilder: FormBuilder,
    private submoduleService: SubmoduleService,
    private moduleService: ModuleServicesService,
    private dialogRef: MatDialogRef<SubmoduleformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.moduleId = data.idmodule;
  }

  ngOnInit(): void {
    this.addSubmoduleForm = this.formBuilder.group({
      subModuleName: ['', Validators.required],
      moduleId: ['', Validators.required],
    });

    this.moduleService.getAllModules().subscribe(
      (data) => {
        this.modules = data;
        if (this.moduleId) {
          const foundModule = this.modules.find(
            (module) => module.id === this.moduleId
          );
          if (foundModule) {
            this.selectedModule = foundModule;
            console.log(foundModule);
            this.addSubmoduleForm.patchValue({
              subModuleName: '',
              moduleId: this.moduleId,
            });
          }
        }
      },
      (error) => {
        console.log('Error retrieving modules', error);
      }
    );

    this.filteredModules = this.moduleCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterModules(value))
    );
  }

  onSubmit(): void {
    console.log(this.selectedModule);
    // if (this.addSubmoduleForm.invalid || !this.moduleCtrl.value) {
    //   return;
    // }

    // const selectedModule = this.moduleCtrl.value;
    const newSubmodule = {
      subModuleName: this.addSubmoduleForm.controls['subModuleName'].value,
      module: {
        id: this.selectedModule.id,
      },
    };

    this.submoduleService.addSubmodule(newSubmodule).subscribe(
      (response) => {
        console.log('New submodule added:', response);
        this.dialogRef.close();
        // handle success
      },
      (error) => {
        console.error('Error adding submodule:', error);
        // handle error
      }
    );
  }

  private _filterModules(value: string): Module[] {
    const filterValue = value.toLowerCase();
    return this.modules.filter((module) =>
      module.moduleName.toLowerCase().includes(filterValue)
    );
  }
}
