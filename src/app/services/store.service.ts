import { Injectable, inject } from '@angular/core';

import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, query, updateDoc, where} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { Store } from '../interfaces/store';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  firestore: Firestore = inject(Firestore) 

  constructor() { }

  createStore(data: Store) {
    const docRef = collection(this.firestore, 'stores')
    return addDoc(docRef, data)
  }

  getStore(storeID: string) {
    const docRef = doc(this.firestore, 'stores', storeID)
    return getDoc(docRef)
  }

  getStores(): Observable<any> {
    const collRef = collection(this.firestore, 'stores')
    return collectionData(collRef, { idField: 'id' }) 
  }

  getStoreByCategory(category: string): Observable<any> {
    const collRef = collection(this.firestore, 'stores')
    const q = query(collRef, where('category.name', '==', category))

    return collectionData(q, { idField: 'id' })
  }

  findStore(kmDist: string, lat: number, lon: number, q: string): Observable<any> {
    return of()
  }

  getCategories(): Observable<any> {
    const collRef = collection(this.firestore, 'categories')
    return collectionData(collRef, {idField:'id'})
  }

  addProductToStore(storeID: string, data: Product) {
    const docRef = collection(this.firestore, 'stores', storeID, 'products')
    return addDoc(docRef, data)
  }

  updateProduct(storeID: string, productID: string, product: Product) {
    if (!storeID) return new Error('Not provided storeID');
    if (!productID) return new Error('Not provided productID');
    if (!product) return new Error('Not provided product');

    const docRef = doc(this.firestore, 'stores', storeID, 'products', productID)
    return updateDoc(docRef, {...product})
  }
}
