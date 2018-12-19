import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }
  
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  
  getWeather(){
    let headers = this._headers;    
    return this.http.get<any>('https://api.darksky.net/forecast/dc08aa414a57d8f05e2e6860d682c635/64.9631,19.02078?units=si', {headers: headers})
}

}
