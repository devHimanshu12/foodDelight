import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormComponent } from './render-form.component';
import { ManageService } from '../../services/manage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Lists } from '../../model/type/listsType';
import { HttpClient, provideHttpClient } from '@angular/common/http';

class mockManageService {
  addRestrauntData(data: any) { return of(true); }
  editData(index: number, data: any) { return of(true); }
}

class mockRouter {
  navigateByUrl(url: string) { return of(true); }
}

const testingData =  {
  name:'filter coffee',
  location:'Indiranagar,Bengaluru',
  phone:98344503480,
  email:'abc@gmail.com'
}

describe('RenderFormComponent', () => {
  let component: RenderFormComponent;
  let fixture: ComponentFixture<RenderFormComponent>;
  let manageService: ManageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderFormComponent,ReactiveFormsModule,FormsModule],
      providers: [
        provideHttpClient(),HttpClient,
        { provide: ManageService, useClass: mockManageService },
        { provide: Router, useClass: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderFormComponent);
    component = fixture.componentInstance;
    manageService = TestBed.inject(ManageService);
    router = TestBed.inject(Router);

    component.formFields = [
      { field: 'name', type: 'text', required: true },
      { field: 'email', type: 'email', required: true },
      { field: 'phone', type: 'tel', required: true },
      { field: 'location', type: 'text', required: true },
    ];

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.renderFormGroup.contains('phone')).toBeTruthy();
    expect(component.renderFormGroup.contains('email')).toBeTruthy();

  });

  it('should set name control to required with name validator', () => {
    const emailControl = component.renderFormGroup.get('name');
    emailControl!.setValue('');
    expect(emailControl!.hasError('required')).toBeTruthy();
  });

  it('should set email control to required with email validator', () => {
    const emailControl = component.renderFormGroup.get('email');
    emailControl!.setValue('');
    expect(emailControl!.hasError('required')).toBeTruthy();
    emailControl!.setValue('abcy');
    expect(emailControl!.hasError('email')).toBeTruthy();
  });

  it('should set phone control to required with pattern and length validators', () => {
    const phoneControl = component.renderFormGroup.get('phone');
    phoneControl!.setValue('');
    expect(phoneControl!.hasError('required')).toBeTruthy();
    phoneControl!.setValue('12345');
    expect(phoneControl!.hasError('minlength')).toBeTruthy();
    phoneControl!.setValue('12345678901');
    expect(phoneControl!.hasError('maxlength')).toBeTruthy();
    phoneControl!.setValue('invalidPhone');
    expect(phoneControl!.hasError('pattern')).toBeTruthy();
  });

  it('should set location control to required with location validator', () => {
    const emailControl = component.renderFormGroup.get('location');
    emailControl!.setValue('');
    expect(emailControl!.hasError('required')).toBeTruthy();
  });

  it('should mark all fields as touched and alert if form is invalid on submit', () => {
    spyOn(window, 'alert');
    component.handleSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please fill all required fields marked with * and use correct formats for phone and email');
    expect(component.renderFormGroup.get('name')!.touched).toBeTruthy();
    expect(component.renderFormGroup.get('email')!.touched).toBeTruthy();
    expect(component.renderFormGroup.get('phone')!.touched).toBeTruthy();
    expect(component.renderFormGroup.get('location')!.touched).toBeTruthy();

  });

  it('should call addRestrauntData and navigate to /restaurants if form is valid and dialogInput is null', () => {
    spyOn(manageService, 'addRestrauntData').and.callThrough();
    spyOn(router, 'navigateByUrl');

    component.renderFormGroup.get('name')!.setValue('Tandoori taal');
    component.renderFormGroup.get('email')!.setValue('test@example.com');
    component.renderFormGroup.get('phone')!.setValue(1234567890);
    component.renderFormGroup.get('location')!.setValue('12th Main');
    component.dialogInput = null;

    component.handleSubmit();

    expect(manageService.addRestrauntData).toHaveBeenCalledWith(component.renderFormGroup.value);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/restaurants');
  });

  it('should emit dialogEvent true if form is valid and dialogInput is not null', () => {
    spyOn(component.dialogEvent, 'emit');

    component.renderFormGroup.get('name')!.setValue('Tandoori tall');
    component.renderFormGroup.get('email')!.setValue('test@example.com');
    component.renderFormGroup.get('phone')!.setValue(1234567890);
    component.renderFormGroup.get('location')!.setValue('12th main');

    component.dialogInput = { selectedList: testingData, index: 1 };

    component.handleSubmit();

    expect(component.dialogEvent.emit).toHaveBeenCalledWith(true);
  });

  it('should patch values to the form if dialogInput is provided', () => {
    const selectedList: Lists = testingData
    component.dialogInput = { selectedList, index: 1 };

    component.ngOnInit();
    expect(component.renderFormGroup.value).toEqual(selectedList);
  });

  it('should call editData with correct parameters on editForm', () => {
    spyOn(manageService, 'editData').and.callThrough();
    component.dialogInput = { selectedList: testingData, index: 1 };

    component.editForm();
    expect(manageService.editData).toHaveBeenCalledWith(1, component.renderFormGroup.value);
  });
});
