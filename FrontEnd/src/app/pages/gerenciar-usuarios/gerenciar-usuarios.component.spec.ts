import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarUsuariosComponent } from './gerenciar-usuarios.component';

describe('GerenciarUsuariosComponent', () => {
  let component: GerenciarUsuariosComponent;
  let fixture: ComponentFixture<GerenciarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarUsuariosComponent]
    });
    fixture = TestBed.createComponent(GerenciarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
