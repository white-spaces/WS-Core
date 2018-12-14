import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

// Microsoft Graph Dep
import * as hello from 'hellojs/dist/hello.all.js';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

// Services
import { ClientService } from '../client/client.service';

// Config
import { Configs } from '../../Classes/Config/config';

@Injectable()
export class AuthService {
    me: MicrosoftGraph.User;
    subsGetUsers: Subscription;
    subsGetMe: Subscription;

    constructor(
        private clientService: ClientService,
    ) { }

    // Call Microoft Graph Api Account
    call(){
        this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;})
    }
  
    // Authorization init
    initAuth() {
      hello.init({
          msft: {
            id: Configs.appId,
            cross_origin: true, 
            oauth: {
              version: 2,
              auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            },
            scope_delim: ' ',
            form: false
          },
        },
        { redirect_uri: window.location.href }
      );
    }
}
