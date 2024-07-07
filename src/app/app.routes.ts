import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageRestaurantsComponent } from './components/manage-restaurants/manage-restaurants.component';
import { AddRestaurantsComponent } from './components/add-restaurants/add-restaurants.component';

export const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full' },
  {path:'home',component:HomeComponent},
  { path: 'restaurants', component: ManageRestaurantsComponent },
  { path: 'add-restaurant', component: AddRestaurantsComponent },
];
