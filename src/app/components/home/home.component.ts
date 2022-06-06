import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  users: any;

  constructor(private cookies: CookieService,
     private router: Router,
     private userService: UserService,
     private postService: PostService,
     public dialog: MatDialog) {

      const jwtToken = this.cookies.get('jwt_token');
      // const tokenInfo =  this.getDecodedAccessToken(jwtToken);
      // console.log(tokenInfo.userName)
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      //console.log(data)
    })

    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      console.log(data)
    })

  }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch(Error) {
  //     return null;
  //   }
  // }

  onClickAll(){
    this.ngOnInit();
  }

  onClickUser(userPosts: any){
    console.log(userPosts)
    this.posts = userPosts;
  }

  openDialog(comments: any, postId: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        commentsList: comments,
        postId: postId
      }
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
