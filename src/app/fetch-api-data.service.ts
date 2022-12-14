import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://favmovie-schen.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class  FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

 // Making the api call for the user registration endpoint (posts it to the API endpoint and returns the API's response)
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User login call
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Get all movies call
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  //Get one specific movie
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${Title}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/directors/${Name}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
    'Something bad happened; please try again later.');
  }

  
// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}

/* 
export class FetchApiDataService {

  constructor() { }
}
 */