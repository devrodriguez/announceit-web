import { Injectable, inject } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  firestore: Firestore = inject(Firestore) 

  constructor() { }

  getCategories(): Observable<any> {
    const collRef = collection(this.firestore, 'categories')
    return collectionData(collRef)
  }
}
