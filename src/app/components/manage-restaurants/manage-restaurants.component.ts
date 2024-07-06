import { Component } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { CardListsComponent } from '../card-lists/card-lists.component';
import { Lists } from '../../model/type/listsType';
import { restaurantSample } from '../../mock-data/restrauantsLists';
import { RenderFormComponent } from '../render-form/render-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { addRestrauntFields } from '../../mock-data/add-restraunts';

@Component({
  selector: 'app-manage-restaurants',
  standalone: true,
  imports: [CardListsComponent,RenderFormComponent],
  templateUrl: './manage-restaurants.component.html',
  styleUrl: './manage-restaurants.component.scss'
})
export class ManageRestaurantsComponent {


  restaurantArray:Lists[] = []

  constructor(private manageService:ManageService,private dialog:MatDialog){}

  ngOnInit():void{
  this.manageService.getData().subscribe({
    next:(response)=>{
      if(response.length){
        this.restaurantArray = response
      }else{
        restaurantSample.forEach(_e=> this.manageService.addRestrauntData(_e))
      }
    },
    error:(err)=>{
      console.log(err);

    }
  })
  }

  handleAction(event:any){
    const {action,selectedList,index} = event
    action === 'edit' ? this.openEditModal(selectedList,index) : this.deleteList(index)
  }

  openEditModal(selectedList:Lists,index:number){
    const data = {
      selectedList:selectedList,
      renderFormList:addRestrauntFields,
      index:index,
      action:true
    }

    const config = {
      data:data,
      width:'60vw'
    }
    this.dialog.open(CustomDialogComponent,config)
  }

  deleteList(index:number){
    this.manageService.deleteItem(index)
  }
}
