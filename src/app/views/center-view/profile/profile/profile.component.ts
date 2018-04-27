import { Component, OnInit } from '@angular/core';
import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { Employee } from '../../../../services/data-classes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentEmployee:Employee;

  constructor(
    private middlelayerService:MiddleLayerService,
  ) { }

  ngOnInit() {
    this.middlelayerService.getCurrentEmployee().subscribe(
      emp => {
        this.currentEmployee = emp;
      }
    );
  }



}
