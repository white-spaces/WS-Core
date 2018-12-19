import { Component, OnInit, NgZone } from '@angular/core';
import { WeatherService } from '../../../../Services/Weather/weather.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {
  image: any;
  Forecast: any;
  ForecastName: any;
  Temp: any;

  constructor(
    private weather: WeatherService,
    private zone: NgZone,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.weather.getWeather().subscribe(data => {
      let x = data.currently.temperature;
      this.zone.run(() => {
        this.Forecast = data;
        this.Temp = Math.round(x);
        let y = data.currently.icon;
        this.ForecastName = y.split('-').join(' ')
        this.image = this.sanitizer.bypassSecurityTrustStyle(`url(../../../../../../../assets/weather/${data.currently.icon}.svg)`);              
      })
    })
  }

}
