import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:9090/post';

  constructor(private http: HttpClient) { }
  

  createPost(post: Object): Observable<Object> {
    // const options = { 'content-type': 'application/json'};
    // const body=JSON.stringify(user);
    return this.http.post(`${this.baseUrl}/create`, post);
  }

  getAllPosts(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllPosts`);
  }

  getPostById(postId: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/getbyid/${postId}`);
  }

  getPostByDate(postedAt: any): Observable<Object>{
    return this.http.get(`${this.baseUrl}/getbydate`, {params: postedAt});
  }

  updateDescription(postId: number, description: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${postId}/${description}`, value);
  }

  deletePostById(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletebyId/${postId}`);
  }

}
