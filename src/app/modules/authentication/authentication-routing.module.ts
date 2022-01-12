import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';

const routes: Routes = [
{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  }, {
    path:'forget-password',
    component: ForgetPasswordComponent
  }]
},
{
  path: 'signup',
  component: AuthLayoutComponent,
  children:[{
    path:'',
    component: SignupComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
