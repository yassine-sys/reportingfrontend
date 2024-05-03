import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  HostListener,
} from '@angular/core';
//import { AuthGuard } from '../../auth.guard';
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
// import { group_module } from 'src/model/group_module';
// import { ModuleFunction } from 'src/model/ModuleFunction';
import { Observable, Subscription, filter } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { FunctionService } from 'src/app/services/function.service';
import { HttpClient } from '@angular/common/http';
import { Menu, NavService } from '../../services/nav.service';
//declare var $: any;

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
    type_Filter: this.filterType.Day,
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

  public SidebarmenuItems: any[] = [];
  menuItems$: Observable<Menu[]>;
  filterTypes = {
    Hour: 'Hour',
    Day: 'Day',
    Month: 'Month',
    Year: 'Year',
  };

  types: FilterType;

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
    private darkModeService: DarkModeService,
    private http: HttpClient,
    public navServices: NavService
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

    this.menuItems$ = this.navServices.items$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuItems$.subscribe((menuItems: any) => {
          this.SidebarmenuItems = menuItems;
          menuItems.filter((items: any) => {
            if (items.path === decodeURIComponent(event.url)) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: any) => {
              if (
                `/dashboard/${subItems.path}` === decodeURIComponent(event.url)
              ) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems: any) => {
                if (subSubItems.path === decodeURIComponent(event.url)) {
                  this.setNavActive(subSubItems);
                }
              });
            });
          });
        });
      }
    });

    // this.navServices.items.subscribe((menuItems) => {
    //   this.SidebarmenuItems = menuItems;
    //   console.log(this.SidebarmenuItems);
    //   this.router.events.subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       menuItems.filter((items) => {
    //         if (items.path === event.url) {
    //           this.setNavActive(items);
    //         }
    //         if (!items.children) {
    //           return false;
    //         }
    //         items.children.filter((subItems) => {
    //           if (subItems.path === event.url) {
    //             this.setNavActive(subItems);
    //           }
    //           if (!subItems.children) {
    //             return false;
    //           }
    //           subItems.children.filter((subSubItems) => {
    //             console.log(subSubItems.path);
    //             console.log(event.url);
    //             if (subSubItems.path === event.url) {
    //               this.setNavActive(subSubItems);
    //             }
    //           });
    //         });
    //       });
    //     }
    //   });
    // });
  }

  // Active Nave state
  setNavActive(item: any) {
    this.SidebarmenuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems: any) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item: any, event: MouseEvent) {
    event.stopPropagation();
    if (!item.active) {
      this.SidebarmenuItems.forEach((a) => {
        if (this.SidebarmenuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
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
    this.selectedFilter = this.filterType.Day;
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
        //console.log(this.user);
        this.service.userToSave.emit(this.user);
        this.service.setUser(this.user);
        this.user.role = user.role;
        this.changeDetectorRef.detectChanges();
      },
      (error: any) => {
        this.cookieService.delete('jwtToken');
      }
    );
    // this.user?.user_group?.module_groups.forEach((group) => {
    //   group.isOpen = false; // set isOpen to false for each group
    //   group.list_sub_modules.forEach((subModule) => {
    //     subModule.isOpen = false; // set isOpen to false for each sub-module
    //   });
    // });
    this.loaderService.hide();
    this.loaderService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    // this.service.getFunctions().subscribe(
    //   (data) => {
    //     this.modulesData = data;
    //     console.log(data);
    //     this.modulesData.forEach((module) => {
    //       module.isOpen = false;
    //       module.listSubModule.forEach((subModule: { isOpen: boolean }) => {
    //         subModule.isOpen = false;
    //       });
    //     });
    //   },
    //   (error) => {
    //     console.error('Error fetching functions:', error);
    //   }
    // );
  }

  logOut() {
    this.cookieService.delete('jwtToken');
    this.router.navigate(['/login']); // Navigate to the login page
  }

  updateFilters() {
    console.log(this.form.valid);
    console.log(this.selectedFilter);
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
        type_Filter: this.isPerHour ? FilterType.Custom : this.selectedFilter,
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

  // Method to handle the redirection onclick
  redirectToExternalLink(url: string): void {
    // Use the Router to navigate to the external URL
    window.open(url, '_blank');

    // this.http
    //   .get<boolean>('http://10.156.35.98:9998/RaftoolsReporting/rest/login/add')
    //   .subscribe(
    //     (response) => {
    //       // Check the response value (true or false)
    //       if (response === true) {
    //         // Redirect to a specific route if the response is true
    //         window.open(
    //           '10.156.35.98:9998/RaftoolsReporting/pages/config/validateRep.jsf',
    //           '_blank'
    //         );
    //       } else {
    //         // Redirect to a different route if the response is false
    //         this.router.navigate(['unauthorized']);
    //       }
    //     },
    //     (error) => {
    //       // Handle the HTTP request error and redirect to 'unauthorized' route
    //       console.error('HTTP request error:', error);
    //       this.router.navigate(['unauthorized']);
    //     }
    //   );
  }

  public width: any = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth - 500;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
