import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../Services/Auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  onLogin() {
    this.authService.login();
  }
  ngOnInit(){
    
  }

}
