import { Injectable, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';


// Planner Plan service 
import { PlannerPlanService } from '../../Services/client/plannerPlan.service';

// Planner Bucket SErvice
import { PlannerBucketService } from '../../Services/client/plannerBucket.service';


@Injectable({
  providedIn: 'root'
})
export class PlannerLogicService {
  // Default Planner
  subsCreatePlan: Subscription;

  subsGetPlan: Subscription;

  subsGetSpecificPlan: Subscription;

  defaultPlannerTitle = 'WhiteSpacesOriginal'

  subsCreateBucket: Subscription;


  subsGetBucket: Subscription;
    

  constructor(
    private zone: NgZone,
    private plannerPlanService: PlannerPlanService,
    private plannerBucketService: PlannerBucketService
  ) { }

  createCmsPlan(groupId){
    let newPlan = {
      owner: groupId,
      title: this.defaultPlannerTitle
    }

    this.subsCreatePlan = this.plannerPlanService.createPlan(newPlan).subscribe(data => {
      this.zone.run(() => {
        this.createCmsBucket(data.id, 'Todo')
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
      window.location.reload();

      })
    })
  }

}
