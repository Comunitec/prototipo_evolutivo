import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialactionsComponent } from './initialactions.component';

describe('InitialactionsComponent', () => {
  let component: InitialactionsComponent;
  let fixture: ComponentFixture<InitialactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialactionsComponent]
    });
    fixture = TestBed.createComponent(InitialactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
