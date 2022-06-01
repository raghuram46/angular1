import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:9090/comment';

  constructor(private http: HttpClient) { }
  

  createComment(comment: Object): Observable<Object> {
    // const options = { 'content-type': 'application/json'};
    // const body=JSON.stringify(user);
    return this.http.post(`${this.baseUrl}/create`, comment);
  }

  getAllComments(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllComments`);
  }

  getCommentById(commentId: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/read/${commentId}`);
  }

  getCommentByDate(commentedAt: any): Observable<Object>{
    return this.http.get(`${this.baseUrl}/readbyDate`, {params: commentedAt});
  }

  updateContent(commentId: number, content: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${commentId}/${content}`, value);
  }

  deleteCommentById(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${commentId}`);
  }
}
