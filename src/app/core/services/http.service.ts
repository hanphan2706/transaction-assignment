import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiURL = API_URL;
  
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get(endpoint: string): Observable<any> {
    return this.http.get(this.apiURL + endpoint);
  }

  getMocks(endpoint: string): Observable<any> {
    return this.http.get(`assets/mocks/${endpoint}.json`);
  }
}
