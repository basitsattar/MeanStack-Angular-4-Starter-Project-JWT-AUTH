import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { routing }  from './app.routing';
import { FormsModule }    from '@angular/forms';
import { AuthGuard } from './_gaurds/auth.gaurd';
import { AuthenticationService } from './_services/authentication.service';
import { HomeService } from './_services/home.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
