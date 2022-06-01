import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  constructor(private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  onLogout(){
    //this.cookies.delete('jwt_token');
    this.router.navigateByUrl('/login');
  }

}
