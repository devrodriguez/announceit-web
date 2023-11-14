import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  createCustomer(customer: Customer): Observable<any> {
    return of()
  }
}
