import { Injectable, OnInit, NgZone } from '@angular/core';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Subscription } from 'rxjs';
import { ClientService } from '../client/client.service';



@Injectable({
  providedIn: 'root'
})
export class GroupService implements OnInit {
  me: MicrosoftGraph.User;
  subsGetMe: Subscription;

  // Check if WS Group Exits
  groups: any;
  subsGetGroups: Subscription;

  // Get Specific Group
  subsGetUserCmsGroup: Subscription;
  userCmsGroup: any;

  constructor(
    private clientService: ClientService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;
      this.zone.run(() => {
        console.log(me);
        console.log(this.me);
      })
    })

    this.subsGetGroups = this.clientService.getGroups().subscribe(groupAssociatedWith => {this.groups = groupAssociatedWith;
      this.zone.run(() => {
        this.groups.value.forEach(group => {
            if(group.mailNickname === "Testing"){
              this.getCmsGroup(group.id)
            } else {
              console.log('no')
            }
        });
      })
    })
  }

  getCmsGroup(id){
    this.subsGetUserCmsGroup = this.clientService.getGroupById(id).subscribe(cmsGroup => {this.userCmsGroup = cmsGroup;
      this.zone.run(() => {
        console.log(cmsGroup);
        console.log(this.userCmsGroup);
      })
    })
  }
}
