import { Component,Inject } from '@angular/core';
import { RenderFormComponent } from '../render-form/render-form.component';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { addRestrauntFields } from '../../mock-data/add-restraunts';


@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [RenderFormComponent],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss'
})
export class CustomDialogComponent {

  dialogData:any;

  constructor(public dialogRef:MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
  }

  ngOnInit():void{
    this.dialogData = this.data
  }

  closeDialog(event:boolean){
    if(event) this.dialogRef.close()
  }

}
