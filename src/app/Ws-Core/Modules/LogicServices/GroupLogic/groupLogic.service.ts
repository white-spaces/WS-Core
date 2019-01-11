import { Injectable, OnInit, NgZone } from '@angular/core';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Subscription } from 'rxjs';

import { GroupService } from '../../Services/client/group.service';
import { ClientService } from '../../Services/client/client.service';
import { PlannerLogicService } from '../../LogicServices/PlannerLogic/planner-logic.service';


@Injectable({
  providedIn: 'root'
})
export class GroupLogicService implements OnInit {
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
  defaultSecurityEnabled = false;
  defaultOwners;
  defaultMembers;


  constructor(
    private clientService: ClientService,
    private groupService: GroupService,
    private zone: NgZone,
    private plannerPlanService: PlannerLogicService
  ) { }

  ngOnInit() {
  
  }

  checkGroups(defaultMailNickname){
    // Get user information
    this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;
      this.zone.run(() => {
        // Get groups associated with client
        this.createCmsGroup(me.id, defaultMailNickname);
      })
    })    
  }

  // Create group, id is there to add signed in user automatically to members object of group.
  createCmsGroup(id, defaultMailNickname){
    let newGroup = {
      description: this.defaultGroupDescription,
      displayName: this.defaultDisplayname,
      groupTypes: [
        "unified"
      ],
      mailEnabled: this.defaultMailEnabled,
      securityEnabled: this.defaultSecurityEnabled,
      mailNickname: defaultMailNickname,
      owners: this.defaultOwners,
      "members@odata.bind": ["https://graph.microsoft.com/v1.0/users/" + id]
    }

    this.subsCreateGroup = this.groupService.createGroup(newGroup).subscribe(data => {
      this.zone.run(() => {
        this.plannerPlanService.createCmsPlan(data.id);
      })
    })
  }

  


 
}
