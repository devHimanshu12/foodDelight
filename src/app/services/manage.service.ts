import { Injectable } from '@angular/core';
import { Lists } from '../model/type/listsType';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  // behavioural subject to handle list of restaurant centrally
  private $listRestaurants = new BehaviorSubject<Lists[]>([]);
  listsOfRestaurants:Lists[] = []


  constructor(private http: HttpClient ) { }

  addRestrauntData(data:Lists){
    this.listsOfRestaurants.unshift(data)
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  getData(){
    return this.$listRestaurants.asObservable();
  }

  // editdata expcets two arguments index and editedData which will return new array with edited item in it
  editData(index:number,editedData:Lists){
    this.listsOfRestaurants = this.listsOfRestaurants.map((item:Lists,idx:number)=>{
      if(idx === index){
        return editedData
      }
      return item
    })
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  // delete method which expects only index of an list of restaurants to return new array without deleted item
  deleteItem(index:number){
    this.listsOfRestaurants = this.listsOfRestaurants.filter((item,idx)=> index !== idx)
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  // mock api with array of restaurants details
  getList(){
    let url = "https://668996d70ea28ca88b886b38.mockapi.io/get/restaurantLists"
    return this.http.get(url)
  }

  getPlaceholderData(endpoint:string){
    return this.http.get(endpoint)
  }
}
