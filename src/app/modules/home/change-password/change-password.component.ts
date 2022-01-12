import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  changePassForm  : FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ){}

  ngOnInit(): void {
    this.changePassForm = this.fb.group({
      currentPassword     : [null, Validators.required],
      newPassword         : [null, Validators.required],
      confirmNewPassword  : [null, Validators.required]
    });
  }

  submit(form){
    this.auth.changePassword(form.value)
    .subscribe(() => {
      this.snackbar.successMessage("Password hase been changed succcessfully.");
    },
    error=> {
      let msg = "";
      if(error.status === 400 ){
        msg = "Current password is not correct. Please try again.";
      }
      else{
        msg = "Something went wrong. Please try again.";
      }
      this.snackbar.failedMessage(msg);
    }, () => {
      this.router.navigate(['home']);
    });
  }
}