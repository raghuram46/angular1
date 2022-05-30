import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '',   redirectTo: 'register', pathMatch: 'full' },
  {   path: 'register',   component: RegisterComponent   },
  {   path: 'login',   component: LoginComponent   },
  {   path: 'home',   component: HomeComponent   },
  {   path: 'userDetails',   component: UserDetailsComponent   },
  {   path: 'users',   component: UserListComponent   },
  {   path: 'createUser',   component: CreateUserComponent   },
  {   path: 'updateUser',   component: UpdateUserComponent   },
  {   path: 'deleteUser',   component: DeleteUserComponent   },
  {   path: '**',   component: NotFoundComponent   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
