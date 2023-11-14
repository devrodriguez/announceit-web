import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
  faAppleAlt,
  faShoppingBasket,
  faDrumstickBite,
  faCut,
  faBreadSlice,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {
  @Output() selectCategoryEvt = new EventEmitter<string>();

  faAppleAlt = faAppleAlt;
  faShoppingBasket = faShoppingBasket;
  faDrumstickBite = faDrumstickBite;
  faCut = faCut;
  faBreadSlice = faBreadSlice;
  faUtensils = faUtensils;

  categories: Category[] = [];
  /*
  categories: Category[] = [
    {
      name: 'Frutas',
      icon: faAppleAlt,
      class: 'bg-success'
    },
    {
      name: 'Mercado',
      icon: faShoppingBasket,
      class: 'bg-info'
    },
    {
      name: 'Carne',
      icon: faDrumstickBite,
      class: 'bg-danger'
    },
    {
      name: 'Belleza',
      icon: faCut,
      class: 'bg-primary'
    },
    {
      name: 'Panaderia',
      icon: faBreadSlice,
      class: 'bg-warning'
    },
    {
      name: 'Restaurante',
      icon: faUtensils,
      class: 'bg-secondary'
    }
  ];
  */

  constructor(private categorySrv: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorySrv
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      }, err => {
        console.error(err);
      });
  }

  selectCategory(evt: any, category: Category) {
    evt.stopPropagation();
    this.selectCategoryEvt.emit(category.name);
  }

}
