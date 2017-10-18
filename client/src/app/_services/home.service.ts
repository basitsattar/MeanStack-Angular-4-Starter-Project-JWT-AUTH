import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
 
@Injectable()
export class HomeService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getSecureData(): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('http://localhost:3000/api/secure_data', options)
            .map((response: Response) => response.json());
    }
}