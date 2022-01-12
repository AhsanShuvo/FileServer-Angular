import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';

const routes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path:'',
    component: HelpComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HelpRoutingModule { }