import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Lists } from './model/type/listsType';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ManageService } from './services/manage.service';
import { restaurantSample } from './mock-data/restrauantsLists';
import { ActivatedRoute } from '@angular/router';

class MockManageService {
  getList() {
    return of([]);
  }
  addRestrauntData(data: Lists) {
    return;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let manageService: ManageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,NavBarComponent],
      providers: [
        provideHttpClient(),HttpClient,
        { provide: ManageService, useClass: MockManageService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} },
        paramMap: of({ get: () => null }) } }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    manageService = TestBed.inject(ManageService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'foodieDelight'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('foodieDelight');
  });

  it('should call getListOfRestaurants on ngOnInit', () => {
    spyOn(component, 'getListOfRestaurants');
    component.ngOnInit();
    expect(component.getListOfRestaurants).toHaveBeenCalled();
  });

  it('should populate restaurantList on successful getList API call', () => {
    const mockDataResponse: Lists[] = restaurantSample;
    spyOn(manageService, 'getList').and.returnValue(of(mockDataResponse));
    spyOn(manageService, 'addRestrauntData');

    component.getListOfRestaurants();

    expect(component.restaurantList).toEqual(mockDataResponse);
    expect(manageService.addRestrauntData).toHaveBeenCalledWith(mockDataResponse[0]);
  });

});
