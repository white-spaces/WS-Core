import { Component, OnInit } from '@angular/core';

import { AuthService } from './Ws-Core/Modules/Services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  users: Array<any>;


  constructor(
    private authService: AuthService,
  ) {}



  ngOnInit() {
    this.authService.initAuth();
  }
}
