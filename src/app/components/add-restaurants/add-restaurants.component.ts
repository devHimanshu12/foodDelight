import { Component } from '@angular/core';
import { addRestrauntFields } from '../../mock-data/add-restraunts';
import { RenderFormComponent } from '../render-form/render-form.component';

@Component({
  selector: 'app-add-restaurants',
  standalone: true,
  imports: [RenderFormComponent],
  templateUrl: './add-restaurants.component.html',
  styleUrl: './add-restaurants.component.scss'
})
export class AddRestaurantsComponent {
  restaurantsFields = addRestrauntFields
}
