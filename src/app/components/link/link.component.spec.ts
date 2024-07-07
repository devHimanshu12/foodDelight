import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { LinkConfig } from '../../model/interfaces/linkConfig';
import { NavConfig } from '../../model/interfaces/navConfig';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have linkConfig input', () => {
    const linkConfig: NavConfig = { label: 'Home', routerLink: 'home',value:'home',id:0};

    component.linkConfig = linkConfig;

    fixture.detectChanges();

    expect(component.linkConfig).toEqual(linkConfig);
  });
});
