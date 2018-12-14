import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Microsoft Graph Dep
import * as hello from 'hellojs/dist/hello.all.js';

@Injectable()
export class LogoutService {
    constructor(
        private router: Router
    ) { }

    logout() {
        hello('msft').logout().then(
          () => window.location.href = '/',
          e => console.error(e.error.message)
        );
        this.router.navigate(['ws']);
      }
    
}