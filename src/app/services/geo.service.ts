import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  getAddresPredictions(term: string): Observable<any> {
    return of()
  }
}
