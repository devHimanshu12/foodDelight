import { Component } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { CardListsComponent } from '../card-lists/card-lists.component';
import { Lists } from '../../model/type/listsType';
import { RenderFormComponent } from '../render-form/render-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { addRestrauntFields } from '../../mock-data/add-restraunts';

@Component({
  selector: 'app-manage-restaurants',
  standalone: true,
  imports: [CardListsComponent, RenderFormComponent],
  templateUrl: './manage-restaurants.component.html',
  styleUrl: './manage-restaurants.component.scss'
})
export class ManageRestaurantsComponent {


  restaurantArray!: any;

  constructor(private manageService: ManageService, private dialog: MatDialog) { }

  ngOnInit(): void {

    // subscribing to the getData method to keep an eye on action taken and update the array
    this.manageService.getData().subscribe({
      next: (response) => {
        this.restaurantArray = response
      }
    })

    // calling the api through getListOfRestaurants method and hitting the mock api and
    // if don't want to see mock sample then comment the below method(line)
    // this.getListOfRestaurants()
  }

  getListOfRestaurants() {
    this.manageService.getList().subscribe({
      next: (res) => {
        this.restaurantArray = res
        // to add sample data from mock api to listsOfRestaurants in manage service to control list from service like edit and delete
        this.restaurantArray.forEach((_e: Lists) => this.manageService.addRestrauntData(_e))
      }
    })
  }

  // handle edit and delete action performed on list of restaurants
  handleAction(event: any) {
    const { action, selectedList, index } = event
    action === 'edit' ? this.openEditModal(selectedList, index) : this.deleteList(index)
  }

  // opening the modal when edit button is click and sending the required data
  openEditModal(selectedList: Lists, index: number) {
    const data = {
      selectedList: selectedList,
      renderFormList: addRestrauntFields,
      index: index,
      action: true
    }

    const config = {
      data: data,
      width: '60vw'
    }
    this.dialog.open(CustomDialogComponent, config)
  }

  // handling the deletion of items of lists through index (with actual data it can be handled by actual in backend or frontend )
  deleteList(index: number) {
    this.manageService.deleteItem(index)
  }
}
