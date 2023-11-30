import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from 'src/app/interfaces/store';

import {
  faPhone,
  faAddressBook,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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

  constructor() {
    
  }

  ngOnInit(): void { }

  onClickRightCard(store: Store) {
    this.touchEvent.emit(store)
  }
}
