import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCursosAlunoComponent } from './meus-cursos-aluno.component';

describe('MeusCursosAlunoComponent', () => {
  let component: MeusCursosAlunoComponent;
  let fixture: ComponentFixture<MeusCursosAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusCursosAlunoComponent]
    });
    fixture = TestBed.createComponent(MeusCursosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
