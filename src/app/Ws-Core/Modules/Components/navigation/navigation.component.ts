import { Component, OnInit } from '@angular/core';
import { Navigation } from './nav-icon-list';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  navList = Navigation;

  navClick = false;

  navOnClick(){
    if (this.navClick == false){
      this.navClick = true;
    } else {
      this.navClick = false;
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
