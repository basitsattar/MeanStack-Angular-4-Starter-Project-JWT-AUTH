import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    checkToken():Observable<boolean>{
        
        return this.http.get('http://localhost:3000/api/checktoken')
        .map((response: Response) => {
            if(response.json() && response.json().valid){
                return false;
            }
        });
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/api/signin', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    signup(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/api/signup', { username: username, password: password })
            .map((response: Response) => {
                // signup successful if success is true
                let success = response.json() && response.json().success;
                if (success) {
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}