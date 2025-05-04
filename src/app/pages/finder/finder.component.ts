import { Component, ViewChild } from '@angular/core';

import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';

import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {

  faSearch = faSearch;
  latitude: number = 0;
  longitude: number = 0;
  query: string = "";
  kmDist: string = '1';
  stores: Store[] = [] as Store[];
  categories: Category[] = [] as Category[]

  selStoreName: string = '';

  constructor(
    private router: Router,
    private storeService: StoreService) {
    this.setCurrentGeolocation();
  }

  setCurrentGeolocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, err => {
        console.log(err);
      });
    }
  }

  onSearchKeyDown(evt: any) {
    if (evt.key === 'Enter') {
      this.storeService
        .getStores()
        .subscribe({
          next: (stores: Store[]) => {
            this.stores = stores;
          },
          error: (err) => {
            console.error(err)
          }
        })
    }
  }

  selectCategory(category: string) {
    this.storeService.getStoreByCategory(category)
      .subscribe((stores: Store[]) => {
        this.stores = stores;
      }, err => {
        console.error(err);
      });
  }

  onTouchStoreCard(store: Store) {
    const storeID = store.id ?? null;
    this.router.navigate(['/stores', storeID])
  }
}
