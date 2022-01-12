import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeLayoutComponent } from './home-layout.component';
import { HomeModule } from 'src/app/modules/home/home.module';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule
  ]
})

export class HomeLayoutModule { }
