import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authState = new BehaviorSubject<Customer>({} as Customer);

  signIn(customer: Customer): Observable<any> {
    return of();
  }

  signOut() {
    sessionStorage.removeItem('sessionToken');
  }
}
