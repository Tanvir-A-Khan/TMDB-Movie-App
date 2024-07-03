import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface Genre {
  id: number;
  name: string;
}

interface Certifications {
  order: number;
  meaning: string;
  certification: string;
}

interface Certificate {
  certificate: Certifications[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  API_KEY: string = '8facd01cc565c90db7affb98632e04c8';
  movies: Movie[] = [];
  first: number = 0;
  rows: number = 20;
  page: number = 1;
  totalRecords: number = 0;

  selectedOption: Genre = { id: 0, name: 'All' }; 
  options: Genre[] = [];

  selectedCertification: string = 'All'; 
  certifications: Certifications[] = [];
  selectedSortOrder: string = 'popularity.desc'; 
  selectedYear: string = 'All'; 
  

  constructor(private http: HttpClient, private router: Router ) {}

  ngOnInit(): void {
    this.getGenre();
    this.getMovies();
    this.getCertifications();
  }

  getCertifications(): void {
    this.http
      .get<{
        certifications: {
          [key: string]: {
            certification: string;
            meaning: string;
            order: number;
          }[];
        };
      }>(`https://api.themoviedb.org/3/certification/movie/list`, {
        params: { api_key: this.API_KEY },
      })
      .subscribe({
        next: (data) => {
          this.certifications = data.certifications['AU']; 
          console.log(this.certifications);
        },
        error: (error) => {
          console.error('Error fetching certifications:', error);
        },
      });
  }

  getGenre(): void {
    this.http
      .get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/movie/list`,
        { params: { api_key: this.API_KEY, language: 'en' } }
      )
      .subscribe({
        next: (data) => {
          this.options = data.genres;
          console.log(this.options);
        },
        error: (error) => {
          console.error('Error fetching genres:', error);
        },
      });
  }

  getMovies(): void {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', this.page.toString())
      .set('sort_by', this.selectedSortOrder);

    if (this.selectedOption.id !== 0) {
      params = params.set('with_genres', this.selectedOption.id.toString());
    }

    if (this.selectedCertification !== 'All') {
      params = params.set('certification', this.selectedCertification);
    }

    if (this.selectedYear !== 'All') {
      params = params.set('primary_release_year', this.selectedYear);
    }

    this.http
      .get<{ results: Movie[]; total_pages: number }>(url, { params })
      .subscribe({
        next: (res) => {
          this.movies = res.results;
          this.totalRecords = res.total_pages * this.rows;
          console.log(this.movies);
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
        },
      });
  }

  onSelect(option: Genre): void {
    this.selectedOption = option;
    console.log('Selected genre:', this.selectedOption);
    this.page = 1;
    this.getMovies();
  }

  selectCertification(certification: string): void {
    this.selectedCertification = certification;
    console.log('Selected certification:', this.selectedCertification);
    this.page = 1;
    this.getMovies();
  }

  onSortChange(sortOrder: string): void {
    this.selectedSortOrder = sortOrder;
    console.log('Selected sort order:', this.selectedSortOrder);
    this.page = 1;
    this.getMovies();
  }

  onYearChange(year: string): void {
    this.selectedYear = year;
    console.log('Selected year:', this.selectedYear);
    this.page = 1;
    this.getMovies();
  }

  clearFilters(): void {
    this.selectedOption = { id: 0, name: 'All' };
    this.selectedCertification = 'All';
    this.selectedSortOrder = 'popularity.desc';
    this.selectedYear = 'All';
    this.page = 1;
    this.getMovies();
  }

  getMovie(movie: number): void {
    console.log('Navigating to movie details for ID:', movie);
    this.router.navigate([`/movie/${movie}`]);
  }

  onPageChange(event: any): void {
    this.page = event.first / this.rows + 1;
    this.getMovies();
  }
}
