import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../../../services/general.service';
import { ClientTrainer } from '../../../../services/data-classes';
import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-client-trainer',
  templateUrl: './client-trainer.component.html',
  styleUrls: ['./client-trainer.component.css']
})
export class ClientTrainerComponent implements OnInit {

  /** variables for the tables /////////////////////////////////////////////// */
  displayedColumns = ['projectName', 'projectManager', 'totalExpences', 'deadLine', 'customer', 'projectCatogary', 'action'];
  dataSource: MatTableDataSource<ClientTrainer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ///////////////////////////////////////////////

  public clients: Array<ClientTrainer>;
  public trainers: Array<ClientTrainer>;

  constructor(
    private genClientService: GeneralService<ClientTrainer>,
    private middleLayerService: MiddleLayerService,
  ) { }

  ngOnInit() {
  }

  /**apply the filter function in the table */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getClientTrainer() {
    this.middleLayerService.getURLs().subscribe(
      URLs => {
        this.genClientService.get(URLs["someURL"]).subscribe(
          cliTrai => {
            let separatedCliTrainer = this.binaryDevider(cliTrai, 'type', 0);
            this.clients = separatedCliTrainer.positive;
            this.trainers = separatedCliTrainer.negative;
          }
        );
      }
    );
  }

  viewClients(){
            // Assign the data to the data source for the table to render
        /**initially the tables are filled with current projects */
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  viewTrainers(){
            // Assign the data to the data source for the table to render
        /**initially the tables are filled with current projects */
        this.dataSource = new MatTableDataSource(this.trainers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  binaryDevider(array: Array<any>, property: any, value: any) {
    let positiveArray = new Array<any>();
    let negativeArray = new Array<any>();
    for (var i = 0; i < array.length; i++) {
      if (array[i][property] === value) {
        positiveArray.push(array[i]);
      } else {
        negativeArray.push(array[i]);
      }
    }
    return { positive: positiveArray, negative: negativeArray }
  }

}
