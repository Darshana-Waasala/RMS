import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router/src/events';
import {JsonService } from '../../../services/json.service';

@Component({
  selector: 'app-current-utilization',
  templateUrl: './current-utilization.component.html',
  styleUrls: ['./current-utilization.component.css']
})
export class CurrentUtilizationComponent implements OnInit {

  private urls:string;
  constructor(private jsonService:JsonService) { }

  ngOnInit() {
    this.jsonService.getURL()
    .subscribe(resURLs => this.urls = resURLs)
  }

  public print(){
    console.log(this.urls["employeeURL"])
  }

}

