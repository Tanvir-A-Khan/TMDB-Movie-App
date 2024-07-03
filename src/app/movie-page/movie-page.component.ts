import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  movie: any;
  cast: any[] = [];
  API_KEY: string = '8facd01cc565c90db7affb98632e04c8';
  movieId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['movie_id'];
      this.getMovieDetails();
      this.getMovieCast();
      this.getMovieTrailer();
    });
    
  }

  getMovieDetails(): void {
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.API_KEY}&language=en-US`
      )
      .subscribe((data: any) => {
        this.movie = data;
        console.log(this.movie);
      });
  }

  getMovieCast(): void {
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=${this.API_KEY}&language=en-US`
      )
      .subscribe((data: any) => {
        this.cast = data.cast;
        console.log(this.cast);
      });
  }

  getMovieTrailer(): void {
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${this.API_KEY}&language=en-US`
      )
      .subscribe((data: any) => {
        const trailer = data.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          this.movie.trailer = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      });
  }

  extractYouTubeId(link: string): string | null {
    // Match YouTube video ID pattern from various URL formats
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regExp);

    if (match && match[1]) {
      return match[1]; // Return the extracted video ID
    } else {
      return null; // Return null if no valid video ID found
    }
  }

  getPerson(id: string):void{
    console.log(id);
    this.router.navigate([`/person/${id}`]);
  }
  watchTrailer(movie: any): void{
    window.open(movie, '_blank');  // Open the trailer in a new tab
  }
}
