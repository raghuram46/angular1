import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  showLogin: any;
  showLogout: any;
  showRegister:  any;

  constructor(private router: Router, private cookies: CookieService) {
    router.events.subscribe((event: Event) => {
      
      if (event instanceof NavigationEnd ) {  
        //this.currentUrl = event.url;
        if(event.url === "/login"){
          this.showLogin = false;
          this.showLogout = false;
          this.showRegister = true;
        }else if(event.url === "/register"){
          this.showLogin = true;
          this.showLogout = false;
          this.showRegister = false;
        }else{
          this.showLogin = false;
          this.showLogout = true;
          this.showRegister = false;
        }
      }
    });
    
   }

  ngOnInit(): void {
  }

  onLogout(){
    this.cookies.delete('jwt_token');
    this.router.navigateByUrl('/login');
    localStorage.removeItem('currentUser');
  }

}
