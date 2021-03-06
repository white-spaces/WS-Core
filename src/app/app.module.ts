// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
import { HttpService } from './Ws-Core/Modules/Services/Http/http.service';
import { ClientService } from './Ws-Core/Modules/Services/client/client.service';
import { PlannerPlanService } from './Ws-Core/Modules/Services/client/plannerPlan.service';
import { PlannerBucketService } from './Ws-Core/Modules/Services/client/plannerBucket.service';
import { PlannerTaskService } from './Ws-Core/Modules/Services/client/plannerTask.service';
import { GroupService } from './Ws-Core/Modules/Services/client/group.service';
import { LoginService } from './Ws-Core/Modules/Services/Auth/login.service';
import { LogoutService } from './Ws-Core/Modules/Services/Auth/logout.service';
import { TitleService } from './Ws-Core/Modules/Services/Title/title.service';
import { WeatherService } from './Ws-Core/Modules/Services/Weather/weather.service';

// Logic Services 
import { GroupLogicService } from './Ws-Core/Modules/LogicServices/GroupLogic/groupLogic.service';

// Auth Guard
import {LoginGuard } from './Ws-Core/Modules/Services/Guard/login.guard';
import { LoaderComponent } from './Ws-Core/Modules/Components/loader/loader.component';
// Ws Core View Components
import { OverviewComponent } from './Ws-Core/Modules/Components/ws-core-view/home/overview/overview.component';
import { WeatherComponent } from './Ws-Core/Modules/Components/ws-core-view/home/weather/weather.component';
import { QuickNotesComponent } from './Ws-Core/Modules/Components/ws-core-view/home/quick-notes/quick-notes.component';
import { ShortcutsComponent } from './Ws-Core/Modules/Components/ws-core-view/home/shortcuts/shortcuts.component';
import { CalendarComponent } from './Ws-Core/Modules/Components/ws-core-view/home/calendar/calendar.component';
import { CoreViewComponent } from './Ws-Core/Modules/Components/ws-core-view/core-view/core-view.component';
import { TopNavComponent } from './Ws-Core/Modules/Components/top-nav/top-nav.component';




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
    LoginComponent,
    OverviewComponent,
    WeatherComponent,
    QuickNotesComponent,
    ShortcutsComponent,
    CalendarComponent,
    LoaderComponent,
    CoreViewComponent,
    TopNavComponent
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
    ClientService,
    LoginService,
    LogoutService,
    LoginGuard,
    TitleService,
    WeatherService,
    PlannerPlanService,
    PlannerBucketService,
    PlannerTaskService,
    GroupService,
    GroupLogicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(titleService: TitleService) {
    titleService.init();
  }
}
