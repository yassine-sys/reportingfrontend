import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
interface Project {
  name: string;
  description: string;
  image: string;
  redirectLink: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: any[] = [];
  currentUrl!: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo(url: string, suffix: string): void {
    this.getCurrentUrl();
    window.open(this.currentUrl + '/' + url + '/' + suffix, '_blank');
  }

  private getCurrentUrl(): void {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;

    this.currentUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`;
    console.log(this.currentUrl);
  }
}
