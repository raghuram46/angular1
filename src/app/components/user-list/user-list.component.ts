import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: any;
  constructor(private userService: UserService,
            private cookies: CookieService,
            public dialog: MatDialog,
            private router: Router) { }

  ngOnInit(): void {
    const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }

    this.userService.getAllUsers().subscribe(users => {
        this.users = users;
    } )
  }

  deleteUser(id: number){
    this.userService.deleteUserById(id).pipe(first()).subscribe(data => {
      this.users = data;
    },
    error => console.log(error)
    );
  }

  update(user: any){
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update dialog box closed")
    });
  }

}
