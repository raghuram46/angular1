import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import jwt_decode from 'jwt-decode';
import { ThemePalette } from '@angular/material/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  posts: any;
  users: any;
  currentUser: any;
  activeLink: any;
  allPostsTab: boolean = false;
  isLiked: any;
  newLike: any;

  constructor(private cookies: CookieService,
     private router: Router,
     private userService: UserService,
     private postService: PostService,
     private likesService: LikesService,
     public dialog: MatDialog) {

      const jwtToken = this.cookies.get('jwt_token');
      // const tokenInfo =  this.getDecodedAccessToken(jwtToken);
      // console.log(tokenInfo.userName)
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }

  }

  ngOnInit(): void {
    const user: any = localStorage.getItem('currentUser')
    this.currentUser = JSON.parse(user)

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })

    this.postService.getAllPosts().subscribe(data => {
      if(data !== null){
        this.posts = data.map((post: any) => {
          let newPost: any;
          this.isLiked = post.likes.some((likeObj: any) => likeObj.likedBy === this.currentUser.userName);
          newPost = {...post, isLiked: this.isLiked}
          return newPost;
        })
      }
      console.log(this.posts)
    })

  }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch(Error) {
  //     return null;
  //   }
  // }

  onClickLike(post: any){
    this.newLike = {
      likedBy: this.currentUser.userName,
      user : {
        userId: this.currentUser.userId
      },
      post : {
        postId: post.postId
      }
    }
    if(!post.isLiked){
      this.likesService.createLikes(this.newLike).subscribe(data => {
        this.ngOnInit();
      })
    }else{
      let currentLikeId : any;
      if(post.likes !== null){
        post.likes.forEach((element: any) => {
          if(element.likedBy === this.currentUser.userName){
            currentLikeId = element.likeId;
            this.likesService.deleteLikeById(currentLikeId).subscribe(data => {
              this.ngOnInit();
            })
          }
        });
      }
    }
    
  }

  onClickAll(){
    this.ngOnInit();
    this.allPostsTab = false;
  }

  onClickUser(userPosts: any){
    //console.log(userPosts)
    this.posts = userPosts;
    this.allPostsTab = true;
  }

  openDialog(comments: any, post: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        commentsList: comments,
        post: post
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPostDialog(){
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Post dialog box closed")
    });
  }

  onDelete(postId: number){
    
    this.postService.deletePostById(postId).pipe(first()).subscribe(data => {
      this.posts = data;
      window.location.reload()
    },
    error => console.log(error)
    );
  }


}
