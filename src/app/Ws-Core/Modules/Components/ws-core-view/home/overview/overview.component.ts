import { Component, OnInit, NgZone } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { HomeComponent } from '../home.component';

import { ClientService } from '../../../../Services/client/client.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
   //__(1) User Profile Image
   image: SafeResourceUrl;

  constructor(
    private clientService : ClientService,
    private zone: NgZone,
    private home: HomeComponent
  ) { }

  ngOnInit() {
    this.clientService.getPhoto().subscribe(res => {
      this.zone.run(() => {
        this.image = res;
        })
    })
  }

}
