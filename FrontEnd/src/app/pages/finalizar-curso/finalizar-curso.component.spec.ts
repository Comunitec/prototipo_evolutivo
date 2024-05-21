import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarCursoComponent } from './finalizar-curso.component';

describe('FinalizarCursoComponent', () => {
  let component: FinalizarCursoComponent;
  let fixture: ComponentFixture<FinalizarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizarCursoComponent]
    });
    fixture = TestBed.createComponent(FinalizarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
