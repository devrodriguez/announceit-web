import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { StoreItemsComponent } from './components/store-items/store-items.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './components/auth/auth.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { StoreLobbyComponent } from './pages/store-lobby/store-lobby.component';
import { FinderComponent } from './pages/finder/finder.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CategoryItemsComponent,
    FooterComponent,
    HeaderTopComponent,
    RegisterCustomerComponent,
    RegisterStoreComponent,
    StoreItemsComponent,
    StoreLobbyComponent,
    FinderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
