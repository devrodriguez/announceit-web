import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faL, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { GoogleLoginProvider, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { NgForm } from '@angular/forms';

import { AuthService as LocalAuthService } from '../../services/auth.service';
import { Customer } from 'src/app/interfaces/customer';
import { timeInterval } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output() loggedInEvt = new EventEmitter<boolean>();
  @Output() doRegisterEvt = new EventEmitter();
  @ViewChild("registerCustComponent") registerCustComponent: any;

  faGoogle = faGoogle;
  faFacebook = faFacebook;
  faSignInAlt = faSignInAlt;

  isAlert: Boolean = false
  alertMessage: string = ''

  customer: Customer = {} as Customer;

  constructor(private localAuthService: LocalAuthService) { }

  ngOnInit(): void {
  }

  signInGoogle(): void {
    
  }

  signInFacebook(): void {
    
  }

  signUp() {
    this.registerCustComponent.register(this.registerCustComponent.frmRegCus);
  }

  async signInLocal(form: NgForm) {
    this.customer.email = form.control.value.email;
    this.customer.password = form.control.value.password;

    try {
      const credentials = await this.localAuthService.signIn(this.customer)
      this.localAuthService.authState.next(credentials.user);
      this.loggedInEvt.emit(true);
    } catch (error) {
      console.error(error)
      this.showAlert(true, 'Not valid auth')
    }
  }

  consumerRegistered(res: any) {
    console.log('In AuthComponent.consumerRegistered', res);
    this.loggedInEvt.emit(true);
  }

  doRegister() {
    this.doRegisterEvt.emit();
  }

  showAlert(show: Boolean, message: string) {
    this.isAlert = show
    this.alertMessage = message

    setTimeout(() => {
      this.isAlert = false
      this.alertMessage = ''
    }, 2000)
  }
}
