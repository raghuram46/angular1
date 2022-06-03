import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { UpdateCommentComponent } from '../update-comment/update-comment.component';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  comments: any;
  postId: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit(): void {
    this.comments = this.data.commentsList;
    this.postId = this.data.postId;
  }

  openDialog(commentId: any) {
    const dialogRef = this.dialog.open(UpdateCommentComponent,{
      data: commentId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openNewCommentDialog(){
    const dialogRef = this.dialog.open(CreateCommentComponent, {
      data: this.postId
    });
  }


  onDelete(commentId: number){
    this.commentService.deleteCommentById(commentId).subscribe(data => {
      console.log(data)
      this.router.navigateByUrl('/')
    })
  }

}
