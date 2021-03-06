import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any = FormGroup;
  loading = false;
  submitted = false;
  users: any;
  newUser: any;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cookies: CookieService
    ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    const jwtToken = this.cookies.get('jwt_token');
    if(jwtToken){
      this.router.navigateByUrl('/');
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.newUser = this.users.find((user: { userName: any; }) => user.userName === this.registerForm.value.userName)
    
    this.loading = true;
    if(this.newUser == undefined)
    {
      this.userService.createUser(this.registerForm.value).subscribe(data => {
        this.loading = false; 
        alert("User registered successfully");
         this.router.navigate(['/login']);
       })
    }else{
      this.loading = false;
      alert("User Already exists");
      this.router.navigate(['/login']);
    }
    }

}
