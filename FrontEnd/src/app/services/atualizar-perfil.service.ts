import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarPerfilService {
  private alunoSource = new BehaviorSubject<any>({
    Nome: sessionStorage.getItem('Nome'),
    Email: sessionStorage.getItem('Email'),
    Pontuacao: sessionStorage.getItem('Pontuacao'),
    idAluno: sessionStorage.getItem('idAluno'),
    DataNasc: sessionStorage.getItem('DataNasc')
  });

  currentAluno = this.alunoSource.asObservable();

  constructor() {}

  changeAluno(aluno: any) {
    sessionStorage.setItem('Nome', aluno.Nome);
    sessionStorage.setItem('Email', aluno.Email);
    sessionStorage.setItem('Pontuacao', aluno.Pontuacao);
    sessionStorage.setItem('idAluno', aluno.idAluno);
    sessionStorage.setItem('DataNasc', aluno.DataNasc);
    this.alunoSource.next(aluno);
  }
}
