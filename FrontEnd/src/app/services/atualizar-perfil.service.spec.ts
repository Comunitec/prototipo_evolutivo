import { TestBed } from '@angular/core/testing';

import { AtualizarPerfilService } from './atualizar-perfil.service';

describe('AtualizarPerfilService', () => {
  let service: AtualizarPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
