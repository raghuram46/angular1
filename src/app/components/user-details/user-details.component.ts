import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router,
            private cookies: CookieService) { }

  ngOnInit(): void {
    const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }
      
    const user: any = localStorage.getItem('currentUser')
    this.currentUser = JSON.parse(user)
  }

}
