import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { FunctionService } from 'src/app/services/function.service';
import { UserRapportsComponent } from '../user-rapports/user-rapports.component';
import { ListUserRapportsComponent } from '../list-user-rapports/list-user-rapports.component';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { Table } from 'primeng/table';
import { finalize, forkJoin, mergeMap, of } from 'rxjs';
import { GroupModuleService } from 'src/app/services/group-module.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css'],
})
export class UserManagmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'uId',
    'username',
    'dateCreation',
    'etat',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private groupService: GroupModuleService
  ) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dt') dataTable!: Table;
  loading: boolean = false;

  users: User[] = [];
  ngOnInit() {
    this.loading = true;
    this.userService
      .getAllUsers()
      .pipe(
        // Map over each user to potentially fetch their group
        mergeMap((users: User[]) => {
          // Create an array of observables for each user to fetch their group if necessary
          const userObservables = users.map((user) => {
            if (typeof user.user_group === 'number') {
              return this.groupService.getGroupById(user.user_group).pipe(
                mergeMap((group) => {
                  user.user_group = group; // Replace the user_group number with the actual group object
                  return of(user); // Return the modified user as an Observable
                })
              );
            } else {
              return of(user); // If not a number, return the user as is
            }
          });
          // Combine all user (and potentially group) observables
          return forkJoin(userObservables);
        }),
        finalize(() => {
          this.loading = false; // Set loading to false when the stream is complete
        })
      )
      .subscribe((usersWithGroups: User[]) => {
        console.log(usersWithGroups);
        this.users = usersWithGroups;
        this.dataSource = new MatTableDataSource(usersWithGroups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort || null;
      });
  }
  ngAfterViewInit() {}

  editUser(user: User) {
    console.log('edit:', user);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '350px',
      data: { user, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this user?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          (res) => {
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  openForm(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '350px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  assignForm(): void {
    const dialogRef = this.dialog
      .open(UserRapportsComponent, {
        width: '350px',
        data: {},
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  userRapports(user: User) {
    const dialogRef = this.dialog.open(ListUserRapportsComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  clear(table: Table) {
    table.clear();
    this.clearSearchInput();
  }

  clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = ''; // Clear the input value
      //this.applyFilterGlobal(); // Optionally, trigger the filter function after clearing
    }
  }

  applyFilterGlobal(event: Event) {
    if (this.dataTable) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataTable.filterGlobal(filterValue, 'contains');
    }
  }
}
