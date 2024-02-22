import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public menuItems!: any[];
  public items!: any[];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text!: string;
  private subscription: Subscription;
  darkModeEnabled: boolean = true;

  constructor(
    public navServices: NavService,
    private darkModeService: DarkModeService
  ) {
    this.navServices.items.subscribe((menuItems) => (this.items = menuItems));

    this.subscription = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
      }
    );
  }

  ngOnInit() {}

  searchToggle() {
    this.navServices.search = false;
    // document
    //   .getElementsByTagName('content-wrapper')[0]
    //   .classList.remove('offcanvas');
  }

  searchTerm(term: string) {
    this.searchResultEmpty = false; // Reset the empty search result flag
    if (!term) {
      this.removeFix();
      this.menuItems = []; // Clear current search results
      return;
    }
    term = term.toLowerCase();
    const items = this.searchItems(this.items, term); // Use the recursive function
    this.checkSearchResultEmpty(items);
    this.menuItems = items;
    term ? this.addFix() : this.removeFix();
  }

  searchItems(items: any[], term: string, result: any[] = []) {
    items.forEach((item) => {
      // Check if the item's title matches the search term
      if (item.title?.toLowerCase().includes(term)) {
        result.push(item);
      }
      // If the item has children, search through them recursively
      if (item.children) {
        this.searchItems(item.children, term, result);
      }
    });
    return result;
  }

  checkSearchResultEmpty(items: any) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    //document.getElementsByTagName('body')[0].classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    //document.getElementsByTagName('body')[0].classList.remove('offcanvas');
  }
}
