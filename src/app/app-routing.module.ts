import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { GroupFormComponent } from './components/groupform/groupform.component';
import { NestedGridComponent } from './components/nested-grid/nested-grid.component';
import { AddgroupComponent } from './components/addgroup/addgroup.component';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { authGuard2 } from './authGuard2';
import { ErrorComponent } from './components/error/error.component';
import { FunctionDetailsComponent } from './components/function-details/function-details.component';
import { ChartComponent } from './components/chart/chart.component';
import { FunctionChartsComponent } from './components/function-charts/function-charts.component';
import { LoginComponent } from './components/login/login.component';
import { GroupdetailsComponent } from './components/groupdetails/groupdetails.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { TestChartsComponent } from './components/test-charts/test-charts.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CollectStatusComponent } from './components/collect-status/collect-status.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MissingFilesComponent } from './components/missing-files/missing-files.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeChartsComponent } from './components/home-charts/home-charts.component';
import { OrderUserChartsComponent } from './components/order-user-charts/order-user-charts.component';
import { UserchartComponent } from './components/userchart/userchart.component';
import { PlaylistdashboardComponent } from './components/playlistdashboard/playlistdashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPassComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'playlist/charts/:id',
    component: HomeChartsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserchartComponent,
        canActivate: [AuthGuard],
      },
      { path: 'group', component: GroupComponent, canActivate: [authGuard2] },
      {
        path: 'group/add',
        component: AddgroupComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'group/:id',
        component: AddgroupComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'modules',
        component: NestedGridComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'users',
        component: UserManagmentComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'collect',
        component: CollectStatusComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'missing-files',
        component: MissingFilesComponent,
        canActivate: [authGuard2],
      },
      { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] },
      {
        path: 'function/:id',
        component: FunctionDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'function/charts/:id',
        component: ReportsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':moduleName/:subModuleName/:functionName/reports/:id',
        component: ReportsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'playlists',
        component: PlaylistdashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'groupe/:id',
        component: GroupdetailsComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'testCharts',
        component: TestChartsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
