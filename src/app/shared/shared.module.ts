import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import * as fromComponents from './components';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { DragDropDirective } from './directives/drag-drop.directive' ;
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...fromComponents.components, ConfirmEqualValidatorDirective, DragDropDirective],
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    RouterModule
  ],
  exports:[
    ...fromComponents.components,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    ConfirmEqualValidatorDirective,
    MatProgressSpinnerModule,
    DragDropDirective,
    MatListModule,
    MatTableModule,
    RouterModule
  ]
})
export class SharedModule { }
