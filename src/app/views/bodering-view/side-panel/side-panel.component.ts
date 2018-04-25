
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit} from '@angular/core';

import { SideNavDetails } from "../../../services/data-classes";
import { Router, NavigationEnd } from '@angular/router';

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
  sideNavObject:Object;

  shouldRun = true; 

  constructor(
    private router:Router
  ){
  }

  ngOnInit() {
    this.evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
    this.updateSideNav();
    this.updateTopic();
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
      {name:'Report',icon:'info',routerLink:'/base/report'},
      {name:'Search',icon:'search',routerLink:'/base/search'},
      {name:'Department',icon:'business',routerLink:'/base/department'},
      {name:'Designation',icon:'info',routerLink:'/base/designation'},
      
      
    ];

    this.sideNavObject = {
      project:[
        {name:'Project',icon:'book',routerLink:'/base/project'}, // overall view of projects
        {name:'Pending Request',icon:'book',routerLink:'/base/pending-request'}, // pending resouce requests viewed by admin or resource manager
        {name:'MyProject',icon:'book',routerLink:'/base/my-project'},// current project information (overview, messages,tasks)
      ],
      genInfo:[
        {name:'Employee',icon:'folder',routerLink:'/base/employee'}, // for admin view
        {name:'Client-Trainer',icon:'folder',routerLink:'/base/client-trainer'},
      ],
      trainingProgram:[
        {name:'Training Program',icon:'note',routerLink:'/base/training-program'}, // create new training programs, current training programs, past and future
        {name:'Comments',icon:'note',routerLink:'/base/comments'}, // this will view the comments as the trainig program is searched
      ],
      leave:[
        {name:'Apply Leave', icon:'copyright', routerLink:'/base/apply-leave'},
        {name:'Pending Leaves', icon:'copyright',routerLink:'/base/pending-leave'},
      ],
      messages:[
        {name:'Messages',icon:'class',routerLink:'/base/messages'} // will show messages related to project, general messages, view by sender level
      ],
      profile:[
        {name:'Profile',icon:'class',routerLink:'/base/profile'},
        {name:'Settings',icon:'class',routerLink:'/base/settings'},
      ]
    }
  }

  updateTopic(){
    this.getName(this.router.url);
    this.router.events.subscribe(event=>{
      if( event instanceof NavigationEnd){
        this.getName(event.url);
      }
    }
    );
  }

  getName(url:string):number{
    for(var key in this.sideNavObject){
      for(var item in this.sideNavObject[key]){
        if(url === this.sideNavObject[key][item]['routerLink']){
          this.currentTitle = this.sideNavObject[key][item]['name'];
          return 0;
        }
      }
    }
  }

  signout(){
    localStorage.setItem('isLoggedin',undefined);
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

}


