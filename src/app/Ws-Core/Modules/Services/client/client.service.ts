/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client/lib/src"
import { Injectable} from '@angular/core';
import { Observable, from, } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../Http/http.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as hello from 'hellojs/dist/hello.all.js';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable()
export class ClientService {
  url = 'https://graph.microsoft.com/';
  file = 'demo.xlsx';
  table = 'Table1';

  teamEmail: any;


  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) { }

  getClient(): MicrosoftGraphClient.Client
  {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
          done(null, this.httpService.getAccessToken()); //first parameter takes an error if you can't get an access token
      }
    });
    console.log(client)
    return client;
  }


  getMe(): Observable<MicrosoftGraph.User>
  {
    var client = this.getClient();
    return from(client
    .api('me')
    .select("displayName, mail, userPrincipalName")
    .get()
    .then ((res => {
      return res;
    } ) )
    );
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
 }
 
 getProfileImage() {
     let accessToken = this.httpService.getAccessToken;
     // fetch User Profile Image
     let headers: HttpHeaders = new HttpHeaders();
     headers.set("Authorization", "d" + accessToken);
     this.http
       .get("https://graph.microsoft.com/beta/me/photo/$value", {
         responseType: 'arraybuffer',
         headers: headers
       })
       .pipe(map(res => res))
       .subscribe(
         (data: any) => {
           let blob = new Blob([data.arrayBuffer()], {
             type: data.headers.get("content-type")
           });
           let imageUrl = window.URL.createObjectURL(blob);
           console.log(this.transform(imageUrl))
 
           return this.transform(imageUrl)
          }
          );
         
 }


  getPhoto(): Observable<any>{
    var client = this.getClient();
    return from(client
      .api("https://graph.microsoft.com/v1.0/me/photo/$value")
      .responseType("blob")
      .get()
      .then((blob: any) => {
        
        let imageUrl = window.URL.createObjectURL(blob);
        console.log(this.transform(imageUrl))
        return this.transform(imageUrl)
      })
    )
  }



  private headers() {
    const msft = hello('msft').getAuthResponse();
    const accessToken = msft.access_token;
    var token = this.httpService.getAccessToken();
    console.log(token)
    const headers =  new HttpHeaders();
    return headers;
  }
  

  
  
    
    
  getTeams(): Observable<MicrosoftGraph.User>{
   var client = this.getClient();
   return from(client
   .api('https://graph.microsoft.com/beta/me/joinedTeams')
   .get()
   .then((res => {
     return res
   })) 
  );
  }

  getTeamMembers(teamID): Observable<MicrosoftGraph.Group>{
    var client = this.getClient();
    return from(client 
    .api('https://graph.microsoft.com/beta/groups/' + teamID)
    .get()
    .then((res => {
      return res
    }))
  );
  }


  // GROUPS CRUD THROUGH MICROSOFT GRAP API
  // ______________________________________
  // ______________________________________
  // ______________________________________
  // ______________________________________

  createGroup(group): Observable<MicrosoftGraph.Group>{
    var client = this.getClient();
    return from(client
    .api('groups')
    .post(group)
    .then((res => {
      console.log(res)
      return res;
    }))
  );
  }

  getGroups(): Observable<MicrosoftGraph.Group>{
    var client = this.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/groups')
    .get()
    .then((res => {
      return res
    }))
  );
  }

  getGroupById(id): Observable<MicrosoftGraph.Group>{
    var client = this.getClient();
    return from(client
    .api('https://graph.microsoft.com/v1.0/groups/' + id)
    .get()
    .then((res => {
      return res
    }))
  );
  }


  addCustomProfile(RoamingProfile: MicrosoftGraph.OpenTypeExtension) {
    var client  = this.getClient();
    return from(client
    .api('me/extensions')
    .post({
      RoamingProfile
    })
     
  );
  }

  
  
  
  getRoaming(): Observable<MicrosoftGraph.Extension>
  {
    var client = this.getClient();
    return from(client
    .api('me?$select=id,displayName,mail,mobilePhone&$expand=extensions')
    .get()
    .then ((res => {
      return res;
    } ) )
    );
  }

  

  getMessage(): Observable<MicrosoftGraph.Message>
  {
    var client = this.getClient();
    return from(client
    .api('me/messages')
    .get()
    .then((res => {
      return res.value;
    }))
    );
  }

  sendMail(mail: MicrosoftGraph.Message) {
    var client = this.getClient();
    return from(client
    .api('me/sendmail')
    .post({message: mail})
  );
  } 

 

}
