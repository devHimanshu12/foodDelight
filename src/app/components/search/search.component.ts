import { Component } from '@angular/core';
import { HighLightDirective } from '../../directives/highlight';
import { zoomElementDirective } from '../../directives/zoom';

@Component({
  selector: 'app-search',
  standalone: true,
  imports:[HighLightDirective,zoomElementDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  input:string = 'value';

  ngOnInit(){
  }

  updateInput(value:any){
    this.input = value
    console.log(this.input)
  }
}
