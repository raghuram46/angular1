import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: any = FormGroup;
  loading = false;
  submitted = false;
  newPost: any;
  currentUser: any;


  constructor(private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private cookies: CookieService) { }

  ngOnInit(): void {
    
    this.postForm = this.formBuilder.group({
      description: ['', [Validators.required]]
      });

  }

  get f() { return this.postForm.controls; }


  goToList() {
    window.location.reload();
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }

    this.currentUser = localStorage.getItem('currentUser')
    const parsedData = JSON.parse(this.currentUser)
    this.newPost = {
      description: this.postForm.value.description,
      postedBy: parsedData.userName,
      postedAt: '',
      user: {
        userId: parsedData.userId
      }
    }
  
    this.loading = true;
    this.postService.createPost(this.newPost).subscribe(data => {
      console.log(data);
      this.loading = false; 
      alert("Posted successfully");
      this.goToList();
    }),
    (error: any) => console.log(error),
    () => console.log("Request Completed");

}

}
