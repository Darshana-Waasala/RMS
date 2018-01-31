import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { GeneralService } from '../../../services/general.service';
import { JsonService } from '../../../services/json.service';
import { Employee } from '../../../services/data-classes';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-utilization-history',
  templateUrl: './utilization-history.component.html',
  styleUrls: ['./utilization-history.component.css']
})
export class UtilizationHistoryComponent implements OnInit {



  constructor(
    private service: GeneralService<Employee>,
    private jsonService: JsonService
  ) { }

  panelOpenState: boolean;
  employees: Array<Employee>;
  employees$: Observable<Employee[]>;
  loading = false;
  private searchTearms = new Subject<string>();
  private employeeUrl: string;

  ngOnInit() {
    this.panelOpenState = false;
    this.loading = false;

    this.getUrl();
  }

  public getUrl() {
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.employeeUrl = response['employeeURL'];
        this.initializeSearch(this.employeeUrl);
      }
    );
  }

  public initializeSearch(empUrl: string) {
    /** pipe the searchTerm through observables to get several RXJS operations
     * to reduce the no of http calls made(typically in the early method we make 
     * http calls for each key stroke)
     */
    this.employees$ = this.searchTearms.pipe(
      // wait 300ms after each key stroke before considering the term 
      debounceTime(300),

      // ignore the term if it is same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.service.searchFrom(empUrl, 'lastName', term))
    )
  }

  public getEmpoyees() {
    /** get emloyees on button click */
    this.loading = true;
    this.employees = []
    setTimeout(() => {
      this.service.get(this.employeeUrl).subscribe(employees => {
        this.loading = false;
        this.employees = employees;
      })

    }, 2000);

  }

  // public search(value:string){
  //   /** search employee for the last name given in text box */
  //   this.service.searchFrom(value).subscribe(employees=>
  //   this.employees = employees)
  // }

  public search(value: string) {
    /** doing search as observable */

    // puch a search term into an observable stream
    this.searchTearms.next(value);
  }


}
