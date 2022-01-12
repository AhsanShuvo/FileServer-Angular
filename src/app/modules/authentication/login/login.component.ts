import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snakbar: SnackbarService){ 
    if(auth.isLoggedIn()){
      router.navigate(['']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email     : [ null, [ Validators.required, Validators.email ] ],
      password  : [ null, [ Validators.required ] ],
      rememberMe: [ false ]
    });
  }

  onSubmit(form) {
    if(form.valid){
      this.auth.login(form.email, form.password)
      .subscribe(
        (res) => {
          this.setSession(res);
          this.router.navigate(['home']);
        },
        error =>{
          this.snakbar.failedMessage("Something went wrong. Please try agian.");
        }
      );
    }
  }

  setSession(res){
    this.auth.setSession(res, this.loginForm['value'].rememberMe);
  }
}
