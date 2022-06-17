import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: 'app-update-user',
   templateUrl: './update-user.component.html',
   styleUrls: ['./update-user.component.css']
 })
 export class UpdateUserComponent implements OnInit {
  form: any = FormGroup;
  loading = false;
  submitted = false;
  users: any;
  newUser: any;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userToUpdate: any,) {
    
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      userName: [ this.userToUpdate.userName, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [this.userToUpdate.password, [Validators.required, Validators.minLength(8)]],
      email: [this.userToUpdate.email, [Validators.required, Validators.email]],
      age: [this.userToUpdate.age, [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: [this.userToUpdate.gender, [Validators.required]],
      profilePicUrl: [this.userToUpdate.profilePicUrl]
      });

      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
      })
     
  }

  get f() { return this.form.controls; }


  goToUsersList() {
    window.location.reload();
  }


  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.newUser = this.users.find((user: {userId: any; userName: any;}) => 
    user.userId !== this.userToUpdate.userId && user.userName === this.form.value.userName)
    this.loading = true;
    if(this.newUser === undefined)
    {
      this.userService.updateUser(this.userToUpdate.userId,this.form.value).subscribe(data => {
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