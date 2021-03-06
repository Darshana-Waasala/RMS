import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonService {

  private url = '../../assets/URL.json';
  private commonDataURL = '../../assets/commonData.json';

  constructor(
    private http:Http
  ) { }

  public getURL(){
    return this.http.get(this.url)
    .map((response:Response)=>response.json());
  }

  public getCommonData(){
    return this.http.get(this.commonDataURL)
    .map((response:Response)=>response.json());
  }

}
