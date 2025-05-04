import { Injectable, inject } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  firestore: Firestore = inject(Firestore) 

  constructor() { }

  getProducts(storeId: string): Observable<any> {
    const collRef = collection(this.firestore, 'stores', storeId, 'products')
    return collectionData(collRef)
  }
}
