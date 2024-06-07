import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroAoSalvarAulaComponent } from './modal-erro-ao-salvar-aula.component';

describe('ModalErroAoSalvarAulaComponent', () => {
  let component: ModalErroAoSalvarAulaComponent;
  let fixture: ComponentFixture<ModalErroAoSalvarAulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroAoSalvarAulaComponent]
    });
    fixture = TestBed.createComponent(ModalErroAoSalvarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
