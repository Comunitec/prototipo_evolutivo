import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleColumnComponent } from './middle-column.component';

describe('MiddleColumnComponent', () => {
  let component: MiddleColumnComponent;
  let fixture: ComponentFixture<MiddleColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddleColumnComponent]
    });
    fixture = TestBed.createComponent(MiddleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
