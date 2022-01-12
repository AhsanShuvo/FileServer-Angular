import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment' ;

import { IFileResourceStatus } from 'src/app/models/interfaces/IFileResourceStatus';
import { IFileResourceNew } from 'src/app/models/interfaces/IFileResourceNew' ;

@Injectable({
  providedIn: 'root',
})
export class FileService {

  constructor(private http: HttpClient) {}

  postFile(file:File): Observable<IFileResourceNew> {
    return this.http.post<IFileResourceNew>(environment.apiBaseUrl + '/file', file);
  }

  getFileStatus(id): Observable<IFileResourceStatus> {
    return this.http.get<IFileResourceStatus>(environment.apiBaseUrl + '/file/' + id  + '/status');
  }
}
