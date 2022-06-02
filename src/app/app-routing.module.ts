import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  {   path: 'register',  component: RegisterComponent   },
  {   path: 'login',   component: LoginComponent   },
  {   path: 'home',   component: HomeComponent   },
  {   path: 'userDetails/:id',   component: UserDetailsComponent   },
  {   path: 'users',   component: UserListComponent   },
  {   path: 'createUser',   component: CreateUserComponent   },
  {   path: 'users/updateUser/:userId',   component: UpdateUserComponent   },
  {   path: 'createPost',   component: CreatePostComponent   },
  {   path: 'createComment',   component: CreateCommentComponent   },
  {   path: '**',   component: NotFoundComponent   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
