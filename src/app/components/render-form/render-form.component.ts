import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  steps = 0.25
  restrauantsArray:Lists[] = []
  constructor(private manageService:ManageService,
    private router:Router
  ){
  }


  ngOnInit():void{
    const formControlObject:any = {}
    this.formFields.forEach((elem)=>{
      console.log(elem);

      switch (elem.type) {
        case 'email':
          formControlObject[elem.field] = new FormControl('',[Validators.required,Validators.email])
          break;
        case 'tel':
          formControlObject[elem.field] =  new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.maxLength(10),Validators.minLength(10)])
          break;

        default:
          formControlObject[elem.field] = elem.required ? new FormControl('',[Validators.required]) : new FormControl('')
          break;
      }
      })

    this.renderFormGroup = new FormGroup({...formControlObject})

    if(this.dialogInput){
      this.patchValue(this.dialogInput.selectedList)
    }
  }


  get email(){
    return this.renderFormGroup.get('email')
  }

  get phone(){
    return this.renderFormGroup.get('phone')
  }

  handleSubmit(){
    if(this.renderFormGroup.invalid){
      console.log(this.renderFormGroup);
      this.renderFormGroup.markAllAsTouched()
      window.alert('Please fill all required fields marked with * and use correct formats for phone and email')
      return
    }else{
      if(this.dialogInput){
        this.dialogEvent.emit(true)
      }else{
        this.manageService.addRestrauntData(this.renderFormGroup.value)
        this.router.navigateByUrl('/restaurants')
      }
    }
  }

  editForm(){
    this.manageService.editData(this.dialogInput.index,this.renderFormGroup.value)
  }

  patchValue(selectedList:Lists){
    this.renderFormGroup.patchValue(selectedList)
  }

}
