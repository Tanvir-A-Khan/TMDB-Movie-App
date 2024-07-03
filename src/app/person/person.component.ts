import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personId: string = '';
  person: any;
  movies: any[] = [];

  private readonly API_KEY: string = '8facd01cc565c90db7affb98632e04c8';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = params['person_id'];
      this.getPersonDetails();
      this.getPersonMovieCredits();
    });
  }

  getPersonDetails(): void {
    this.http
      .get(`https://api.themoviedb.org/3/person/${this.personId}?api_key=${this.API_KEY}&language=en-US`)
      .subscribe((data: any) => {
        this.person = data;
        console.log('Person Details:', this.person);
      });
  }

  getPersonMovieCredits(): void {
    this.http
      .get(`https://api.themoviedb.org/3/person/${this.personId}/movie_credits?api_key=${this.API_KEY}&language=en-US`)
      .subscribe((data: any) => {
        this.movies = data.cast;
        console.log('Person Movies:', this.movies);
      });
  }

  getMovie(movie: any): void {
    console.log(movie.id);
    this.router.navigate([`/movie/${movie.id}`])
  } 
}
