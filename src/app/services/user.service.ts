import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9090/user';

  constructor(private http: HttpClient) { }
  

  createUser(user: Object): Observable<Object> {
    //const headers = { 'content-type': 'application/json'};
    //const body=JSON.stringify(user);
    return this.http.post(`${this.baseUrl}`, user);
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/allUsers`);
  }

  getUserById(userId: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/get/${userId}`);
  }

  updateUserName(userId: number, userName: String, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateName/${userId}/${userName}`, value);
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`, { responseType: 'text' });
  }

}
