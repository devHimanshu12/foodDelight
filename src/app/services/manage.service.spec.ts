import { TestBed } from '@angular/core/testing';

import { ManageService } from './manage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Lists } from '../model/type/listsType';
import { restaurantSample } from '../mock-data/restrauantsLists';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
const MockTestingData =  {
  name:'filter coffee',
  location:'Indiranagar,Bengaluru',
  phone:98344503480,
  email:'abc@gmail.com'
}

describe('ManageService', () => {
  let service: ManageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], // Add HttpClientModule here
      providers: [ManageService,provideHttpClient()]
    });    service = TestBed.inject(ManageService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add restaurant data', () => {
    const mockData: Lists = MockTestingData

    service.addRestrauntData(mockData);

    service.getData().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0]).toEqual(mockData);
    });
  });

  it('should edit restaurant data', () => {
    const initialData: Lists[] = restaurantSample;
    service.listsOfRestaurants = initialData.slice();

    const editedData: Lists = MockTestingData
    const index = 1;

    service.editData(index, editedData);

    service.getData().subscribe(data => {
      expect(data.length).toBe(3);
      expect(data[index]).toEqual(editedData);
    });
  });

  it('should delete restaurant data', () => {
    const initialData: Lists[] = restaurantSample
    service.listsOfRestaurants = initialData.slice();

    const index = 0;

    service.deleteItem(index);

    service.getData().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('Tapas');
    });
  });
});
