import { Component, OnInit,  NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Data Template
import { Navigation, SubNavigation } from './nav-icon-list';

// Services
import { ClientService } from '../../Services/client/client.service';
import { LogoutService } from '../../Services/Auth/logout.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  
  //__(1) User Profile Image
  image: SafeResourceUrl;


  constructor(
    private clientService: ClientService,
    private zone: NgZone,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
    //__(1) Get Profile Image 
    this.clientService.getPhoto().subscribe(res => {
      this.zone.run(() => {
        this.image = res;
        })
    })
  }


  // Navigation Data
  navList = Navigation;

  subNavList = SubNavigation;

  //__(2) Navigation Toggled?
  navClick = false;

  //__(2) Navigation Toggler function
  navOnClick(){
    if (this.navClick == false){
      this.navClick = true;
    } else {
      this.navClick = false;
    }
  };

  //_(3) Sub Navigation Hovered?
  navHover = false;

  //_(3) Sub Navigation Hover function
  navOnHover(toggled){
    this.navHover = toggled;
  }


  //_(4) Logout Function
  onLogout(){
    this.logoutService.logout();
  }


}
