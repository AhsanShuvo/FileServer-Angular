import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
  })
  export class ResetPasswordComponent implements OnInit{
    resetPassForm: FormGroup;
    token: string = '';
    
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private snackbar: SnackbarService,
      private auth: AuthService
    ){}

    ngOnInit() {
      this.resetPassForm = this.fb.group({
        password     : [ null, Validators.required],
        confirmPass  : [ null, Validators.required]
      });
    }
    
    reset(form){
      const urlArray = this.router.url.split('/');
      this.token = urlArray[urlArray.length-1];
      this.auth.resetPassword(this.token, form.password)
      .subscribe(() => {
        this.snackbar.successMessage("Password has been changed successfully.");
        this.router.navigate(['authentication']);
      },
      error =>{
        this.snackbar.failedMessage("Something went wrong. Please try again");
      });
    }
  }