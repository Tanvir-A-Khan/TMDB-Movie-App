import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  searchSubject = new Subject<string>();
  idSubject = new Subject<string>();

  setId(id: string): void {
    console.log(id);
    this.idSubject.next(id);
  }

  getId() {
    return this.idSubject.asObservable();
  }

  setSearchTerm(term: string) {
    console.log(term);
    this.searchSubject.next(term);
  }

  getSearchTerm() {
    return this.searchSubject.asObservable();
  }
}
