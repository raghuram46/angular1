import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: any;
  updatedUser: any;

  constructor(private router: Router,
            private userService: UserService,
            private cookies: CookieService) { }

  ngOnInit(): void {
    const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }
      
    const user: any = localStorage.getItem('currentUser')
    this.currentUser = JSON.parse(user)
    
    this.userService.getAllUsers().subscribe(data => {
        this.updatedUser = data.find((user: { userId: any; }) => user.userId === this.currentUser.userId)

        this.currentUser = this.updatedUser === undefined ? this.currentUser : this.updatedUser
    })
  }

}
