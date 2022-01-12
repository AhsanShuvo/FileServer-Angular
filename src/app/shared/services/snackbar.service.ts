import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService{

  constructor(private snackbar: MatSnackBar){}

  successMessage(msg: string){
    this.snackbar.open(msg, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  failedMessage(msg: string){
    this.snackbar.open(msg, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}