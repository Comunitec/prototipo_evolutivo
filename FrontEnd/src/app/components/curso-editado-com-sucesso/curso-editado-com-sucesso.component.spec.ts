import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEditadoComSucessoComponent } from './curso-editado-com-sucesso.component';

describe('CursoEditadoComSucessoComponent', () => {
  let component: CursoEditadoComSucessoComponent;
  let fixture: ComponentFixture<CursoEditadoComSucessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoEditadoComSucessoComponent]
    });
    fixture = TestBed.createComponent(CursoEditadoComSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
