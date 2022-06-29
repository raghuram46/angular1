import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeadersComponent } from './components/headers/headers.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; 
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { UpdateCommentComponent } from './components/update-comment/update-comment.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserListComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    LoginComponent,
    HomeComponent,
    HeadersComponent,
    RegisterComponent,
    NotFoundComponent,
    DialogBoxComponent,
    CreatePostComponent,
    CreateCommentComponent,
    UpdateCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
