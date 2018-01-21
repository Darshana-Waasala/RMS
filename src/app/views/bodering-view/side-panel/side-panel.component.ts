
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit} from '@angular/core';

import { SideNavDetails } from "../../../services/data-classes";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  events = [];
  evilTitle;
  currentTitle:string;
  sidenavDetails:SideNavDetails[];

  shouldRun = true; 

  ngOnInit() {
    this.evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
    this.updateSideNav();
    this.updateTopic(this.sidenavDetails[0].name);
  }

  updateSideNav(){
    /**
     * sidenavDetails array can be created and initialized using the following 
     * shown long method too
     * 
     * this.sidenavDetails = new Array(16);
     * this.sidenavDetails[1] = new SideNavDetails("test",'test','test');
     * console.log(this.sidenavDetails[1].name);
     */
    
    this.sidenavDetails = [
      /**
       * we can fill the SideNavDetails using the following two methods
       * new SideNavDetails('someName','info','somerouterlink'),
       * {name:'Utilization History',icon:'info',routerLink:'/base/utilization-history'},
       */
      {name:'Utilization History',icon:'history',routerLink:'/base/utilization-history'},
      {name:'Current Utilization',icon:'timer',routerLink:'/base/current-utilization'},
      {name:'Resource Request',icon:'assignment',routerLink:'/base/resource-request'},
      {name:'Project Utilization',icon:'people',routerLink:'/base/project-utilization'},
      // {name:'Pending request',icon:'info',routerLink:'/base/pending-request'},
      // {name:'Report',icon:'info',routerLink:'/base/report'},
      {name:'Search',icon:'search',routerLink:'/base/search'},
      {name:'Department',icon:'business',routerLink:'/base/department'},
      // {name:'Designation',icon:'info',routerLink:'/base/designation'},
      {name:'Experience',icon:'class',routerLink:'/base/expertise'},
      {name:'Location',icon:'streetview',routerLink:'/base/location'},
      {name:'Project',icon:'book',routerLink:'/base/project'},
      {name:'Resources',icon:'build',routerLink:'/base/resources'},
      {name:'Project Role',icon:'accessibility',routerLink:'/base/project-role'},
      {name:'Skills',icon:'copyright',routerLink:'/base/skills'}
    ]
  }

  updateTopic(clickedTitle:string){
    this.currentTitle = clickedTitle;
  }

}


