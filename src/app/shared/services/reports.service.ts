import {Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { environment } from 'src/environments/environment';
import { IReportFilterList } from 'src/app/models/Interfaces/IReportFilterList';
import { Observable } from 'rxjs';
import { IReportList } from 'src/app/models/Interfaces/IReportList';
import { IRequestedReport } from 'src/app/models/Interfaces/IRequestedReport';
import { IReportSpec } from 'src/app/models/Interfaces/IReportSpec';

@Injectable({
    providedIn: 'root',
})

export class ReportService {
  
  constructor(private http: HttpClient) {}

  getReportFilter(): Observable<IReportFilterList[]>{
    return this.http.get<IReportFilterList[]>(environment.apiBaseUrl + '/report/list/filter_spec');
  }

  getReportList(): Observable<IReportList[]>{
    return this.http.get<IReportList[]>(environment.apiBaseUrl  + '/report/list');
  }

  getRequestedReport(): Observable<IRequestedReport[]>{
    return this.http.get<IRequestedReport[]>(environment.apiBaseUrl + '/report/requested');
  }

  getFilterReport(form, subtype): Observable<IReportSpec[]>{
    let requestBody = {
      type: 'report',
      attributes: {
        subtype: subtype,
        filter: {
          prospect: form.prospect,
          property_num: form.property_num,
          property_name: form.property_name,
          state: form.state,
          field: form.field,
          operator: form.operator,
          start_ts: form.startDate ? new Date(form.startDate).getTime() : null,
          end_ts: form.endDate ? new Date(form.endDate).getTime() : null
        }
      }
    };
    return this.http.post<IReportSpec[]>(environment.apiBaseUrl + '/report', requestBody);
  }

  getPDF(id){
    let requestBody = {
      'responseType' : 'arraybuffer' as 'json'
    };
    return this.http.get(environment.apiBaseUrl + '/report/' + id + '/pdf', requestBody);
  };

  getCSV(id){
    let requestBody = {
      'responseType' : 'arraybuffer' as 'json'
    };
    return this.http.get(environment.apiBaseUrl + '/report/' + id + '/csv', requestBody);
  }

  deleteReport(id){
    return this.http.delete(environment.apiBaseUrl + '/report/' + id);
  }
}
