import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Services
import { ClientService } from '../../Services/client/client.service';
import { LogoutService } from '../../Services/Auth/logout.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less']
})
export class TopNavComponent implements OnInit {
   //__(1) User Profile Image
   image: SafeResourceUrl;

  constructor(
    private clientService: ClientService,
    private zone: NgZone,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
    //__(1) Get Profile Image 
    this.clientService.getPhoto().subscribe(res => {
      this.zone.run(() => {
        this.image = res;
        })
    })
  }

}
