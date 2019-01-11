import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Component, OnInit, NgZone } from '@angular/core';
import { ClientService } from '../../../../Services/client/client.service';
import { Subscription } from 'rxjs';

// Planner service 
import { PlannerPlanService } from '../../../../Services/client/plannerPlan.service';
import { PlannerBucketService } from '../../../../Services/client/plannerBucket.service';
import { PlannerLogicService } from '../../../../LogicServices/PlannerLogic/planner-logic.service';

// Group service
import { GroupService } from '../../../../Services/client/group.service';
import { GroupLogicService } from '../../../../LogicServices/GroupLogic/groupLogic.service';



@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.less']
})
export class QuickNotesComponent implements OnInit {
  me: MicrosoftGraph.User;
  plan: MicrosoftGraph.PlannerPlan;
  planBucket: MicrosoftGraph.PlannerBucket;
  subsGetMe: Subscription;

  // Check if WS Group Exits
  groups: any;
  subsGetGroups: Subscription;

  // Get Specific Group
  subsGetUserCmsGroup: Subscription;
  userCmsGroup: any;

  // Get Plans
  subsGetPlan: Subscription;
  subsGetSpecificPlan: Subscription;
  subsGetPlanBuckets: Subscription;
  buckets: any;

  // Get Buckets
  subsGetBucketList: Subscription;



  defaultMember;
  defaultId;

  defaultMailNickname = 'schengen';

  constructor(
    private clientService: ClientService,
    private zone: NgZone,

    // Group Services
    public groupService: GroupService,
    private groupLogicService: GroupLogicService,

    // Planner Services
    private plannerService: PlannerPlanService,
    private plannerLogicService: PlannerLogicService,

    // Planner Bucket
    private plannerBucketService: PlannerBucketService,
  ) { }

  ngOnInit() {
      this.subsGetMe = this.clientService.getMe().subscribe(me => {this.me = me;
        this.zone.run(()=> {
          this.subsGetGroups = this.groupService.getGroups().subscribe(groupAssociatedWith => {this.groups = groupAssociatedWith;
            this.zone.run(() => {
              this.groups.value.forEach(group => {
                if (group.mailNickname == this.defaultMailNickname){
                  this.getCmsGroup(group.id);
                  this.getPlans(group.id);

                } else {
                  this.groupLogicService.checkGroups(this.defaultMailNickname);
                }
              });
            })
          })
        })
      })

  }



  // Get WS group by id
  getCmsGroup(id){
    this.subsGetUserCmsGroup = this.groupService.getGroupById(id).subscribe(cmsGroup => {this.userCmsGroup = cmsGroup;
      this.zone.run(() => {
      })
    })
  }

  plannervar;
  // Get planner
  getPlans(groupId){
    this.subsGetPlan = this.plannerService.getPlan(groupId).subscribe(data => {this.plannervar = data; {
      this.zone.run(() => {
        this.plannervar.value.forEach(planner => {
          if(planner.title == this.plannerLogicService.defaultPlannerTitle) {
            this.getSpecificPlan(planner.id);
          } else {

            this.plannerLogicService.createCmsPlan(groupId);
          }
        });
      })
      }
    })
  }


  getSpecificPlan(planId){
    this.subsGetSpecificPlan = this.plannerService.getPlanById(planId).subscribe(plan => {
      this.zone.run(() => {
        this.plan = plan;

        this.getPlanBuckets(this.plan.id);
      })
    })
  }

  getPlanBuckets(planId){
    this.subsGetPlanBuckets = this.plannerService.getPlanBuckets(planId).subscribe(plan => {
      this.zone.run(() => {
        this.buckets = plan;
      })
    })
  }

  getBucketList(id){
    this.subsGetBucketList = this.plannerBucketService.GetListBucket(id).subscribe(plan => {
      this.zone.run(() => {
        this.planBucket = plan;
      })
    })
  }

  


}
