import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './Ws-Core/Modules/Components/ws-core-view/dash/dash.component';
import { EditorComponent } from './Ws-Core/Modules/Components/ws-core-view/editor/editor.component';
import { HomeComponent } from './Ws-Core/Modules/Components/ws-core-view/home/home.component';
import { ProfileComponent } from './Ws-Core/Modules/Components/ws-core-view/profile/profile.component';
import { SettingsComponent } from './Ws-Core/Modules/Components/ws-core-view/settings/settings.component';
import { TeamsComponent } from './Ws-Core/Modules/Components/ws-core-view/teams/teams.component';
import { CoreViewComponent } from './Ws-Core/Modules/Components/ws-core-view/core-view/core-view.component';
import { PageNotFoundComponent } from './Ws-Core/Modules/Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Ws-Core/Modules/Components/login/login.component';
import { LoginGuard } from './Ws-Core/Modules/Services/Guard/login.guard';


const Path = "ws/"


const routes: Routes = [
  {
    path: 'ws-login',
    component: LoginComponent,
    data: {title: 'White Spaces Login'}
  },

  // Core View Routing
  {
    path: 'ws',
    component: CoreViewComponent,
    data: {title: 'White Spaces'},
    canActivate: [LoginGuard],
    children: [
        {
          path: 'dash',
          component: DashComponent,
          data: {title: 'Dashboard'}
        },
        {
          path: 'editor',
          component: EditorComponent,
          data: {title: 'Editor'}
        },
        {
          path: 'home',
          component: HomeComponent,
          data: {title: 'Home'}
        },
        {
          path: 'settings',
          component: SettingsComponent,
          data: {title: 'Settings'}
        },
        {
          path: 'profile',
          component: ProfileComponent,
          data: {title: 'Profile'}
        },
        {
          path: 'home',
          component: HomeComponent,
          data: {title: 'Home'}
        },
        {
          path: 'teams',
          component: TeamsComponent,
          data: {title: '-Team'}
        },
    ]
  },

  // Dashboard routing
  /*
  { path: Path + 'dash', 
    component: DashComponent,
    data: {title: 'Dashboard'},
    canActivate: [LoginGuard]
  },
  */
  // Editor routing  
  /*
  { 
    path: Path + 'editor', 
    component: EditorComponent,
    data: {title: 'Editor'},
    canActivate: [LoginGuard]
  },
  */
  // Home routing
  /*
  { 
    path: Path + 'home', 
    component: HomeComponent,
    data: {title: 'Home'},
    canActivate: [LoginGuard]
  },
  */
  // Profile routing
  /*
  { 
    path: Path + 'profile', 
    component: ProfileComponent,
    data: {title: 'Profile'},
    canActivate: [LoginGuard]
  },
  */
  // Settings routing
  /*
  { 
    path: Path + 'settings', 
    component: SettingsComponent,
    data: {title: 'Settings'},
    canActivate: [LoginGuard]
  },
  */
  // Teams routing
  /*
  { 
    path: Path + 'teams', 
    component: TeamsComponent,
    data: {title: 'Teams'},
    canActivate: [LoginGuard]
  },
  */
  {
    path: '',
    redirectTo: '/ws-login',
    pathMatch: 'full'
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
