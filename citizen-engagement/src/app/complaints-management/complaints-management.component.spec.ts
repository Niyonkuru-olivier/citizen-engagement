import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsManagementComponent } from './complaints-management.component';

describe('ComplaintsManagementComponent', () => {
  let component: ComplaintsManagementComponent;
  let fixture: ComponentFixture<ComplaintsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
