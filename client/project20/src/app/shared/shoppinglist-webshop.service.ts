import { Injectable } from '@angular/core';
import {Shoppinglist, Shoppingitem, User, Comment} from "./shoppinglist";

import { HttpClient} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";


@Injectable()
export class ShoppinglistWebshopService {
  private api = 'http://project20.s1710456015.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Shoppinglist>>{
    return this.http.get(`${this.api}/shoppinglists`).pipe(retry(3))
      .pipe(catchError(this.errorHandler))
  }

  getSingle (id: number): Observable<Shoppinglist> {
    console.log(id);
    return this.http.get<Shoppinglist>(`${this.api}/shoppinglists/${id}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler))
  }

  create(shoppinglist: Shoppinglist): Observable<any>{
    return this.http.post(`${this.api}/shoppinglist`, shoppinglist).pipe(retry(3))
      .pipe(catchError(this.errorHandler))
  }


  update(shoppinglist: Shoppinglist): Observable<any> {
    return this.http.put(`${this.api}/shoppinglist/${shoppinglist.id}`, shoppinglist)
      .pipe( retry(3)).pipe(catchError(this.errorHandler))
  }


  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/shoppinglist/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }

}


/*
@Injectable()
export class ShoppinglistWebshopService {
  //shoppinglists:Shoppinglist[];


  constructor() {
    this.shoppinglists = [
      new Shoppinglist(1,'Einkaufsliste1', 30, new Date(2020, 5, 20),
        [new Shoppingitem(1, 'Mehl', '2kg', 3),
          new Shoppingitem(2, 'Zucker', '1 Packung', 2)],
        [new User(1, 'Max', 'Muster', true, 'test@test.at')]
      ),


      new Shoppinglist(2,'Einkaufsliste2', 50, new Date(2020, 6, 10),
        [new Shoppingitem(3, 'Brot', '1kg', 4),
          new Shoppingitem(4, 'Milch', '2 Liter', 2)],
        [new User(2, 'Stefan', 'Salzburg', true, 'test@test.com')]
      ),

      new Shoppinglist(3,'Einkaufsliste3', 40.40, new Date(2020, 5, 19),
        [new Shoppingitem(5, 'Käse', '0.5kg', 5),
          new Shoppingitem(6, 'Joghurt', '250g', 1)],
        [new User(4, 'Susi', 'Summer', true, 'test@mail.com')]
      )
    ];

  }

  getAll(){
    return this.shoppinglists;
  }
  getSingle(id: number) : Shoppinglist{

    for(let shoppinglist of this.shoppinglists) {

      if(shoppinglist.id == id) {

        return shoppinglist;
      }
    }
    //return this.shoppinglists.find(shoppinglist => shoppinglist.id === id);

  }

}
*/
