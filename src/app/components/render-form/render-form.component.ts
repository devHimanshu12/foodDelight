import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lists } from '../../model/type/listsType';
import { ManageService } from '../../services/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-render-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './render-form.component.html',
  styleUrl: './render-form.component.scss'
})
export class RenderFormComponent implements OnInit {

  renderFormGroup!:FormGroup;
  @Input() formFields:any[] = []
  @Input() dialogInput:any;
  @Output() dialogEvent = new EventEmitter<boolean>(false)
  restrauantsArray:Lists[] = []
  constructor(private manageService:ManageService,
    private router:Router
  ){
  }


  ngOnInit():void{
    const formControlObject:any = {}
    this.formFields.forEach((elem)=>{
        formControlObject[elem.field] = elem.required ? new FormControl('',[Validators.required]) : new FormControl('')
      })

    this.renderFormGroup = new FormGroup({...formControlObject})

    if(this.dialogInput){
      this.patchValue(this.dialogInput.selectedList)
    }

  }

  handleSubmit(){
    if(this.dialogInput){
      this.dialogEvent.emit(true)
    }else{
      this.manageService.addRestrauntData(this.renderFormGroup.value)
      this.router.navigateByUrl('/restaurants')
    }
  }

  editForm(){
    this.manageService.editData(this.dialogInput.index,this.renderFormGroup.value)
  }

  patchValue(selectedList:Lists){
    this.renderFormGroup.patchValue(selectedList)
  }

}
