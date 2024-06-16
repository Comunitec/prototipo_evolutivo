import { Component } from '@angular/core';
import { PesquisaService } from '../../pesquisa.service'; // Verifique o caminho de importação aqui
import { Curso } from '../../components/curso/curso.component'; // Verifique o caminho de importação aqui
import { faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-logado',
  templateUrl: './home-logado.component.html',
  styleUrls: ['./home-logado.component.css']
})
export class HomeLogadoComponent {
  faSearch = faSearch;

  termoPesquisa: string = ''; // Termo de pesquisa
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];

  constructor(private pesquisaService: PesquisaService) {}

  pesquisarCursos() {
    console.log('Termo de pesquisa:', this.termoPesquisa);
    console.log('Cursos antes da pesquisa:', this.cursos);
    this.cursosFiltrados = this.pesquisaService.pesquisarCursos(this.cursos, this.termoPesquisa);
    console.log('Cursos após a pesquisa:', this.cursosFiltrados);
  }
}
