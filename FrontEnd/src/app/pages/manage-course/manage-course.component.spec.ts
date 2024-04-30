import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCourseComponent } from './manage-course.component';

describe('ManageCourseComponent', () => {
  let component: ManageCourseComponent;
  let fixture: ComponentFixture<ManageCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCourseComponent]
    });
    fixture = TestBed.createComponent(ManageCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
