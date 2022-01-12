import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';
import { IProfile } from 'src/app/models/Interfaces/IProfile';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private http: HttpClient, private cookieService: CookieService){}

  login(email: string, password: string ):Observable<any> {
    let requestBody = {
      email    : email,
      password : password
    };
    return this.http.post<any>(environment.apiBaseUrl + '/rauth/login', requestBody);
  }

  signup(form): Observable<IProfile>{
    let requestBody = {
      first_name : form.firstName,
      last_name  : form.lastName,
      email      : form.email,
      password   : form.password,
      company    : form.company,
      address1   : form.address1,
      address2   : form.address2,
      city       : form.city,
      province   : form.state,
      country    : form.country,
      postal     : form.zip,
      fax        : form.fax,
      phone      : form.phone 
    }
    return this.http.post<IProfile>(environment.apiBaseUrl + '/rauth/register', requestBody);
  }

  getUserInfo(): Observable<IProfile>{
    return this.http.get<IProfile>(environment.apiBaseUrl + '/ruser/me');
  }

  sendMail(email: string){
    let requestBody = {
      email : email
    };
    return this.http.post(environment.apiBaseUrl + '/rauth/forget_password/sendMail', requestBody);
  }

  resetPassword(token: string, password: string){
    let requestBody = {
      token    : token,
      password : password
    };
    return this.http.post(environment.apiBaseUrl + '/rauth/forget_password/resetPassword', requestBody);
  }

  updateProfile(form, id){
    let requestBody = {
      first_name  : form.firstName,
      last_name   : form.lastName,
      address1    : form.address1,
      address2    : form.address2,
      city        : form.city,
      company     : form.company,
      country     : form.country,
      create_ts   : form.create_ts,
      fax         : form.fax,
      modified_ts : new Date().getTime(),
      phone       : form.phone,
      state       : form.state,
      zip         : form.zip
    };
    return this.http.patch(environment.apiBaseUrl + '/ruser/' + id, requestBody);
  }

  changePassword(form){
    let requestBody = {
      currentPassword : form.currentPassword,
      newPassword     : form.newPassword
    }
    return this.http.post(environment.apiBaseUrl + '/ruser/change_password', requestBody);
  }

  setSession(res, rememberMe){
    const token = res['data'].attributes.access_token;
    const expires_in = res['data'].attributes.expires_in / (60 * 60 * 24);
    if(rememberMe === true) this.cookieService.set('token', token, expires_in, '/');
    else this.cookieService.set('token', token, 0, '/');
  }

  clearSession(){
    this.cookieService.delete('token');
  }

  getToken(){
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean{
    return this.getToken().length > 0;
  }
}   
  
