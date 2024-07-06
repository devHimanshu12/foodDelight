import { NavConfig } from "../model/interfaces/navConfig";

export const navBarItems:NavConfig[] = [
  {
    label:'Home',
    routerLink:'/',
    value:'home',
    id:0
  },
  {
    label:'Manage Restaurants',
    routerLink:'restaurants',
    value:'manage',
    id:1
  },
  {
    label:'Add Restaurant',
    routerLink:'add-restaurant',
    value:'add-restaurants',
    id:2
  }
]
