import { Injectable } from '@angular/core';
import { Curso } from '..//app/components/curso/curso.component'; // Corrija o caminho de importação aqui

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  constructor() { }

  pesquisarCursos(cursos: Curso[], termoPesquisa: string): Curso[] {
    if (!termoPesquisa || termoPesquisa === '') {
      return cursos;
    }
    return cursos.filter(curso =>
      curso.Nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      curso.Descricao.toLowerCase().includes(termoPesquisa.toLowerCase())
      // Adicione mais condições de filtro conforme necessário
    );
  }
}