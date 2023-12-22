import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { User } from '../../../model/User';
import { group_module } from '../../../model/group_module';
import { UserService } from '../../services/user.service';
import { GroupModuleService } from '../../services/group-module.service';
import { Role } from 'src/model/Role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent implements OnInit {
  user!: User;
  selectedRole: Role = { id: 0, role: '' };
  //selectedGroup: group_module | null = null;
  groups$: Observable<group_module[]> | undefined;
  etatOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];
  roles = [
    { id: 0, role: 'Admin' },
    { id: 1, role: 'User' },
  ];

  selectedGroup: group_module = {
    gId: 0,
    gName: '',
    gDescription: '',
    dateCreation: new Date(),
    dateModif: new Date(NaN),
    idCreateur: 0,
    nomUtilisateur: '',
    etat: '',
    module_groups: [],
    liste_function: [],
    groupUsers: [],
  };

  constructor(
    private userService: UserService,
    private grpService: GroupModuleService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.groups$ = this.grpService.getGroup();

    if (this.data.isEdit) {
      this.user = { ...this.data.user };
      this.user.password = '';
      const foundRole = this.roles.find(
        (role) => role.role === this.data.user.role.role
      );
      this.selectedRole = foundRole || { id: 0, role: '' };
      this.selectedGroup = this.data.user.user_group || this.selectedGroup;
    } else {
      this.user = {
        uId: 0,
        username: '',
        dateCreation: new Date(),
        dateModif: new Date(NaN),
        etat: '',
        idCreateur: 0,
        nomUtilisateur: '',
        uDepart: '',
        uLogin: '',
        uMail: '',
        uMatricule: '',
        password: '',
        user_group: null,
        role: null,
      };
    }
  }

  saveUser(): void {
    const currentDate = new Date();
    if (this.data.isEdit) {
      this.user.dateModif = currentDate;
      this.user.user_group = null;
      this.userService.updateUser(this.user, this.selectedGroup?.gId).subscribe(
        (result) => {
          this.toastr.success('User updated successfully', 'Success');
          this.dialogRef.close(result);
        },
        (error) => {
          this.toastr.error('Error updating user', 'Error');
          console.error('Error updating user:', error);
        }
      );
    } else {
      //this.user.user_group = this.selectedGroup!;
      this.user.role = this.selectedRole;
      this.userService.addUser(this.user, this.selectedGroup?.gId).subscribe(
        (result) => {
          this.toastr.success('User added successfully', 'Success');
          this.dialogRef.close(result);
        },
        (error) => {
          this.toastr.error('Error adding user', 'Error');
          console.error('Error adding user:', error);
        }
      );
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onGroupSelectionChange(selectedGroup: group_module): void {
    this.selectedGroup = selectedGroup;
  }

  compareGroupFn(group1: group_module, group2: group_module): boolean {
    return group1 && group2 ? group1.gId === group2.gId : group1 === group2;
  }
}
