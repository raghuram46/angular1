import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      postedBy: ['', [Validators.required]],
      userId: ['', [Validators.required]]
      });

  }

  get f() { return this.postForm.controls; }


  goToList() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }

    this.newPost = {
      description: this.postForm.value.description,
      postedBy: this.postForm.value.postedBy,
      postedAt: '',
      //postedAt: this.postForm.value.postedAt,
      user: {
        userId: this.postForm.value.userId
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
