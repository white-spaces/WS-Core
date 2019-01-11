import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import { Injectable} from '@angular/core';
import { Observable, from, } from 'rxjs';

// Client Service 
import { ClientService } from './client.service';


@Injectable()
export class GroupService {
  url = 'https://graph.microsoft.com/';
  file = 'demo.xlsx';
  table = 'Table1';



  constructor(
    private client: ClientService
  ) { }

  // GROUPS CRUD THROUGH MICROSOFT GRAP API
  // ______________________________________
  // ______________________________________
  // ______________________________________
  // ______________________________________

  createGroup(group): Observable<MicrosoftGraph.Group>{
    var client = this.client.getClient();
    return from(client
    .api('groups')
    .post(group)
    .then((res => {
      console.log(res)
      return res;
    }))
  );
  }

  addMemberToGroup(group, id): Observable<MicrosoftGraph.Group>{
    var client = this.client.getClient();
    var url = "https://graph.microsoft.com/v1.0/" + id + "/members"
    return from(client
    .api(url)
    .post(group)
    .then((res => {
      console.log(res);
      return res;
    }))
  )
  }

  getGroups(): Observable<MicrosoftGraph.Group>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/groups')
    .get()
    .then((res => {
      return res
    }))
  );
  }

  getGroupById(id): Observable<MicrosoftGraph.Group>{
    var client = this.client.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/groups/' + id)
    .get()
    .then((res => {
      return res
    }))
  );
  }

}