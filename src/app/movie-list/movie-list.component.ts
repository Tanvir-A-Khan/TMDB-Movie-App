import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  first: number = 1;
  rows: number = 20;
  totalRecords: number = 1;

  API_KEY: string = '8facd01cc565c90db7affb98632e04c8';
  page: number = 1;
  search_terms: string = 'anime';

  constructor(
    private http: HttpClient,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }
  searchSubscription: Subscription = this.movieService
    .getSearchTerm()
    .subscribe((term) => {
      this.search_terms = term;
      console.log(term);
      this.getMovies();
    });
  getMovies() {
    this.http
      .get(
        `/api/search/movie?api_key=${this.API_KEY}&query=${this.search_terms}&include_adult=false&language=en-US&page=${this.page}`
      )
      .subscribe((data: any) => {
        this.movies = data.results;
        this.totalRecords = data.total_results;
        console.log(data);
      });

    console.log('Reqested Page: ', this.page);
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.getMovies();
  }

  getMovie(movie: any): any {
    console.log(movie);
    this.movieService.setId(movie);
    this.router.navigate([`/movie/${movie}`]);
  }
}
