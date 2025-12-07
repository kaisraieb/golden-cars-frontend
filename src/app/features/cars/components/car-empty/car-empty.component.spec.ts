import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEmptyComponent } from './car-empty.component';

describe('CarEmptyComponent', () => {
  let component: CarEmptyComponent;
  let fixture: ComponentFixture<CarEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
