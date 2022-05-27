import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save(){
    this.userService.createUser(this.user).subscribe((data: any) => {
      console.log(data);
      this.user = new User();
      this.goToList();
    }),
    (error: any) => console.log(error),
    () => console.log("Request Completed");
  }

  goToList() {
    this.router.navigate(['/users']);
  }

}
