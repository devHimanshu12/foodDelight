import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { navBarItems } from '../../mock-data/nav-bar';
import { NavConfig } from '../../model/interfaces/navConfig';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isCollapsed:boolean = true;
  navBarItems:NavConfig[] = navBarItems

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getLabel(event:string){
    return event
  }
}
