import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnChanges {

  @ViewChild(SearchComponent) search!: SearchComponent  ;


  ngOnChanges(changes: SimpleChanges): void {
      console.log('changes');

  }

  ngOnInit(){
    console.log(1)
  }

  ngAfterViewInit(){
    console.log('in par')
    this.search.input = '5'
    this.search.updateInput(20)

    // console.log(this.search)
  }

}
