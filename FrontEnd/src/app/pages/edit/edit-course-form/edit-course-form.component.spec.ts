import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseFormComponent } from './edit-course-form.component';

describe('EditCourseFormComponent', () => {
  let component: EditCourseFormComponent;
  let fixture: ComponentFixture<EditCourseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseFormComponent]
    });
    fixture = TestBed.createComponent(EditCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
