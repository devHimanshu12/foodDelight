import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appZoomElement]',
  standalone:true
})

export class zoomElementDirective{
  @HostBinding('class')class:string = ''


  @HostListener('mouseover')
  onMouseOver() {
     this.class = 'zoom_element'
  }

  @HostListener('mouseleave')
  onMouseLeave() {
     this.class = ''
  }

}
