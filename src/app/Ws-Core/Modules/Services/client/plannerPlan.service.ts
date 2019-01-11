import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Injectable} from '@angular/core';
import { Observable, from, } from 'rxjs';
import { HttpService } from '../Http/http.service';
import { HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

// Client Service 
import { ClientService } from './client.service';


@Injectable()
export class PlannerPlanService {
  url = 'https://graph.microsoft.com/';
  file = 'demo.xlsx';
  table = 'Table1';

  teamEmail: any;


  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private sanitizer: DomSanitizer,
    private client: ClientService
  ) { }

  // PLANNER CRUD THROUGH MICROSOFT GRAP API
  // ______________________________________
  // ______________________________________
  // ______________________________________
  // ______________________________________

  createPlan(plan): Observable<MicrosoftGraph.PlannerPlan>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/planner/plans')
    .post(plan)
    .then((res => {
      console.log(res)
      return res;
    }))
  );
  }

  getPlan(id): Observable<MicrosoftGraph.PlannerPlan>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/groups/' + id + '/planner/plans')
    .get()
    .then((res => {
      return res
    }))
  );
  }

  getPlanById(id): Observable<MicrosoftGraph.PlannerPlan>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/planner/plans/' + id)
    .get()
    .then((res => {
      return res
    }))
  );
  }

  getPlanBuckets(id): Observable<MicrosoftGraph.PlannerPlan>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/planner/plans/' + id + '/buckets')
    .get()
    .then((res => {
      return res
    }))
  );
  }

}