import { Component, ViewChild } from '@angular/core';

import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';

import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { StoreItemsComponent } from 'src/app/components/store-items/store-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreLobbyComponent } from 'src/app/pages/store-lobby/store-lobby.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {
  @ViewChild('mdStoreLobby') storeLobby!: StoreLobbyComponent;

  faSearch = faSearch;
  latitude: number = 0;
  longitude: number = 0;
  query: string = "";
  kmDist: string = '1';
  stores: Store[] = [] as Store[];
  selStoreName: string = '';

  constructor(
    private router: Router,
    private authService: AuthService, 
    private storeService: StoreService,
    private modalService: NgbModal) {
    this.authService.authState.subscribe(res => {
      console.log('Listening from app-component', res);
    }, err => {
      console.log(err);
    });

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

  findByInput(evt: any, storeItems: StoreItemsComponent) {
    if (evt.key === 'Enter') {
      storeItems.findStores(this.kmDist, this.latitude, this.longitude, this.query);
    }
  }

  findStores() {
    this.storeService.findStore(this.kmDist, this.latitude, this.longitude, this.query)
    .subscribe((stores: Store[]) => {
      this.stores = stores ? stores : [];
    }, err => {
      console.error(err);
    });
  }

  selectCategory(catName: string) {
    this.storeService.findStore(this.kmDist, this.latitude, this.longitude, catName)
    .subscribe((stores: Store[]) => {
      this.stores = stores ? stores : [];
    }, err => {
      console.error(err);
    });
  }

  onTouchStoreCard(store: Store) {
    const storeID = store.id ?? null;
    this.router.navigate(['/stores', storeID])
  }
}
