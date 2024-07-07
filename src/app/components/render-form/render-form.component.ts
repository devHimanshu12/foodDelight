import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lists } from '../../model/type/listsType';
import { ManageService } from '../../services/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-render-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './render-form.component.html',
  styleUrl: './render-form.component.scss'
})
export class RenderFormComponent implements OnInit {

  renderFormGroup!: FormGroup;
  @Input() formFields: any[] = []
  @Input() dialogInput: any;
  @Output() dialogEvent = new EventEmitter<boolean>(false)
  restrauantsArray: Lists[] = []
  constructor(private manageService: ManageService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    // creating the form dynamic by calling create reactive form method
    this.createForm()

    // if renderForm is called through any modal it will have dialogInput with selected list which will get pre populate
    if (this.dialogInput) {
      this.patchValue(this.dialogInput.selectedList)
    }
  }
  // below we are creating the form dynamically and adding validators to required fields
  createForm() {
    const formControlObject: any = {}
    this.formFields.forEach((elem) => {
      switch (elem.type) {
        case 'email':
          formControlObject[elem.field] = new FormControl('', [Validators.required, Validators.email])
          break;
        case 'tel':
          formControlObject[elem.field] = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(10), Validators.minLength(10)])
          break;

        default:
          formControlObject[elem.field] = elem.required ? new FormControl('', [Validators.required]) : new FormControl('')
          break;
      }
    })

    this.renderFormGroup = new FormGroup({ ...formControlObject })
  }


  /** get email and phone is to get email and phone control and use them in html to error fields */
  get email() {
    return this.renderFormGroup.get('email')
  }

  get phone() {
    return this.renderFormGroup.get('phone')
  }

  /** to handle the form validity and submit the form and when form is invalid alert
   is thrown with message otherwise data is added to restaurants array */
  handleSubmit() {
    if (this.renderFormGroup.invalid) {
      this.renderFormGroup.markAllAsTouched()
      window.alert('Please fill all required fields marked with * and use correct formats for phone and email')
      return
    } else {
      if (this.dialogInput) {
        this.dialogEvent.emit(true)
      } else {
        this.manageService.addRestrauntData(this.renderFormGroup.value)
        this.router.navigateByUrl('/restaurants')
      }
    }
  }

  /* when editForm is called when save is clicked after editing the form and it sends index
   and value to manageservice editData method to get edited value */
  editForm() {
    this.manageService.editData(this.dialogInput.index, this.renderFormGroup.value)
  }

  /** to pre populate the value in forms when edit dialog or bottomsheet
   is opened patchValue property of renderFormGroup is used */
  patchValue(selectedList: Lists) {
    this.renderFormGroup.patchValue(selectedList)
  }

}
