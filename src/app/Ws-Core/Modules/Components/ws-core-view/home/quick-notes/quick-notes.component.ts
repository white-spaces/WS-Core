import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Component, OnInit, NgZone } from '@angular/core';
import { ClientService } from '../../../../Services/client/client.service';
import { Subscription } from 'rxjs';
import { GroupService } from '../../../../Services/group/group.service';
import { oDataQueryNames } from "../../../../../../../../node_modules/@microsoft/microsoft-graph-client/lib/src";



@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.less']
})
export class QuickNotesComponent implements OnInit {
  me: MicrosoftGraph.User;
  subsGetMe: Subscription;

  // Check if WS Group Exits
  groups: any;
  subsGetGroups: Subscription;

  // Get Specific Group
  subsGetUserCmsGroup: Subscription;
  userCmsGroup: any;

  // Default new group settings
  subsCreateGroup: Subscription;

  // Default add member
  subsAddMember: Subscription;

  defaultGroupDescription = "I'm your White Spaces Group, I contain all your default Planner and Team componets for your Cms. If desired you can create a new plan in Planner or team in Teams and assign that given team to your White Spaces.";
  defaultMailEnabled = true;
  defaultDisplayname = "White Spaces"
  defaultMailNickname = "green";
  defaultSecurityEnabled = false;
  defaultOwners;
  defaultMembers;



  defaultMember;
  defaultId;

  constructor(
    private clientService: ClientService,
    private zone: NgZone,
    public groupService: GroupService
  ) { }

  ngOnInit() {
    // Get user information
    this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;
      this.zone.run(() => {
        // Get groups associated with client
        this.subsGetGroups = this.clientService.getGroups().subscribe(groupAssociatedWith => {this.groups = groupAssociatedWith;
          this.zone.run(() => {
            // Loop through group objects
            this.groups.value.forEach(group => {
              // if Default WS group already exists, get group
                if(group.mailNickname === "green"){
                  this.getCmsGroup(group.id)
                } else {
                  // otherwise we create a new Default ws group
                  this.createCmsGroup(me.id);
                }
            });
          })
        })
      })
    })    
  }

  // Get WS group by id
  getCmsGroup(id){
    this.subsGetUserCmsGroup = this.clientService.getGroupById(id).subscribe(cmsGroup => {this.userCmsGroup = cmsGroup;
      this.zone.run(() => {
      })
    })
  }

  // Create group, id is there to add signed in user automatically to members object of group.
  createCmsGroup(id){
    let newGroup = {
      description: this.defaultGroupDescription,
      displayName: this.defaultDisplayname,
      groupTypes: [
        "unified"
      ],
      mailEnabled: this.defaultMailEnabled,
      securityEnabled: this.defaultSecurityEnabled,
      mailNickname: this.defaultMailNickname,
      owners: this.defaultOwners,
      "members@odata.bind": ["https://graph.microsoft.com/v1.0/users/" + id]
    }

    this.subsCreateGroup = this.clientService.createGroup(newGroup).subscribe(data => {
      this.zone.run(() => {
      })
    })
  }


}
