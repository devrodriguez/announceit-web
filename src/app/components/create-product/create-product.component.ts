import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  @Input() public storeID: string = '';
  @Input() public product?: Product = {} as Product;
  
  @Output() public productCreated = new EventEmitter<string>();

  public productFrm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storeService: StoreService,
  ) {
    
  }

  ngOnInit(): void {
    this.productFrm = this.formBuilder.group({
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      price: [this.product?.price || 0, Validators.required],
      urlImages: [this.product?.urlImages || []]
    })
  }

  async createProduct() {
    try {
      if (!this.storeID) return;
      if (!this.productFrm.valid) return;

      if (this.product) {
        const docSnap = await this.storeService.updateProduct(this.storeID, this.product.id!, this.productFrm.value)
        console.log(docSnap)
        this.productCreated.emit('updated')
        return;
      }

      const docSnap = await this.storeService.addProductToStore(this.storeID, this.productFrm.value)
      console.log(docSnap)
      this.productCreated.emit('created')
    } catch (error) {
      console.error(error)
    }
  }

  closeModal() {
    this.productCreated.emit('closed')
  }
}
