/** @format */

import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent, map, firstValueFrom } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from './auth.service';
import { FunctionService } from './function.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  open?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  managementModule: Menu = {
    title: 'Management',
    icon: 'sliders', // Replace with the actual icon
    type: 'sub',
    children: [
      {
        path: 'users',
        title: 'User Management',
        icon: 'users',
        type: 'link',
      },
      {
        path: 'group',
        title: 'Group Management',
        icon: 'settings',
        type: 'link',
      },
      {
        path: 'modules',
        title: 'Module Management',
        icon: 'airplay',
        type: 'link',
      },
      {
        path: '/management/add-report',
        title: 'Add Report',
        icon: 'plus-circle',
        type: 'link',
      },
    ],
  };
  monetoring: Menu = {
    title: 'Monitoring',
    icon: 'airplay', // Replace with the actual icon
    type: 'sub',
    children: [
      {
        path: 'collect',
        title: 'Collect Status',
        icon: 'archive',
        type: 'link',
      },
      {
        path: 'missing-files',
        title: 'Missing Files',
        icon: 'file-minus',
        type: 'link',
      },
      {
        path: `/dashboard/function/charts/${892017}`,
        title: 'Duplicated CDRs',
        icon: 'file-text',
        type: 'link',
      },
    ],
  };

  map: Menu = {
    title: 'Map Location',
    icon: 'map', // Replace with the actual icon
    type: 'sub',
    children: [
      {
        path: 'map/roa',
        title: 'Roaming',
        icon: 'navigation',
        type: 'link',
      },
      {
        path: 'map/natroa',
        title: 'National Roaming',
        icon: 'navigation',
        type: 'link',
      },
      {
        path: 'map/local',
        title: 'Local',
        icon: 'navigation',
        type: 'link',
      },
    ],
  };
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  modulesData: any[] = [];
  menuItems: Menu[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private authService: AuthService,
    private playListService: FunctionService,
    private loaderService: LoaderService
  ) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }

    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });

    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
    this.fetchModulesAndFunctions();
  }

  async fetchModulesAndFunctions() {
    try {
      const data = await firstValueFrom(this.authService.getFunctions());
      this.modulesData = data;
      this.menuItems = this.convertApiResponseToMenuItems(this.modulesData);
      //this.menuItems.unshift(this.map);
      this.menuItems.unshift(this.monetoring);
      this.menuItems.unshift(this.managementModule);
      this.addPlaylistsToMenuItems(this.menuItems);
      this.items.next(this.menuItems);
    } catch (error) {
      console.error('Error fetching functions:', error);
    }
  }

  convertApiResponseToMenuItems(apiResponse: any[]): Menu[] {
    const menuItems: Menu[] = [];

    apiResponse.forEach((module) => {
      const moduleMenu: Menu = {
        title: module.moduleName,
        icon: 'layers',
        type: 'sub',
        children: [],
      };

      module.listSubModule.forEach((subModule: any) => {
        const subModuleMenu: Menu = {
          title: subModule.subModuleName,
          type: 'sub',
          icon: 'list',
          children: [],
        };

        subModule.liste_functions.forEach((func: any) => {
          const funcMenu: Menu = {
            title: func.functionName,
            icon: 'pie-chart',
            type: 'link',
            path: `/dashboard/${module.moduleName}/${subModule.subModuleName}/${func.functionName}/reports/${func.id}`,
            children: func.listeReports.map((report: any) => ({
              path: `/dashboard/${module.moduleName}/${subModule.subModuleName}/${func.functionName}/reports/${func.id}`,
              title: report.title,
              icon: 'bar-chart-2', // Assuming you want to use a different icon for reports
              type: 'link',
            })),
          };

          subModuleMenu.children?.push(funcMenu);
        });

        moduleMenu.children?.push(subModuleMenu);
      });

      menuItems.push(moduleMenu);
    });

    return menuItems;
  }

  // private async fetchFunctionReports(
  //   subModuleMenu: Menu,
  //   subModule: any,
  //   moduleName: string
  // ) {
  //   for (const func of subModule.liste_functions) {
  //     const reports = await this.playListService
  //       .getRepRapportsByFunctionId(func.id)
  //       .toPromise();
  //     const reportsMenuItems: Menu[] = (reports as any[]).map(
  //       (report: any) => ({
  //         title: report.title,
  //         path: `/dashboard/${moduleName}/${subModule.subModuleName}/${func.functionName}/reports/${func.id}`, // Adjust path as needed
  //         type: 'link',
  //         icon: 'bar-chart-2', // Use a specific icon for reports
  //       })
  //     );

  //     // Find the corresponding function menu item and add the reports as children
  //     const functionMenuItem = subModuleMenu.children?.find(
  //       (item) => item.title === func.functionName
  //     );
  //     if (functionMenuItem) {
  //       functionMenuItem.children = reportsMenuItems;
  //     }
  //   }
  // }

  // private async convertApiResponseToMenuItems(
  //   apiResponse: any[]
  // ): Promise<Menu[]> {
  //   const menuItems: Menu[] = [];

  //   for (const module of apiResponse) {
  //     const moduleMenu: Menu = {
  //       title: module.moduleName,
  //       icon: 'layers', // Adjust as needed
  //       type: 'sub',
  //       children: [],
  //     };

  //     for (const subModule of module.listSubModule) {
  //       const subModuleMenu: Menu = {
  //         title: subModule.subModuleName,
  //         icon: 'list', // Adjust as needed
  //         type: 'sub',
  //         children: subModule.liste_functions.map((func: any) => ({
  //           title: func.functionName,
  //           path: `/dashboard/${module.moduleName}/${subModule.subModuleName}/${func.functionName}/reports/${func.id}`,
  //           type: 'link',
  //           icon: 'pie-chart', // Adjust as needed
  //         })),
  //       };

  //       await this.fetchFunctionReports(
  //         subModuleMenu,
  //         subModule,
  //         module.moduleName
  //       );

  //       moduleMenu.children?.push(subModuleMenu);
  //     }

  //     menuItems.push(moduleMenu);
  //   }

  //   return menuItems;
  // }

  // // Example usage in component initialization
  // async initMenuItems() {
  //   const data = await this.authService.getFunctions().toPromise();
  //   const menuItems = await this.convertApiResponseToMenuItems(data);
  //   this.menuItems = [this.managementModule, this.monetoring, ...menuItems];
  //   //this.addPlaylistsToMenuItems(this.menuItems);
  //   this.items.next(this.menuItems);
  // }

  private addPlaylistsToMenuItems(menuItems: Menu[]) {
    this.playListService.getAllPlayLists().subscribe((response: any) => {
      const playlistsMenu: Menu = {
        title: 'Playlists',
        icon: 'play-circle',
        type: 'sub',
        badgeType: 'light-primary',
        badgeValue: response.length,
        children: this.buildPlaylistsChildren(response),
      };
      menuItems.splice(2, 0, playlistsMenu);
      this.items.next(menuItems);
    });
  }

  private buildPlaylistsChildren(playlists: any[]): Menu[] {
    let children = playlists.map((playlist) => ({
      title: playlist.playListName,
      icon: 'video',
      type: 'link',
      path: `/playlist/charts/${playlist.id}`,
      badgeType: 'light-primary',
      badgeValue: playlist.playlistReports.length,
    }));

    const addItem: any = {
      title: 'Manage Playlist',
      icon: 'plus',
      type: 'link',
      path: 'playlists',
    };

    children.unshift(addItem);

    return children;
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  // Array
  items = new BehaviorSubject<Menu[]>([]);
  public items$ = this.items.asObservable();
}
