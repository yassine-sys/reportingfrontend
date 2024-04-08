import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleComponent } from './components/module/module.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './components/group/group.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupFormComponent } from './components/groupform/groupform.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { NestedGridComponent } from './components/nested-grid/nested-grid.component';
import { SubmoduleformComponent } from './components/submoduleform/submoduleform.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { AddgroupComponent } from './components/addgroup/addgroup.component';
import { ModuleFormComponent } from './components/moduleform/moduleform.component';
import { MatChipsModule } from '@angular/material/chips';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { MatSortModule } from '@angular/material/sort';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { UpdatesubmodulemodalComponent } from './components/updatesubmodulemodal/updatesubmodulemodal.component';
import { FonctionformComponent } from './components/fonctionform/fonctionform.component';
import { UpdatefunctionmodalComponent } from './components/updatefunctionmodal/updatefunctionmodal.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { FunctionDetailsComponent } from './components/function-details/function-details.component';
import { UserRapportsComponent } from './components/user-rapports/user-rapports.component';
import { MatCardModule } from '@angular/material/card';
import { ListUserRapportsComponent } from './components/list-user-rapports/list-user-rapports.component';
import { ConfirmationDialogComponentComponent } from './components/confirmation-dialog-component/confirmation-dialog-component.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FunctionChartsComponent } from './components/function-charts/function-charts.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.intercepter';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';
import { GroupdetailsComponent } from './components/groupdetails/groupdetails.component';
import { AssignModuleDialogComponent } from './components/assign-module-dialog/assign-module-dialog.component';
import { AssignfunctiondialogComponent } from './components/assignfunctiondialog/assignfunctiondialog.component';
import { UpdategroupformComponent } from './components/updategroupform/updategroupform.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './LoaderInterceptor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropModule as PrimeNgDragDropModule } from 'primeng/dragdrop';
import { OrderFunctionComponent } from './components/order-function/order-function.component';
import { OrderUserChartsComponent } from './components/order-user-charts/order-user-charts.component';
import { PaginatedTableComponent } from './components/paginated-table/paginated-table.component';
import { TestChartsComponent } from './components/test-charts/test-charts.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { KpiChartComponent } from './components/kpi-chart/kpi-chart.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { CollectStatusComponent } from './components/collect-status/collect-status.component';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NestedTableComponent } from './components/nested-table/nested-table.component';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MissingFilesComponent } from './components/missing-files/missing-files.component';
import { MessagesModule } from 'primeng/messages';
import { DuplicatedCdrComponent } from './components/duplicated-cdr/duplicated-cdr.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FilterComponentComponent } from './components/filter-component/filter-component.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { Menu } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HomeChartsComponent } from './components/home-charts/home-charts.component';
import { UserchartComponent } from './components/userchart/userchart.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PlaylistdashboardComponent } from './components/playlistdashboard/playlistdashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ToolbarModule } from 'primeng/toolbar';
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  ReCaptchaV3Service,
} from 'ng-recaptcha';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/search/search.component';
import { BadgeModule } from 'primeng/badge';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    GroupComponent,
    GroupFormComponent,
    NestedGridComponent,
    AddgroupComponent,
    SubmoduleformComponent,
    ModuleFormComponent,
    UserManagmentComponent,
    UserDialogComponent,
    HomeComponent,
    ErrorComponent,
    UpdatesubmodulemodalComponent,
    FonctionformComponent,
    UpdatefunctionmodalComponent,
    RapportComponent,
    FunctionDetailsComponent,
    UserRapportsComponent,
    ListUserRapportsComponent,
    ConfirmationDialogComponentComponent,
    ChartComponent,
    FunctionChartsComponent,
    LoginComponent,
    TableDialogComponent,
    GroupdetailsComponent,
    AssignModuleDialogComponent,
    AssignfunctiondialogComponent,
    UpdategroupformComponent,
    ForgotPassComponent,
    LoaderComponent,
    OrderFunctionComponent,
    OrderUserChartsComponent,
    PaginatedTableComponent,
    TestChartsComponent,
    MapComponent,
    ProfileComponent,
    KpiChartComponent,
    CommentFormComponent,
    CollectStatusComponent,
    DashboardComponent,
    NestedTableComponent,
    ResetPasswordComponent,
    MissingFilesComponent,
    DuplicatedCdrComponent,
    ReportsComponent,
    FilterComponentComponent,
    HomeChartsComponent,
    UserchartComponent,
    PlaylistComponent,
    PlaylistdashboardComponent,
    UnauthorizedComponent,
    BreadcrumbComponent,
    FeatherIconsComponent,
    SidebarComponent,
    SearchComponent,
  ],
  imports: [
    InputSwitchModule,
    ToolbarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    TableModule,
    SharedModule,
    TreeTableModule,
    MatChipsModule,
    MatSortModule,
    MatCardModule,
    HighchartsChartModule,
    NgbCollapseModule,
    DragDropModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginatorModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    NgxChartsModule,
    ButtonModule,
    SkeletonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    MessagesModule,
    NgxSkeletonLoaderModule.forRoot(),
    CalendarModule,
    DialogModule,
    MenuModule,
    OverlayPanelModule,
    SplitButtonModule,
    SpeedDialModule,
    CheckboxModule,
    DynamicDialogModule,
    PrimeNgDragDropModule,
    ToggleButtonModule,
    RecaptchaModule, //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    BadgeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    DialogService,
    CookieService,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },

    DatePipe,
    ReCaptchaV3Service,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
