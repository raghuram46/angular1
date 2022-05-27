import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "User Login";
  submitted = false;
  registerForm: any = FormGroup;

  // userForm = new FormGroup({
  //   userName: new FormControl(),
  //   password: new FormControl(),
  //   email: new FormControl(),
  //   age: new FormControl()
  // });

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  //Add user form actions
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.submitted = true;

  if (this.registerForm.invalid) {
      return;
  }
  if(this.submitted)
  {
    this.router.navigate(['/users']);
  }
  }


}
