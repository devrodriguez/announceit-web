import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  @Input() storeID: string = '';
  
  @Output() productCreated = new EventEmitter<void>();

  public productFrm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
    this.productFrm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      urlImages: ['', Validators.required]
    })
  }

  async createProduct() {
    try {
      const docSnap = await this.storeService.addProductToStore(this.storeID, this.productFrm.value)
      console.log(docSnap)
      this.productCreated.emit()
    } catch (error) {
      console.error(error)
    }
  }
}
