import { Component, OnInit } from '@angular/core';
import { MiddleLayerService } from '../../../services/middle-layer.service';
import { Employee } from '../../../services/data-classes';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.css']
})
export class PendingLeavesComponent implements OnInit {

  constructor(
    private middleLayerService:MiddleLayerService,
  ) { }

  tempAdmin = new Employee(
    0,"fullName_5","firstName_5","lastName_5","address_5","email@5","985619111v","06/13/1979","male",
    ["java","javascript","nodejs","css","scss","angular","express","sql","mongodb","spark","python","opencv","native-script","reactjs","backbone-js","docker","unix"],
    "8 years","single","0764784900",["qualification_5","qualification_7","qualification_4","qualification_10","qualification_12","qualification_13"],
    {
      "visaAvailablity": false,
      "attribute_2": "None",
      "attribute_1": "None"
    },"O+","religion","sri lankan","comment_135","08/25/1999",null,2,5,[49,43,4,80,38,20,79],
    [48, 7,13,4,3,38,11,47]
  )

  ngOnInit() {

  /** creating a temporal admin as the logged user */
    this.middleLayerService.setCurrentEmployee(this.tempAdmin);

    this.middleLayerService.getCurrentEmployee().subscribe(
      data=>console.log(data)
    )
  }

  testing(){
    console.log("in the testing function");
    this.middleLayerService.getAllPendingLeavesForAdmin(this.tempAdmin).subscribe(
      data => console.log(data)
    )
  }

}
