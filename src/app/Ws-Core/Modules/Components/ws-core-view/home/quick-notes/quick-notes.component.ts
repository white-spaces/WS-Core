import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Component, OnInit, NgZone } from '@angular/core';
import { ClientService } from '../../../../Services/client/client.service';
import { Subscription } from 'rxjs';

// Planner service 
import { PlannerPlanService } from '../../../../Services/client/plannerPlan.service';
import { PlannerBucketService } from '../../../../Services/client/plannerBucket.service';
import { PlannerTaskService } from '../../../../Services/client/plannerTask.service';
import { PlannerLogicService } from '../../../../LogicServices/PlannerLogic/planner-logic.service';

// Group service
import { GroupService } from '../../../../Services/client/group.service';
import { GroupLogicService } from '../../../../LogicServices/GroupLogic/groupLogic.service';
import { EMLINK } from "constants";



@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.less']
})
export class QuickNotesComponent implements OnInit {
  me: MicrosoftGraph.User;
  plan: MicrosoftGraph.PlannerPlan;
  planBucket: MicrosoftGraph.PlannerBucket;
  planTasks: MicrosoftGraph.PlannerTask;
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
  tasks: any;

  // Get Buckets
  subsGetBucketList: Subscription;

  // Get Tasks
  subsGetBucketTasks: Subscription;

  loaded: boolean = false;


  pickedBucket = 'Todo';
  defaultMember;
  defaultId;

  defaultMailNickname = 'Gorganzola';

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

    // Planner Tasks
    private plannerTaskService: PlannerTaskService
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
      this.zone.runOutsideAngular(() => {
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
      this.zone.runOutsideAngular(() => {
        this.plan = plan;

        this.getPlanBuckets(this.plan.id);
      })
    })
  }

  getPlanBuckets(planId){
    this.subsGetPlanBuckets = this.plannerService.getPlanBuckets(planId).subscribe(bucket => {
      this.zone.runOutsideAngular(() => {
        this.buckets = bucket;
        this.getTasksCondition(this.buckets)
        
      })
    })
  }

  getTasksCondition(buckets){
    this.zone.run(() => {
      buckets.value.filter((elm) => {
        console.table(elm)
        if(elm.name === this.pickedBucket) {
          this.getBucketTasks(elm.id);
          console.log('bucket picked')
        } else {
          console.log('please pick a bucket')
        }
  
      })
    })
    
    
  }

  getBucketTasks(bucketID){
    this.subsGetBucketTasks = this.plannerTaskService.getAllPlannerTasksForBucket(bucketID).subscribe(tasks => {
      this.zone.run(() => {
        console.table(tasks)
        console.log(bucketID)
        this.tasks = tasks;
        this.loaded = true;
      })
    })
  }

  


}
