import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {baseUrl} from '../../environments/common';
import {GetUser, Login, Register} from '../interfaces/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
interface ItemsResponse {
  results: string[];
}
@Injectable()
export class AuthService {

  private signupUrl = baseUrl + 'accounts/signup/';
  private usernameUrl = baseUrl + 'accounts/check_username/';
  private emailUrl = baseUrl + 'accounts/check_email/';
  private getuserUrl = baseUrl + 'accounts/get_user/';
  private loginUrl = baseUrl + 'accounts/login/';

  constructor(
    private http: HttpClient,
  ) { }

  apiError =  (err: HttpErrorResponse) => {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      // console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }

  signUp (data: Register): Observable<Register> {
    return this.http.post<Register>(this.signupUrl, data, httpOptions).pipe(
      tap((resp: Register) => this.log(`Added user w/ username=${resp.username}`)),
      catchError(this.handleError<Register>('addHero'))
    );
  }
  checkUsername (username: string): Observable<boolean> {
    return this.http.get<string>(this.usernameUrl + username, httpOptions).pipe(
      tap(resp => this.log(`Checked ${{username}} w/ found=${resp}`)),
      catchError(this.handleError<any>('checkUsername'))
    );
  }
  checkEmail (email: string): Observable<boolean> {
    return this.http.post<string>(this.emailUrl, [email], httpOptions).pipe(
      tap(resp => this.log(`Checked ${{email}} w/ found=${resp}`)),
      catchError(this.handleError<any>('checkEmail'))
    );
  }
  getUser (username: string): Observable<any> {
    return this.http.post<any>(this.getuserUrl, {'username': username}, httpOptions).pipe(
      tap(resp => this.log(`Checked ${{username}} w/ found=${resp.status}`)),
      catchError(this.handleError<any>('checkuser'))
    );
  }

  login (data: Login): Observable<Register> {
    return this.http.post<Register>(this.loginUrl, data, httpOptions);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('Log is : ' + message);
  }
}
