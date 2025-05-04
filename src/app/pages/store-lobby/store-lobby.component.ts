import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Store } from 'src/app/interfaces/store';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from 'src/app/components/create-product/create-product.component';

@Component({
  selector: 'app-store-lobby',
  templateUrl: './store-lobby.component.html',
  styleUrls: ['./store-lobby.component.scss']
})
export class StoreLobbyComponent implements OnInit {
  storeID: string = '';
  store: Store = {} as Store;
  products: Product[] = [] as Product[]
  currentProduct?: Product = {} as Product

  constructor(
    private router: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.storeID = this.router.snapshot.paramMap.get('store_id')!;
    this.loadStore(this.storeID)
    this.loadProducts()
  }

  async loadStore(storeID: string) {
    try {
      const docSnap = await this.storeService.getStore(storeID)
      this.store = docSnap.data() as Store
    } catch (error) {
      console.error(error)
    }
  }

  async loadProducts() {
    this.productService
      .getProducts(this.storeID)
      .subscribe({
        next: (products: Product[]) => {
          this.products = products
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  openModal(product?: Product) {
    const modalRef = this.modalService.open(CreateProductComponent)
    modalRef.componentInstance.product = product
    modalRef.componentInstance.storeID = this.storeID
    modalRef.componentInstance.productCreated.subscribe({
      next: (evt: string) => {
        this.modalService.dismissAll()
      }
    })
  }
}
