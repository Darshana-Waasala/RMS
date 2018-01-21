import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;

  resources = [
    {value: 'resource-1', viewValue: 'resource one'},
    {value: 'resource-2', viewValue: 'resource two'},
    {value: 'resource-3', viewValue: 'resource three'}
  ];

  projects = [
    {value: 'project-1', viewValue: 'project one'},
    {value: 'project-2', viewValue: 'project two'},
    {value: 'project-3', viewValue: 'project three'}
  ];

  divisions = [
    {value: 'division-1', viewValue: 'division one'},
    {value: 'division-2', viewValue: 'division two'},
    {value: 'division-3', viewValue: 'division three'}
  ];

  skills = [
    {value: 'skill-1', viewValue: 'skill one'},
    {value: 'skill-2', viewValue: 'skill two'},
    {value: 'skill-3', viewValue: 'skill three'}
  ];

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.createFrom();
   }

  createFrom(){
    this.searchForm = this.formBuilder.group({
      resource:['',Validators.required],
      project:'',
      division:'',
      skill:'',
      startDate:'',
      endDate:''
    });
  }

  ngOnInit() {
  }

  printValue(){
    console.log(this.searchForm)
    console.log(this.searchForm.value)
  }
}
