
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportsMenuComponent } from './reports-menu/reports-menu.component';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { AuthGuard } from 'src/app/shared/helpers/auth.gaurd';

const routes: Routes = [{
  path: '',
  component: HomeLayoutComponent,
  children:[{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'account-setting',
    component: AccountSettingComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'reports-menu',
    component: ReportsMenuComponent,
    canActivate: [AuthGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
