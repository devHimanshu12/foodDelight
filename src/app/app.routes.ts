import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageRestaurantsComponent } from './components/manage-restaurants/manage-restaurants.component';
import { AddRestaurantsComponent } from './components/add-restaurants/add-restaurants.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full' },
  { path: 'landing',component:LandingComponent },
  {path:'home',component:HomeComponent},
  { path: 'restaurants', component: ManageRestaurantsComponent },
  { path: 'add-restaurant', component: AddRestaurantsComponent },
];
