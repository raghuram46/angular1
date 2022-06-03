import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

  updateForm: any = FormGroup;
  loading = false;
  submitted = false;
  newComment: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public commentId: any,
    private formBuilder: FormBuilder,
    private commentService: CommentService, private router: Router,
    private cookies: CookieService) { }

   
  
    ngOnInit(): void {
      const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }
      
      this.updateForm = this.formBuilder.group({
        content: ['', [Validators.required]],
       
        });
  
    }
  
    get f() { return this.updateForm.controls; }
    
    onSubmit(){
      this.submitted = true;
      if (this.updateForm.invalid) {
        return;
      }

      this.loading = true;
      this.commentService.updateContent(this.commentId, this.updateForm.value.content, this.f.value).subscribe((data) => {
        console.log(data)
        alert("Updated successfully")
        window.location.reload();
      })
    }

}
