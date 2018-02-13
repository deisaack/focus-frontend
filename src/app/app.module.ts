import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SidebarModule} from 'ng-sidebar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import {AppRoutingModule} from './app.routing';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    ProfileComponent,
    FileDetailComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, SidebarModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
