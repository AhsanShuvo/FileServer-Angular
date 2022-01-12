import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICountryList, IStates } from 'src/app/models/Interfaces/IGeoInterfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeographicService {

  constructor(private http: HttpClient){}

  getCountries(): Observable<ICountryList>{
    return this.http.get<ICountryList>(environment.apiBaseUrl + '/geo/country/field_spec');
  }

  getStates(countryCode): Observable<IStates>{
    return this.http.get<IStates>(environment.apiBaseUrl + '/geo/province/' + countryCode + '/field_spec');
  }
}