import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Lists } from '../../model/type/listsType';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-card-lists',
  standalone: true,
  imports: [TitleCasePipe,MatMenuModule,MatIconModule],
  templateUrl: './card-lists.component.html',
  styleUrl: './card-lists.component.scss'
})
export class CardListsComponent {

  @Input() lists!:Lists;
  @Output() actionEvent = new EventEmitter()
  @Input() formIndex:number | null = null;

  constructor(){}

  handleMenuAction(action:string,selectedList:Lists,index:number){
    this.actionEvent.emit({action:action,selectedList:selectedList,index:index})
  }



}
