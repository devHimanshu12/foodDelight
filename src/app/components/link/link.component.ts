import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LinkConfig } from '../../model/interfaces/linkConfig';
import { NavConfig } from '../../model/interfaces/navConfig';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  @Input() linkConfig! : NavConfig;
}
