import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { HelpModule } from 'src/app/modules/help/help.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationModule,
    HelpModule
  ]
})

export class AuthLayoutModule { }
