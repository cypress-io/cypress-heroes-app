import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Power } from './models';

@Injectable({
  providedIn: 'root',
})
export class PowerService {
  constructor(private http: HttpClient) {}

  private powersUrl = 'http://localhost:3000/powers'; // URL to web api

  getPowers(): Observable<Power[]> {
    return this.http
      .get<Power[]>(this.powersUrl)
      .pipe(catchError(this.handleError<Power[]>('getPowers', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
