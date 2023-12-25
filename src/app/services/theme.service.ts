import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (!themeLink) {
      themeLink = this.document.createElement('link');
      themeLink.id = 'app-theme';
      themeLink.rel = 'stylesheet';
      this.document.head.appendChild(themeLink);
    }
    themeLink.href = theme + '.css';
  }
}
