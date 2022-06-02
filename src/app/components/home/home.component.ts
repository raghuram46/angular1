import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;

  constructor(private cookies: CookieService,
     private router: Router,
     private postService: PostService,
     public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      console.log(data)
    })
  }

  openDialog(comments: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: comments
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(postId: number){
    this.postService.deletePostById(postId).pipe(first()).subscribe(data => {
      this.posts = data;
    },
    error => console.log(error)
    );
  }


}
