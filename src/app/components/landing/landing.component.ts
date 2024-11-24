import { Component, signal, Signal } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  data:any;
  loading:boolean = false;
  mySignal =  signal(1)

  constructor(private manageService:ManageService ){

  }

  ngOnInit(){
    this.loading = true;
    this.manageService.getPlaceholderData("https://jsonplaceholder.typicode.com/posts").subscribe({
      next:(res)=>{
        console.log(res)
        this.mySignal.update((prev)=> prev+1)
        this.data = res;
        this.loading = false
      }
    })
  }

}
