import { Component,Inject, Optional } from '@angular/core';
import { RenderFormComponent } from '../render-form/render-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [RenderFormComponent,MatBottomSheetModule,MatDialogModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss'
})
export class CustomDialogComponent {

  dialogData:any;
  isSmallDevice:boolean = false;

  constructor(private layoutService:LayoutService,
    @Optional() public dialogRef:MatDialogRef<CustomDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public _bottomSheetRef: MatBottomSheetRef<CustomDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public bottomSheetData:any){
  }

  ngOnInit():void{
    this.isSmallDevice = this.layoutService.getSmallDevice()
    console.log(this.isSmallDevice,this.bottomSheetData,this.data);

    this.dialogData = this.isSmallDevice ? this.bottomSheetData : this.data
  }

  closeDialog(event:boolean){
    if(event){
     this.isSmallDevice ? this._bottomSheetRef.dismiss() : this.dialogRef.close()
    }

  }

}
