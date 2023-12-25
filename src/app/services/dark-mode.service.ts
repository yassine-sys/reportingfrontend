import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkMode = new BehaviorSubject<boolean>(true);

  constructor() {}

  setDarkMode(isDarkMode: boolean): void {
    this.darkMode.next(isDarkMode);
  }

  get darkModeState() {
    return this.darkMode.asObservable();
  }
}
