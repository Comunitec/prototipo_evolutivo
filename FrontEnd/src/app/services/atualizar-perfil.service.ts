import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarPerfilService {
  private alunoSource = new BehaviorSubject<any>(this.getInitialAluno());

  currentAluno = this.alunoSource.asObservable();

  constructor() {}

  changeAluno(aluno: any) {
    // Atualiza apenas as propriedades necessárias na sessionStorage
    if (aluno.Nome) sessionStorage.setItem('Nome', aluno.Nome);
    if (aluno.Email) sessionStorage.setItem('Email', aluno.Email);

    if (aluno.idAluno) sessionStorage.setItem('idAluno', aluno.idAluno);
    if (aluno.DataNasc) sessionStorage.setItem('DataNasc', aluno.DataNasc);

    // Atualiza a URL da imagem do perfil com o novo idAluno
    const updatedAluno = {
      ...aluno,
      ImagemPerfil: aluno.idAluno ? `http://localhost:8800/imagem/${aluno.idAluno}` : ''
    };

    this.alunoSource.next(updatedAluno);
  }

  private getInitialAluno() {
    return {
      Nome: sessionStorage.getItem('Nome'),
      Email: sessionStorage.getItem('Email'),
      idAluno: sessionStorage.getItem('idAluno'),
      DataNasc: sessionStorage.getItem('DataNasc'),
      ImagemPerfil: sessionStorage.getItem('idAluno') ? `http://localhost:8800/imagem/${sessionStorage.getItem('idAluno')}` : ''
    };
  }
}
