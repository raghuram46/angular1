import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  registerForm: any = FormGroup;
  loading = false;
  submitted = false;
  users: any;
  newUser: any;
  user: User = new User();
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cookies: CookieService) { }

  ngOnInit(): void {

    const jwtToken = this.cookies.get('jwt_token');
      if(!jwtToken){
        this.router.navigateByUrl('/login')
      }
      
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['0', [Validators.required]],
      profilePicUrl: ['']
      });

      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
      })
  }

  get f() { return this.registerForm.controls; }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  goToList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
 
  this.newUser = this.users.find((user: { userName: any; }) => user.userName === this.registerForm.value.userName)
  
  this.loading = true;
  if(this.newUser == undefined)
  {
    this.userService.createUser(this.registerForm.value).subscribe(data => {
      console.log(data);
      this.loading = false; 
      alert("User Added successfully");
      this.goToList();
     }),
     (error: any) => console.log(error),
     () => console.log("Request Completed");
  }else{
    this.loading = false;
    alert("User Already exists");
  }
  }

  }
