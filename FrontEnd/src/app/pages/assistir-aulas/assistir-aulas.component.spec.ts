import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistirAulasComponent } from './assistir-aulas.component';

describe('AssistirAulasComponent', () => {
  let component: AssistirAulasComponent;
  let fixture: ComponentFixture<AssistirAulasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistirAulasComponent]
    });
    fixture = TestBed.createComponent(AssistirAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
