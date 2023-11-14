import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreLobbyComponent } from './pages/store-lobby/store-lobby.component';
import { FinderComponent } from './pages/finder/finder.component';

const routes: Routes = [
  {
    path: 'stores/:store_id',
    component: StoreLobbyComponent
  },
  {
    path: '',
    component: FinderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
