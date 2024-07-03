import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  API_KEY: string = '8facd01cc565c90db7affb98632e04c8';
  movies: any[] = [];
  selectedItem: string = '';
  suggestions: any[] = [];
  categories = ['All', 'Movies'];
  selectedCategory = 'All';
  private searchSubject: Subject<string> = new Subject();

  constructor(private moviesService: MovieService, private router: Router, private http: HttpClient) {}
  onCategoryChange(category: any) {
    this.selectedCategory = category.value;
    console.log('Selected Category:', category.value);
    // this.http
    //   .get(
    //     `/api/trending/all/day?language=en-US`
    //   )
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
  }
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(800)).subscribe(searchTerm => {
      console.log('Search term changed:', searchTerm);
      this.getMovies();
      // You can add additional logic here if needed
    });
  }
  getMovies() {
    this.http
      .get(
        `/api/search/movie?api_key=${this.API_KEY}&query=${this.searchTerm}&include_adult=false&language=en-US&page=1`
      )
      .subscribe((data: any) => {
        const array = () => {
          return data.results.map((item: any) => item.title);
        }
        console.log(data);
        
        this.suggestions = array();
        console.log(array());
      });

  }
  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }

  onSearch() {
    console.log(this.searchTerm);
    this.moviesService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/movies']);
  }

  onChange(event: any) {
    this.searchSubject.next(this.searchTerm);
  }
}
