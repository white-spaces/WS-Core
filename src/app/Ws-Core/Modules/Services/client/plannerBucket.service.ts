import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Injectable} from '@angular/core';
import { Observable, from, } from 'rxjs';
import { HttpService } from '../Http/http.service';
import { HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

// Client Service 
import { ClientService } from './client.service';


@Injectable()
export class PlannerBucketService {
  url = 'https://graph.microsoft.com/';
  file = 'demo.xlsx';
  table = 'Table1';



  constructor(
    private client: ClientService
  ) { }

  // PLANNER CRUD THROUGH MICROSOFT GRAP API
  // ______________________________________
  // ______________________________________
  // ______________________________________
  // ______________________________________

  createBucket(bucket): Observable<MicrosoftGraph.PlannerBucket>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/planner/buckets')
    .post(bucket)
    .then((res => {
      console.log(res)
      return res;
    }))
  );
  }

  getBucket(id): Observable<MicrosoftGraph.PlannerPlan>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/planner/buckets/' + id)
    .get()
    .then((res => {
      return res
    }))
  );
  }

  GetListBucket(id){
      var client = this.client.getClient();
      return from (client
      .api('https://graph.microoft.com/v1.0/planner/buckets/' + id + '/tasks')
      .get()
      .then((res => {
          return res
      }))
    );
  }
  

}