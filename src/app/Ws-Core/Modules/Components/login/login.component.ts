import { Component, OnInit } from '@angular/core';

// Services
import { LoginService } from '../../Services/Auth/login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) {}

  onLogin() {
    this.loginService.login();
  }
  ngOnInit(){
    
  }

}
