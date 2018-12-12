// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './Ws-Core/Modules/Components/navigation/navigation.component';
import { HomeComponent } from './Ws-Core/Modules/Components/ws-core-view/home/home.component';
import { DashComponent } from './Ws-Core/Modules/Components/ws-core-view/dash/dash.component';
import { EditorComponent } from './Ws-Core/Modules/Components/ws-core-view/editor/editor.component';
import { SettingsComponent } from './Ws-Core/Modules/Components/ws-core-view/settings/settings.component';
import { TeamsComponent } from './Ws-Core/Modules/Components/ws-core-view/teams/teams.component';
import { ProfileComponent } from './Ws-Core/Modules/Components/ws-core-view/profile/profile.component';
import { PageNotFoundComponent } from './Ws-Core/Modules/Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Ws-Core/Modules/Components/login/login.component';

// Services
import { AuthService } from './Ws-Core/Modules/Services/Auth/auth.service';
import { HttpService } from './Ws-Core/Modules/Services/http.service';
import { HomeService } from './Ws-Core/Modules/Services/home.service';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DashComponent,
    EditorComponent,
    SettingsComponent,
    TeamsComponent,
    ProfileComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpService,
    HomeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
