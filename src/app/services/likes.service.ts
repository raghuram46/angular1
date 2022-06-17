import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = 'http://localhost:9090/likes';

  constructor(private http: HttpClient) { }

  createLikes(likes: Object): Observable<Object> {
    // const options = { 'content-type': 'application/json'};
    // const body=JSON.stringify(likes);
    return this.http.post(`${this.baseUrl}/create`, likes);
  }

  getAllLikes(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllLikes`);
  }

  getLikesById(likeId: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/read/${likeId}`);
  }

  deleteLikeById(likeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${likeId}`);
  }
}
