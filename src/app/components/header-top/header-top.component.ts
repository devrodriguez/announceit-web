import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
// Fontawsome
import {
  faPlusCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { AuthService, AuthService as LocalAuthService } from '../../services/auth.service';

// Bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {

  @ViewChild('mdLogin') mdLogin: ElementRef = {} as ElementRef;
  @ViewChild('mdRegister') mdRegister: ElementRef = {} as ElementRef;

  faPlusCircle = faPlusCircle;
  faUser = faUser;

  prevPublic = false;
  navOpen = false;

  public user: SocialUser = {} as SocialUser;
  public loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private locAuthService: LocalAuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem('session', '{}')
  
  }

  openModal(mdLogin: TemplateRef<any>) {
    this.modalService.dismissAll();
    this.modalService.open(mdLogin, { centered: true })
  }

  openPublicar(mdLogin: TemplateRef<any>, mdRegister: TemplateRef<any>) {
    this.prevPublic = true;
    if (this.loggedIn) {
      this.modalService.open(mdRegister, { centered: true });
    } else {
      this.modalService.open(mdLogin, { centered: true });
    }
  }

  signOut(): void {
    this.authService.signOut();
    this.locAuthService.signOut();
    this.navOpen = false;
  }

  customerLogged(evt: any) {
    this.modalService.dismissAll();
  }

  customerRegistered(evt: any) {
    this.modalService.dismissAll();
  }

  toggleNavbar() {
    this.navOpen = !this.navOpen;
  }
}
