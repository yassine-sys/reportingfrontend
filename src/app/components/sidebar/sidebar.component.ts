import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  // public iconSidebar: any;
  // public menuItems: any[] = [];
  // public url: any;
  // public fileurl: any;

  // // For Horizontal Menu
  // public margin: any = 0;
  // public width: any = window.innerWidth;
  // public leftArrowNone: boolean = true;
  // public rightArrowNone: boolean = false;

  // public showLevel3SubMenu: boolean = false;

  // constructor(public navServices: NavService, private router: Router) {
  //   this.navServices.items.subscribe((menuItems) => {
  //     this.menuItems = menuItems;
  //     console.log(this.menuItems);
  //     this.router.events.subscribe((event) => {
  //       if (event instanceof NavigationEnd) {
  //         menuItems.filter((items) => {
  //           if (items.path === event.url) {
  //             this.setNavActive(items);
  //           }
  //           if (!items.children) {
  //             return false;
  //           }
  //           items.children.filter((subItems) => {
  //             if (subItems.path === event.url) {
  //               this.setNavActive(subItems);
  //             }
  //             if (!subItems.children) {
  //               return false;
  //             }
  //             subItems.children.filter((subSubItems) => {
  //               if (subSubItems.path === event.url) {
  //                 this.setNavActive(subSubItems);
  //               }
  //             });
  //           });
  //         });
  //       }
  //     });
  //   });
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.width = event.target.innerWidth - 500;
  // }

  // sidebarToggle() {
  //   this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  // }

  // // Active Nave state
  // setNavActive(item: any) {
  //   this.menuItems.filter((menuItem) => {
  //     if (menuItem !== item) {
  //       menuItem.active = false;
  //     }
  //     if (menuItem.children && menuItem.children.includes(item)) {
  //       menuItem.active = true;
  //     }
  //     if (menuItem.children) {
  //       menuItem.children.filter((submenuItems: any) => {
  //         if (submenuItems.children && submenuItems.children.includes(item)) {
  //           menuItem.active = true;
  //           submenuItems.active = true;
  //         }
  //       });
  //     }
  //   });
  // }

  // // Click Toggle menu
  // toggletNavActive(item: any) {
  //   if (!item.active) {
  //     this.menuItems.forEach((a) => {
  //       if (this.menuItems.includes(item)) {
  //         a.active = false;
  //       }
  //       if (!a.children) {
  //         return false;
  //       }
  //       a.children.forEach((b: any) => {
  //         if (a.children.includes(item)) {
  //           b.active = false;
  //         }
  //       });
  //     });
  //   }
  //   item.active = !item.active;
  // }

  // // For Horizontal Menu
  // scrollToLeft() {
  //   if (this.margin >= -this.width) {
  //     this.margin = 0;
  //     this.leftArrowNone = true;
  //     this.rightArrowNone = false; // ensure right arrow is shown when scrolling to the left
  //   } else {
  //     this.margin += this.width; // update margin by adding width
  //     this.leftArrowNone = false;
  //     this.rightArrowNone = false; // ensure right arrow is shown when scrolling to the left
  //   }
  // }

  // scrollToRight() {
  //   const menuContainer = document.getElementById('sidebar-menu');
  //   if (menuContainer) {
  //     const containerWidth = menuContainer.offsetWidth;
  //     const scrollWidth = menuContainer.scrollWidth;
  //     const maxScroll = scrollWidth - containerWidth;
  //     if (this.margin <= -maxScroll + this.width) {
  //       this.margin = -maxScroll;
  //       this.rightArrowNone = true;
  //       this.leftArrowNone = false; // ensure left arrow is shown when scrolling to the right
  //     } else {
  //       this.margin -= this.width; // update margin by subtracting width
  //       this.rightArrowNone = false;
  //       this.leftArrowNone = false; // ensure left arrow is shown when scrolling to the right
  //     }
  //   }
  // }
}
