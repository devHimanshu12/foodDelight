import { Directive, HostBinding, OnInit, HostListener } from '@angular/core'

@Directive({
  selector: '[appHighLight]',
  standalone:true
})
export class HighLightDirective implements OnInit {

  @HostBinding('style.border') border!: string;

  ngOnInit() {
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.border = '5px solid green';
    console.log("Mouse over")
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.border = '';
    console.log("Mouse Leave")
  }

}
