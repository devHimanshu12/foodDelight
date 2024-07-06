import { Injectable } from '@angular/core';
import { Lists } from '../model/type/listsType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private $listRestaurants = new BehaviorSubject<Lists[]>([]);
  listsOfRestaurants:Lists[] = []


  constructor() { }

  addRestrauntData(data:Lists){
    this.listsOfRestaurants.push(data)
    this.$listRestaurants.next(this.listsOfRestaurants)
  }

  getData(){
    return this.$listRestaurants.asObservable();
  }

  editData(index:number,editedData:Lists){
    this.listsOfRestaurants = this.listsOfRestaurants.map((item:Lists,idx:number)=>{
      console.log(index,idx);

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
}
