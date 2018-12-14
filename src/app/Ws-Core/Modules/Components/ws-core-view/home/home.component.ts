import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';


// Microsoft Graph Api
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"

// Services
import { ClientService } from '../../../Services/client/client.service';
import { LogoutService } from '../../../Services/Auth/logout.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  events: MicrosoftGraph.Event[];

  me: MicrosoftGraph.User;
  subsGetMe: Subscription;

  test: any;

  constructor(
    private clientService: ClientService,
    private logoutService: LogoutService,
    private zone: NgZone
  ) { }
  onLogout(){
    this.logoutService.logout();
  }

  ngOnInit() {
    this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;
      this.zone.run(() => {
        console.log('user')
      })
    });
  
  }

}
