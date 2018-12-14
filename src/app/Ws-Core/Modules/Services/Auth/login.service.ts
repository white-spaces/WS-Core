import { Injectable, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Microsoft Graph Dep
import * as hello from 'hellojs/dist/hello.all.js';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

// Services
import { AuthService } from './auth.service';

// Config
import { Configs } from '../../Classes/Config/config';

@Injectable()
export class LoginService {
    me: MicrosoftGraph.User;
    subsGetUsers: Subscription;
    subsGetMe: Subscription;

    constructor(
        private zone: NgZone,
        private router: Router,
        private authService: AuthService,
    ) { }

    login() {
        hello('msft').login({ scope: Configs.scope }).then(
          () => {
            this.zone.run(() => {
              this.authService.call();
              this.router.navigate(['ws/home'])
              return true;
            });
          },
          e => console.error(e.error.message)
        );
      }
}