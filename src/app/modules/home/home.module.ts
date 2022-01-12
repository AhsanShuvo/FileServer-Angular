import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module' ;
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportsMenuComponent } from './reports-menu/reports-menu.component';
import { FilterComponent } from './reports-menu/filter/filter.component';

@NgModule({
  declarations: [HomeComponent, AccountSettingComponent, ChangePasswordComponent, ReportsMenuComponent, FilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
