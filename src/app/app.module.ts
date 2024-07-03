import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { CommonModule } from '@angular/common';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { PersonComponent } from './person/person.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'person/:person_id', component: PersonComponent },
  { path: 'movie/:movie_id', component: MoviePageComponent },
  { path: 'trending', component: TrendingMoviesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieListComponent,
    TrendingMoviesComponent,
    HomeComponent,
    MoviePageComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    PaginatorModule,
    CommonModule,
    AutoCompleteModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
