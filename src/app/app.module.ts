import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Modules/Components/navigation/navigation.component';
import { HomeComponent } from './Modules/Components/ws-core-view/home/home.component';
import { DashComponent } from './Modules/Components/ws-core-view/dash/dash.component';
import { EditorComponent } from './Modules/Components/ws-core-view/editor/editor/editor.component';
import { SettingsComponent } from './Modules/Components/ws-core-view/settings/settings.component';
import { TeamsComponent } from './Modules/Components/ws-core-view/teams/teams.component';
import { ProfileComponent } from './Modules/Components/ws-core-view/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DashComponent,
    EditorComponent,
    SettingsComponent,
    TeamsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
