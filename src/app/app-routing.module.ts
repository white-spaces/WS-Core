import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './Modules/Components/ws-core-view/dash/dash.component';
import { EditorComponent } from './Modules/Components/ws-core-view/editor/editor.component';
import { HomeComponent } from './Modules/Components/ws-core-view/home/home.component';
import { ProfileComponent } from './Modules/Components/ws-core-view/profile/profile.component';
import { SettingsComponent } from './Modules/Components/ws-core-view/settings/settings.component';
import { TeamsComponent } from './Modules/Components/ws-core-view/teams/teams.component';
import { PageNotFoundComponent } from './Modules/Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Modules/Components/login/login.component';


const Path = "ws/"


const routes: Routes = [
  {
    path: 'ws',
    component: LoginComponent,
    data: {title: 'White Spaces'}
  },

  // Dashboard routing
  { path: Path + 'dash', 
    component: DashComponent,
    data: {title: 'Dashboard'}},
  
  // Editor routing  
  { 
    path: Path + 'editor', 
    component: EditorComponent,
    data: {title: 'Editor'}},
  
  // Home routing
  { 
    path: Path + 'home', 
    component: HomeComponent,
    data: {title: 'Home'}},
  
  // Profile routing
  { 
    path: Path + 'profile', 
    component: ProfileComponent,
    data: {title: 'Profile'}},
  
  // Settings routing
  { 
    path: Path + 'settings', 
    component: SettingsComponent,
    data: {title: 'Settings'}},
  
  // Teams routing
  { 
    path: Path + 'teams', 
    component: TeamsComponent,
    data: {title: 'Teams'}},

  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
