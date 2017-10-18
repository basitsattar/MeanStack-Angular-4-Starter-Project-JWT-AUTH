import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_gaurds/auth.gaurd';

const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: '', component: HomeComponent , canActivate: [AuthGuard] },

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
