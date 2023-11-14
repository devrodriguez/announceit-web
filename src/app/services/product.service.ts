import { Injectable, inject } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  firestore: Firestore = inject(Firestore) 

  constructor() { }

  getProducts(): Observable<any> {
    const collRef = collection(this.firestore, 'products')
    return collectionData(collRef)
  }
}
