import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/model/User';
import { FilterService } from '../../services/filter.service';
import { Filters } from 'src/model/Filters';
import { FilterType } from 'src/model/FilterType';
import { Module } from 'src/model/Module';
import { SubModule } from 'src/model/SubModule';
import { LoaderService } from '../../services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { group_module } from 'src/model/group_module';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { FunctionService } from 'src/app/services/function.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  chartInstances: any[] = [];
  body = document.getElementsByTagName('body')[0];
  title = 'reporting';
  isAuth: boolean = false;
  user!: User;
  currentPath!: string;
  routess!: any;
  pushme: boolean = false;
  opened: boolean = false;
  openedM: boolean = false;
  playlist: boolean = false;

  filterType = FilterType;
  startDate!: Date | null;
  endDate!: Date | null;
  selectedFilter!: FilterType;
  isVaration = false;
  isPerHour = false;
  startHour!: any | null;
  endHour!: any | null;
  filtred: Filters = {
    startDate: null,
    endDate: null,
    idfunction: 0,
    type_Filter: this.filterType.None,
    isVaration: false,
    isPerHour: false,
    startHour: null,
    endHour: null,
  };
  form!: FormGroup;
  menuItems: any[] = [];
  description: String = 'test';
  isLoading: boolean = false;

  modulesData: any[] = [];

  private subscriptions: Subscription[] = [];
  private subscription: Subscription;
  darkModeEnabled: boolean = true;

  currentUrl!: string;

  playlists: any;
  constructor(
    private service: AuthService,
    private playListService: FunctionService,
    private router: Router,
    private route: ActivatedRoute,
    public filterService: FilterService,
    private cookieService: CookieService,
    public loaderService: LoaderService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef,
    private darkModeService: DarkModeService
  ) {
    this.subscription = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
      }
    );
    this.form = this.fb.group(
      {
        selectedFilter: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        startHour: [null],
        endHour: [null],
      },
      {
        validator: this.dateValidator,
      }
    );
  }

  toggleDarkMode() {
    this.darkModeService.setDarkMode(this.darkModeEnabled);
    this.updateBodyClass();
  }

  updateBodyClass(): void {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkModeEnabled) {
      body.className =
        'sidebar-mini layout-fixed layout-navbar-fixed dark-mode';
    } else {
      body.className = 'sidebar-mini layout-fixed layout-navbar-fixed';
    }
  }

  ngOnInit(): void {
    this.getCurrentUrl();
    this.loadPlayLists();
    //console.log(this.route.snapshot)
    this.pushme = false;
    // set isOpen to false for all modules
    this.loaderService.show();
    this.loaderService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    // if(this.service.getToken()){
    //   this.service.checkToken().subscribe(
    //     (result: boolean) => {
    //       this.isAuth = result;
    //     },
    //     (error: any) => {
    //       console.log(error);
    //     }
    //   );
    // }
    this.service.getUser().subscribe(
      (user: User) => {
        this.user = user;
        console.log(this.user);
        this.service.userToSave.emit(this.user);
        this.service.setUser(this.user);
        this.user.role = user.role;
      },
      (error: any) => {
        this.cookieService.delete('jwtToken');
      }
    );
    this.user?.user_group?.module_groups.forEach((group) => {
      group.isOpen = false; // set isOpen to false for each group
      group.list_sub_modules.forEach((subModule) => {
        subModule.isOpen = false; // set isOpen to false for each sub-module
      });
    });
    this.loaderService.hide();
    this.loaderService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    this.service.getFunctions().subscribe(
      (data) => {
        this.modulesData = data;
        console.log(data);
        this.modulesData.forEach((module) => {
          module.isOpen = false;
          module.listSubModule.forEach((subModule: { isOpen: boolean }) => {
            subModule.isOpen = false;
          });
        });
      },
      (error) => {
        console.error('Error fetching functions:', error);
      }
    );
  }

  logOut() {
    this.cookieService.delete('jwtToken');
    this.router.navigate(['/login']); // Navigate to the login page
  }

  updateFilters() {
    if (this.form.valid) {
      const startDate =
        typeof this.startDate === 'string'
          ? new Date(this.startDate)
          : this.startDate;
      const endDate =
        typeof this.endDate === 'string'
          ? new Date(this.endDate)
          : this.endDate;

      const filtred: Filters = {
        startDate: this.formatDateToString(startDate),
        endDate: this.formatDateToString(endDate),
        type_Filter: this.selectedFilter,
        isVaration: this.isVaration,
        isPerHour: this.isPerHour,
        startHour: this.startHour ? this.startHour.split(':')[0] : null,
        endHour: this.endHour ? this.endHour.split(':')[0] : null,
        idfunction: 0,
      };

      this.filterService.updateFilters(filtred);
      this.filterService.updateFiltersUSer(filtred);
      //this.filterService.filtredUpdatedFunctionChart.next(filtred);
    }
  }

  formatDateToString(date: Date | null): string | null {
    if (!date) {
      return null;
    }

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  toggleModuleGroup(moduleGroup: Module) {
    moduleGroup.isOpen = !moduleGroup.isOpen;
  }

  toggleSubModule(subModule: SubModule) {
    subModule.isOpen = !subModule.isOpen;
  }

  toggleModuleOpen(module: any) {
    module.isOpen = !module.isOpen;
  }

  toggleSubModuleOpen(subModule: any) {
    subModule.isOpen = !subModule.isOpen;
  }

  toggle() {
    this.opened = !this.opened;
  }

  toggleM() {
    this.openedM = !this.openedM;
  }

  pushMe() {
    this.pushme = true;
  }

  togglePlaylist() {
    this.playlist = !this.playlist;
  }

  dateValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate) {
      if (startDate > endDate) {
        return { invalidDateRange: true };
      }
    }
    return null;
  }

  formatHour(hour: number): string {
    return hour.toString().padStart(2, '0');
  }

  openSidebar() {
    // Code to open the sidebar and make changes
    this.opened = !this.opened;

    // Trigger change detection
    this.changeDetectorRef.detectChanges();

    // Trigger reflow after a slight delay to allow for sidebar transition
    setTimeout(() => {
      this.chartInstances.forEach((chart) => {
        if (chart) {
          chart.reflow();
        }
      });
    }, 300);

    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    // Clear the properties of the filtred object
    this.filtred.startDate = null;
    this.filtred.endDate = null;
    this.filtred.idfunction = 0;
    this.filtred.type_Filter = FilterType.None;
    this.filtred.isVaration = false;
    this.filtred.isPerHour = false;
    this.filtred.startHour = null;
    this.filtred.endHour = null;
    this.chartInstances = [];
    this.subscription.unsubscribe();
    const body = document.getElementsByTagName('body')[0];
    body.className = 'sidebar-mini layout-fixed layout-navbar-fixed';
  }

  ngAfterViewInit() {}

  getCurrentUrl(): void {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;

    this.currentUrl =
      `${protocol}//${hostname}${port ? ':' + port : ''}` +
      '/RaftoolsReporting/pages/config/validateRep.jsf';
  }

  loadPlayLists() {
    this.playListService.getAllPlayLists().subscribe((response) => {
      this.playlists = response;
    });
  }
}
