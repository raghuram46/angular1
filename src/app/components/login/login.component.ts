import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "User Login";
  submitted = false;
  loginForm: any = FormGroup;
  users: any;
  registeredUser: any;

  // userForm = new FormGroup({
  //   userName: new FormControl(),
  //   password: new FormControl(),
  //   email: new FormControl(),
  //   age: new FormControl()
  // });

  constructor(private formBuilder: FormBuilder,
     private userService: UserService,
      private router: Router
      ) { }

  //Add user form actions
  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;  
    })
  }

  onSubmit(){
  //console.log(this.loginForm.value);
  this.submitted = true;
  
  if (this.loginForm.invalid) {
      return;
  }

  this.registeredUser = this.users.find((user: { userName: any; }) => user.userName === this.loginForm.value.userName)
 console.log(this.registeredUser)
  if(this.registeredUser !== undefined)
  {
    this.router.navigate(['/users']);
  }else{
    alert("User doesn't exists");
    this.router.navigate(['/register']);
  }
  }


}
