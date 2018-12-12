import { Injectable, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import * as hello from 'hellojs/dist/hello.all.js';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

// maybe not
import { HttpService } from '../http.service';

import { Configs } from '../config';

@Injectable()
export class AuthService implements OnInit {
    vents: MicrosoftGraph.Event[];
    me: MicrosoftGraph.User;
    message: MicrosoftGraph.Message;
    emailSent: Boolean;
    subsGetUsers: Subscription;
    subsGetMe: Subscription;
    subsSendMail: Subscription;


    teamEmail: any;

    sendEmailMail: any;
  
    title: String;
    messageBody: String;
    pickedMember: String;
    Team: any;

    constructor(
        private zone: NgZone,
        private router: Router,
        private homeService: HomeService,
    ) { }

    ngOnInit() {
        console.log(Configs.appId)
        console.log('hi')
      
    }

    call(){
        // GET MICROSOFT USER _________________________________________________
       
        this.subsGetMe = this.homeService.getMe().subscribe(me => {this.me = me;
         this.zone.run(() => {
   
         
        
       });
     })}
  
    initAuth() {
        console.log(Configs.appId)
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

    login() {
      hello('msft').login({ scope: Configs.scope }).then(
        () => {
          this.zone.run(() => {
            this.call();
            this.router.navigate(['ws/home'])
            return true;
          });
        },
        e => console.error(e.error.message)
      );
    }
    
    logout() {
      hello('msft').logout().then(
        () => window.location.href = '/',
        e => console.error(e.error.message)
      );
    }
}
