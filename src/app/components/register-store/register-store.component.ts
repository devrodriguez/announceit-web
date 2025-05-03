import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { StoreService } from 'src/app/services/store.service';
import { Category } from 'src/app/interfaces/category';
import { GeoService } from 'src/app/services/geo.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.sass']
})
export class RegisterStoreComponent implements OnInit {
  storeData: Store = {} as Store;
  categories: Category[] = [] as Category[];
  selectedCategory: Category = {} as Category;
  searching = false;
  searchFailed = false;

  constructor(private storeService: StoreService, private geoService: GeoService) {
    this.storeData.urlImages = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.storeService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  processFile(image: any) {
    const files: File[] = image.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.storeData.urlImages.push(event.target.result);
      });

      reader.readAsDataURL(file);
    }
  }

  register() {
    this.storeData.category = this.selectedCategory
    this.storeService.createStore(this.storeData)
    .then(res => {
      this.storeData = {} as Store;
    })
    .catch(err => {
      console.error(err)
    });
  }

  // findCoordinates() {
  //   const addressEncoded = encodeURI(this.storeData.Address);
  //   this.geoService.addressToCoordinates(addressEncoded).subscribe(res => {
  //     console.log(res);
  //   }, err => {
  //     console.error(err);
  //   });
  // }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.geoService.getAddresPredictions(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    );
  }
}
