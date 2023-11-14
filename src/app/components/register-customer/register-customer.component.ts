import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.sass']
})
export class RegisterCustomerComponent implements OnInit {
  @Input() embedded: boolean = false;
  @Output() registeredInEvt = new EventEmitter<boolean>();
  @ViewChild("frmRegCus") frmRegCus: any;

  customer: Customer = {} as Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.customer.name = form.control.value.name;
    this.customer.email = form.control.value.email;
    this.customer.phoneNumber = form.control.value.phoneNumber;
    this.customer.password = form.control.value.password;

    this.customerService.createCustomer(this.customer).subscribe(res => {
      console.log('RegisterCustomerComponent.register.result', res);
      this.registeredInEvt.emit(true);
    }, err => {
      console.log('RegisterCustomerComponent.register.error', err);
      this.registeredInEvt.emit(false);
    });
  }

}
