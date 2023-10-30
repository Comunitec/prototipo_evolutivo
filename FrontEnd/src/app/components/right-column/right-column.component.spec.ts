import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightColumnComponent } from './right-column.component';

describe('RightColumnComponent', () => {
  let component: RightColumnComponent;
  let fixture: ComponentFixture<RightColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightColumnComponent]
    });
    fixture = TestBed.createComponent(RightColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
