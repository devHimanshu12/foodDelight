import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ManageService } from './services/manage.service';
import { Lists } from './model/type/listsType';
import { restaurantSample } from './mock-data/restrauantsLists';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent],
  providers:[ManageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'foodieDelight';

  restaurantList:any = []

  constructor(private manageService:ManageService  ){}

  ngOnInit(){
    this.getListOfRestaurants()
  }

  getListOfRestaurants() {
    this.manageService.getList().subscribe({
      next: (res) => {
        this.restaurantList = res
        // to add sample data from mock api to listsOfRestaurants in manage service to control list from service like edit and delete
        this.restaurantList.forEach((_e: Lists) => this.manageService.addRestrauntData(_e))
      },
      error:(err)=>{
        // in case mock api fails, so sample i have added in mock-data folder and updated the restaurant list
        restaurantSample.forEach((_e: Lists) => this.manageService.addRestrauntData(_e))
      }
    })
  }
}
