import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css'],
})
export class TrendingMoviesComponent implements OnInit {
  movies: any[] = [];
  first: number = 1;
  rows: number = 20;
  totalRecords: number = 1;

  constructor(private http: HttpClient) {}
  API_KEY: string = '8facd01cc565c90db7affb98632e04c8';
  page: number = 1;
  search_terms: string = 'iron man';

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
    this.http
      .get(`/api/trending/all/day?api_key=${this.API_KEY}&language=en-US`)
      .subscribe((data: any) => {
        this.movies = data.results;
        this.totalRecords = data.total_results;
        console.log(data);
      });

    console.log('Reqested Page: ', this.page);
    
  }

  getMovie(movie: any): any {
    console.log(movie);
    // this.movieService.setId(movie);
    // this.router.navigate([`/movie/${movie}`]);
  }
}
