import { Injectable, inject } from '@angular/core';

import { Firestore, collection, collectionData, doc, getDoc} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  firestore: Firestore = inject(Firestore) 

  constructor() { }

  createStore(data: Store): Observable<any> {
    return of()
  }

  getStore(storeID: string) {
    const docRef = doc(this.firestore, 'stores', storeID)
    return getDoc(docRef)
  }

  getStores(): Observable<any> {
    const collRef = collection(this.firestore, 'stores')
    return collectionData(collRef, {idField: 'id'}) 
  }

  findStore(kmDist: string, lat: number, lon: number, q: string): Observable<any> {
    return of()
  }

  getCategories(): Observable<any> {
    return of()
  }
}
