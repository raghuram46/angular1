import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm: any = FormGroup;
  loading = false;
  submitted = false;
  newComment: any;


  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public postId: any,
    private commentService: CommentService,
    private router: Router,
    private cookies: CookieService) { }

  ngOnInit(): void {
    const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }

    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      commentedBy: ['', [Validators.required]],
      userId: ['', [Validators.required]]
      });

  }

  get f() { return this.commentForm.controls; }


  goToList() {
    window.location.reload();
  }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.newComment = {
      content: this.commentForm.value.content,
      commentedBy: this.commentForm.value.commentedBy,
      commentedAt: '',
      user: {
        userId: this.commentForm.value.userId
      },
      post: {
        postId: this.postId
      }
    }
  
  this.loading = true;
  this.commentService.createComment(this.newComment).subscribe(data => {
    console.log(data);
    this.loading = false; 
    alert("Commented successfully");
    this.goToList();
   }),
   (error: any) => console.log(error),
   () => console.log("Request Completed");

}
}
