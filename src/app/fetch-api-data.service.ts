import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://favmovie-schen.herokuapp.com/';

//Decorator to make this service available everywhere
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * POST to the '/users' endpoint of apiUrl to register a new user
   * 
   * @param userDetails
   * @returns An Observable, which can be subscribed for a response. The response returns an object holds
   * a user object, if resolved, or an error object, if rejected.
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    //console.log('userRegistration() in service: ', userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST to the '/login' endpoint of apiUrl to login a user
   * 
   * @param userDetails
   * @returns An Observable, which can be subscribed for a response. The response returns an object holds
   * a user object, if resolved, or an error object, if rejected.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * GET request to the '/movies' endpoint of apiUrl to get the full list of movies
   * 
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of all the movies, if resolved, or an error object, if rejected.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  /**
   * GET request to the '/users/[Username]' endpoint of apiUrl to get all the data of a specific user
   * 
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of a specific user, if resolved, or an error object, if rejected.
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username=localStorage.getItem('username')
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  /**
   * POST request to the '/users/[Username]/movies/[movieID]' endpoint of apiUrl to add a movie to the user's 
   * favorite movies list
   * 
   * @param movieID - the ID No. of the added movie
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of the updated user, if resolved, or an error object, if rejected.
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(
        `${apiUrl}users/${username}/movies/${movieID}`,
        { FavoriteMovie: movieID },
        {
          headers: new HttpHeaders(
          {Authorization: 'Bearer ' + token})
        })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  /**
   * DELETE request to the '/users/[Username]/movies/[movieID]' endpoint of apiUrl to remove a movie from the user's 
   * favorite movies list.
   * 
   * @param movieID - the ID No. of the deleted movie
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of the updated user, if resolved, or an error object, if rejected.
   */
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  /**
   * PUT request to the '/users/[Username]' endpoint of apiUrl to update the user's data.
   * 
   * @param updatedUserDetails - an object holds updated user data
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of the updated user, if resolved, or an error object, if rejected.
   */
  editUser(updatedUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUserDetails, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }

  /**
   * DELETE request to the '/users/[Username]' endpoint of apiUrl to update the user's data.
   * 
   * @param username - a string holds the current username
   * @returns An Observable, which can be subscribed for a response. The response returns a message, if resolved,
   *  or an error message, if rejected.
   */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    //const username = localStorage.getItem('username');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Error handler
   * 
   * @param error
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    console.log('handleError', error);
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(error.error);
  }

  
  /**
   * Extracts response data from HTTP response
   * 
   * @param res - response from HTTP response
   * @returns response body or empty object
   */
  private extractResponseData(res: Object): Object {
    //console.log(res);
    const body = res;
    return body || { };
  }
}

/*
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

  getGenre(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genre/${Name}`, {
        headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token})
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  }
  */