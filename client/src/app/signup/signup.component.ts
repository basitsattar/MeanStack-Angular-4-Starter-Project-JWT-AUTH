import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  signup() {
      this.loading = true;
      this.authenticationService.signup(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  // login successful
                  this.router.navigate(['/login']);
              } else {
                  // login failed
                  this.error = 'There was some error';
                  this.loading = false;
              }
          });
  }

}
