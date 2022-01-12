import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ICountryList, IStates } from 'src/app/models/Interfaces/IGeoInterfaces';
import { GeographicService } from 'src/app/shared/services/geographic.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IProfile } from 'src/app/models/Interfaces/IProfile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  step1     : boolean = true;
  countries : any;
  states    : any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private geo: GeographicService,
    private auth: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName  : [null], 
      lastName   : [null],
      company    : [null, Validators.required],
      address1   : [null, Validators.required],
      address2   : [null, Validators.required], 
      city       : [null, Validators.required],
      state      : [null, Validators.required],
      country    : [null, Validators.required],
      zip        : [null, Validators.required],
      phone      : [null, Validators.required],
      fax        : [null, Validators.required],
      email      : [null, [ Validators.required, Validators.email ] ],
      password   : [null, Validators.required],
      confirmPass: [null, Validators.required]
    });

    this.geo.getCountries()
    .subscribe((res:ICountryList) => {
        this.countries = res['data'].attributes.values;
    });
  }

  toggleStep(){
    this.step1 = !this.step1 ;
  }

  onSubmit(form){
    if(form.valid){
      this.auth.signup(this.signupForm.value)
      .subscribe((res: IProfile) => {
        this.snackbar.successMessage("Registration Successful!");
        this.router.navigate(['authentication']);
      },
      error => {
        let msg = '';
        if(error.status === 400){
          msg = "Bad request. Please try again.";
        }
        else if(error.status === 409){
          msg = "User already exists. Please try to log in.";
        }
        else{
          msg = "Something went wrong. Please try again.";
        }
        this.snackbar.failedMessage(msg);
      });
    }
  }

  getStates(country){
    this.geo.getStates(country.id)
    .subscribe((res:IStates) => {
      this.states = res['data'].attributes.values;
      this.signupForm.controls['state'].reset();
    })
  }
}
