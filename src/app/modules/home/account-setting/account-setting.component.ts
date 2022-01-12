import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeographicService } from 'src/app/shared/services/geographic.service';
import { IStates, ICountryList } from 'src/app/models/Interfaces/IGeoInterfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/models/Interfaces/IProfile';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {

  profileForm     : FormGroup;
  countries       : any;
  states          : any;
  myInfo          : any;
  countryObject   : any = null; 
  stateObject     : any = null;
  userId          : number;
  loadingIndicator: boolean = true;
  isInit          : boolean = false;

  constructor(
    private fb: FormBuilder,
    private geo: GeographicService,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCountries();
  }

  onSubmit(form){
    if(form.valid){
      this.auth.updateProfile(form.value, this.userId)
      .subscribe(
        (res) => {
          this.snackbar.successMessage("Profile has been updated successfully.");
        },
        error => {
          this.snackbar.failedMessage('Unable to update profile. Please try again.');
        },() => {
          this.router.navigate(['home']);
        });
    }
  }

  getStates(country){
    this.geo.getStates(country.id)
    .subscribe((res: IStates) => {
      this.states = res['data'].attributes.values;
    },
    error => {},
    () => {
      if(this.isInit === true){
        this.stateObject = this.states.find( x => x.value === this.myInfo.province);
        this.initData();
      }
      else{
        this.profileForm.controls['state'].reset();
      }
    });
  }

  getCountries(){
    this.geo.getCountries()
    .subscribe((res: ICountryList) => {
        this.countries = res['data'].attributes.values;
    },
    error => {},
    () => {
      this.getMe();
    });
  }

  getMe(){
    this.isInit = true ;
    this.auth.getUserInfo()
    .subscribe((res: IProfile) => {
      this.myInfo = res['data'].attributes;
      this.userId = res['data'].id;
      this.countryObject = this.countries.find(x => x.value === this.myInfo.country);
    },
    error => {
      this.snackbar.failedMessage("Something went wrong. Please reload the page.");
    },
    () => {
      this.getStates(this.countryObject);
    });
  }

  initData(){
    this.profileForm = this.fb.group({
      firstName   : [this.myInfo.first_name],
      lastName    : [this.myInfo.last_name],
      company     : [this.myInfo.company, Validators.required],
      address1    : [this.myInfo.address1, Validators.required],
      address2    : [this.myInfo.address2, Validators.required],
      country     : [this.countryObject, Validators.required],
      city        : [this.myInfo.city, Validators.required],
      state       : [this.stateObject, Validators.required],
      zip         : [this.myInfo.postal, Validators.required],
      phone       : [this.myInfo.phone, Validators.required],
      fax         : [this.myInfo.fax, Validators.required],
      create_ts   : [this.myInfo.create_timestamp],
      modified_ts : [this.myInfo.modified_timestamp]
    });
    this.loadingIndicator = false;
    this.isInit = false;
  }

  redirectToHome(){
    this.router.navigate(['home']);
  }
}
