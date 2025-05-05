import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../interfaces/customer';

import { Auth, User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth)

  authState = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.authState.next(user)
      
      if (user) {
        console.warn('User has logged in');
      } else {
        console.warn('User has logged out');
      }
    })
  }

  signIn(customer: Customer) {
    return signInWithEmailAndPassword(this.auth, customer.email, customer.password)
  }

  signOut() {
    return signOut(this.auth)
  }

  isUserSignedIn() {
    return this.auth.currentUser != null
  }

  getCurrentUser() {
    return this.auth.currentUser
  }
}
