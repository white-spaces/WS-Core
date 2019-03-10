import { Injectable, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';


// Planner Plan service 
import { PlannerPlanService } from '../../Services/client/plannerPlan.service';

// Planner Bucket Service
import { PlannerBucketService } from '../../Services/client/plannerBucket.service';

// Planner Task Service
import { PlannerTaskService } from '../../Services/client/plannerTask.service';


@Injectable({
  providedIn: 'root'
})
export class PlannerLogicService {
  // Default Planner
  subsCreatePlan: Subscription;

  subsGetPlan: Subscription;

  subsGetSpecificPlan: Subscription;

  defaultPlannerTitle = 'tesgin2'

  subsCreateBucket: Subscription;

  subsGetBucket: Subscription;

  subsCreateTask: Subscription;

  subsGetTask: Subscription;

  defaultFirstTask = 'Signup for White Spaces'
    

  constructor(
    private zone: NgZone,
    private plannerPlanService: PlannerPlanService,
    private plannerBucketService: PlannerBucketService,
    private plannerTaskService: PlannerTaskService
  ) { }

  createCmsPlan(groupId){
    let newPlan = {
      owner: groupId,
      title: this.defaultPlannerTitle
    }

    this.subsCreatePlan = this.plannerPlanService.createPlan(newPlan).subscribe(data => {
      this.zone.run(() => {
        this.createCmsBucket(data.id, 'Todo');
        this.createCmsBucket(data.id, 'Done')
      })
    })

  }

  createCmsBucket(id, name) {
    let newBucket = {
      name: name,
      planId: id,
      orderHint: " !"
    }

    this.subsCreateBucket = this.plannerBucketService.createBucket(newBucket).subscribe(data => {
      this.zone.run(() => {
        if(data.name == 'Done'){
          this.createCmsTask(id, data.id, this.defaultFirstTask)
        }
      })
    })
  }

  createCmsTask(planid, bucketid, taskTitle) {
    let newTask = {
      plandId: planid,
      bucketId: bucketid,
      title: taskTitle
    }

    this.subsCreateTask = this.plannerTaskService.createTask(newTask).subscribe(data => {
      this.zone.run(() => {
        window.location.reload();
      })
    })
  }

}
