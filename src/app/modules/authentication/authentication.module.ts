import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common' ;

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SignupComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    CommonModule
  ]
})
export class AuthenticationModule {}
