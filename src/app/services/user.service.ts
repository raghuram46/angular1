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
    // const options = { 'content-type': 'application/json'};
    // const body=JSON.stringify(user);
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/allUsers`);
  }

  getUserById(userId: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/get/${userId}`);
  }

  updateUser(userId: number, user: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${userId}`, user);
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`);
  }

}
