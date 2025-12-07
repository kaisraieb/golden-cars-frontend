import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSkeletonComponent } from './car-skeleton.component';

describe('CarSkeletonComponent', () => {
  let component: CarSkeletonComponent;
  let fixture: ComponentFixture<CarSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
