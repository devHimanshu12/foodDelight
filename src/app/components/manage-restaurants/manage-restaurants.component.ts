import { Component, Pipe } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { CardListsComponent } from '../card-lists/card-lists.component';
import { Lists } from '../../model/type/listsType';
import { RenderFormComponent } from '../render-form/render-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { addRestrauntFields } from '../../mock-data/add-restraunts';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LayoutService } from '../../services/layout.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-manage-restaurants',
  standalone: true,
  imports: [CardListsComponent, RenderFormComponent,FormsModule,SearchPipe],
  templateUrl: './manage-restaurants.component.html',
  styleUrl: './manage-restaurants.component.scss'
})
export class ManageRestaurantsComponent {


  restaurantArray: Lists[] = [];
  isSmallDevice: boolean = false
  searchTerm:string = '';

  constructor(private manageService: ManageService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    // to check width of device to handle mobile view dialog or bottom sheet
    this.isSmallDevice = this.layoutService.getSmallDevice()

    // subscribing to the getData method to keep an eye on action taken and update the array
    this.manageService.getData().subscribe({
      next: (response) => {
        this.restaurantArray = response
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
      width: this.isSmallDevice ? '100vw' : '60vw'
    }
    this.isSmallDevice ? this.bottomSheet.open(CustomDialogComponent,config) : this.dialog.open(CustomDialogComponent, config)
  }

  // handling the deletion of items of lists through index (with actual data it can be handled by actual in backend or frontend )
  deleteList(index: number) {
    this.manageService.deleteItem(index)
  }
}
