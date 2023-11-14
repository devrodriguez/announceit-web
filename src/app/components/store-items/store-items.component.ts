import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/interfaces/store';

import {
  faPhone,
  faAddressBook,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.scss']
})
export class StoreItemsComponent implements OnInit {
  @Input() stores: Store[] = [];
  @Output() touchEvent = new EventEmitter<Store>();

  faInfoCircle = faInfoCircle;
  faPhone = faPhone;
  faAddressBook = faAddressBook;
  faWhatsapp = faWhatsapp;

  // stores: Store[] = [] as Store[];

  environment = { apiHost: '' }

  constructor(private storeService: StoreService) {
    this.loadStores()
  }

  ngOnInit(): void { }

  loadStores() {
    this.storeService
      .getStores()
      .subscribe((stores: Store[]) => {
        this.stores = stores;
      }, err => {
        console.log(err);
      });
  }

  findStores(kmDist: string, lat: number, lon: number, q: string) {
    this.storeService.findStore(kmDist, lat, lon, q).subscribe((stores: Store[]) => {
      this.stores = stores ? stores : [];
    }, err => {
      console.error(err);
    });
  }

  getImage(image: any) {
    if (image) {
      return `${this.environment.apiHost}/s/${image[0]}`;
    }

    return `${this.environment.apiHost}/s/stores/mt1.png`;
  }

  onClickRightCard(store: Store) {
    console.log('Emiting!!!')
    this.touchEvent.emit(store)
  }
}
