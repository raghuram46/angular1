import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      commentedBy: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      postId: ['', [Validators.required]]
      });

  }

  get f() { return this.commentForm.controls; }


  goToList() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    console.log(this.commentForm.value)
    this.newComment = {
      description: this.commentForm.value.content,
      commentedBy: this.commentForm.value.commentedBy,
      commentedAt: '',
      user: {
        userId: this.commentForm.value.userId
      },
      post: {
        postId: this.commentForm.value.postId
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
