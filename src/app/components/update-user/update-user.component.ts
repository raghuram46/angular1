import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: 'app-update-user',
   templateUrl: './update-user.component.html',
   styleUrls: ['./update-user.component.css']
 })
 export class UpdateUserComponent implements OnInit {
  userId!: number;
  form: any = FormGroup;
  loading = false;
  submitted = false;
  users: any;
  newUser: any;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,) {
    
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId']

    this.form = this.formBuilder.group({
      userName: [ '', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
      });

      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
      })
     
  }

  get f() { return this.form.controls; }


  goToUsersList() {
    this.router.navigate(['/users']);
  }


  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.newUser = this.users.find((user: { userName: any; }) => user.userName === this.form.value.userName)
  this.loading = true;
  if(this.newUser == undefined)
  {
    this.userService.updateUser(this.userId,this.form.value).subscribe(data => {
      console.log(data);
      this.loading = false; 
      alert("User updated successfully");
      this.goToUsersList();
     }),
     (error: any) => console.log(error),
     () => console.log("Request Completed");
  }else{
    this.loading = false;
    alert("User Already exists");
  }
  }


}