import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';


// SERVICES 
import { AuthService } from '../Auth/auth.service';


@Injectable() 
export class LoginGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        private router: Router,
        private zone: NgZone
    ){

    }

    canActivate(){
        const msft = hello('msft').getAuthResponse();

        // If user logged in
        if(msft) {
            return true;
        } else {
            this.zone.run(() => {
            this.authService.call()
        
            this.router.navigate(['']);            
            return false;
            })
            
        }
    }
}
