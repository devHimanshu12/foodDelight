import { Injectable } from '@angular/core';
import { Lists } from '../model/type/listsType';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private $listRestaurants = new BehaviorSubject<Lists[]>([]);
  listsOfRestaurants:Lists[] = []


  constructor(private http: HttpClient ) { }

  addRestrauntData(data:Lists){
    this.listsOfRestaurants.push(data)
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  getData(){
    return this.$listRestaurants.asObservable();
  }

  editData(index:number,editedData:Lists){
    this.listsOfRestaurants = this.listsOfRestaurants.map((item:Lists,idx:number)=>{
      if(idx === index){
        return editedData
      }
      return item
    })
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  deleteItem(index:number){
    this.listsOfRestaurants = this.listsOfRestaurants.filter((item,idx)=> index !== idx)
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  getList(){
    let url = "https://668996d70ea28ca88b886b38.mockapi.io/get/restaurantLists"
    return this.http.get(url)
  }
}
