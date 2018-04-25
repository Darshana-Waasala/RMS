import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { JsonService } from './json.service';
import { Observable } from 'rxjs/Observable';

import { Employee, Visa, TrainingProgram, Project, TermParams } from './data-classes';
import { error } from 'util';
import { Options } from 'selenium-webdriver/chrome';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class GeneralService<T> {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /**get the whole list of items for given url */
  public get(url: string): Observable<T[]> {
    return this.http.get<T[]>(url)
      .pipe(
        tap(employees => this.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  /**get the whole list of items sorted */
  public getSorted(url: string, parameter: string): Observable<T[]> {
    return this.http.get<T[]>(`${url}?_sort=${parameter}&_order=asc`)
      .pipe(
        tap(employees => this.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  /** get item by id. 404 if not found */
  public getById(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}/${id}`)
      .pipe(
        tap(_ => this.log('fetched employee id=${id}')),
        catchError(this.handleError<T>(`get Employee id = ${id}`))
      )
  }

  /** PUT update the item in the server */
  public update(url: string, employee: Employee): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.put(url, employee, httpOptions)
      .pipe(
        tap(_ => `updated employee id =${employee.id}`),
        catchError(this.handleError<any>('update employee'))
      )
  }

  /** POST a new item to the server */
  public post(url: string, item: any): Observable<T> { // the item will be of any format array or object 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<T>(url, item)
      .pipe(
        tap((itemRsp: T) => this.log(`posted item  = ${itemRsp}`)),
        catchError(this.handleError<any>(`post item ${item}`))
      )
  }

    /** POST a new item to the server */
    public postAnyReturn(url: string, item: any): Observable<any> { // the item will be of any format array or object 
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      return this.http.post<any>(url, item)
        .pipe(
          tap((itemRsp: T) => this.log(`posted item  = ${itemRsp}`)),
          catchError(this.handleError<any>(`post item ${item}`))
        )
    }

  /** DELETE an item */
  public delete(url: string, employee: Employee | number): Observable<T> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const uri = `${url}/${id}`;
    console.log('IN THE DELETE FUNCITON');
    console.log(uri);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.delete<T>(uri, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted employee : id=${id}`)),
        catchError(this.handleError<any>('delete employee'))
      )
  }

  /** GET employees from the name in the search form */
  public searchFrom(url: string, attribute: string, term: string): Observable<T[]> {
    if (!term.trim()) {
      return of([])
    }

    return this.http.get<T[]>(`${url}/?${attribute}_like=${term}`)
      .pipe(
        tap(_ => this.log(`found items matching "${term}"`)),
        catchError(this.handleError<any[]>('search item', []))
      )
  }

  /** GET items(employees) for the table search with pagination */
  public getItemsInPage(url: string, sort: string, order: string, page: number): Observable<T[]> {
    return this.http.get<T[]>(`${url}/?_sort=${sort}&_order=asc&_page=${page}`)
      .pipe(
        tap(_ => this.log(`found employees in page : ${page}`)),
        catchError(this.handleError<any[]>('get heroes', []))
      )
  }

  /**GET items with specific attribute match(full match)  */
  public getItemsWithExactAttribute(url: string, attribute: string, term: string | number): Observable<T[]> {
    return this.http.get<T[]>(`${url}/?${attribute}=${term}`)
      .pipe(
        tap(_ => this.log(`fond items matching : ${term}`)),
        catchError(this.handleError<any[]>('search item', []))
      )
  }

  /** GET query parameters in body than as URL parameters */
  public getItemsWithMultipleQueries(url: string, termsAndParas: TermParams[]): Observable<T[]> {
    var options = {};
    for (var i = 0; i < termsAndParas.length; i++) {
      options = {
        params: new HttpParams().set(termsAndParas[i].term, termsAndParas[i].param),
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' })
      }
    }
    return this.http.get<T[]>(url, options)
      .pipe(
        tap(_ => this.log(`fond items matching : ${termsAndParas}`)),
        catchError(this.handleError<any[]>('search item', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
