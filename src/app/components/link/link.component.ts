import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LinkConfig } from '../../model/interfaces/linkConfig';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  @Input() linkConfig! : LinkConfig;
  @Input() styleConfig!:any;
}
