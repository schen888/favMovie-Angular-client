import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';

import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[]=[];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((res: any)=>{
      this.movies=res;
      console.log('getMovies():', this.movies);
      return this.movies;
    })
  }

    /**
   * Opens genre information from GenreComponent
   * @param {string} name
   * @param {string} description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    });
  }
}
