  import { AfterViewInit, Component, OnInit,ChangeDetectorRef } from '@angular/core';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './services/auth.service';
  import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
  import { CookieService } from 'ngx-cookie-service';
  import { User } from 'src/model/User';
  import { FilterService } from './services/filter.service';
  import { Filters } from 'src/model/Filters';
  import { FilterType } from 'src/model/FilterType';
  import { Module } from 'src/model/Module';
  import { SubModule } from 'src/model/SubModule';
  import { LoaderService } from './services/loader.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { group_module } from 'src/model/group_module';
  import { ModuleFunction } from 'src/model/ModuleFunction';
  import { Subscription } from 'rxjs';
  declare var $: any;


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent  {
    
  }

