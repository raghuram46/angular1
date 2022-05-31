import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/user';

  constructor(private http: HttpClient) { }

  generateToken(request: any) {
    return this.http.post<string>(`${this.baseUrl}/authenticate`, request, {  responseType: 'text' as 'json' });
  }

  welcome(token: string) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>("http://localhost:9090/", {headers, responseType: 'text' as 'json' });
  }
}
