import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PesquisaService } from '../../pesquisa.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoParaInativarComponent } from '../modal-confirmacao-para-inativar/modal-confirmacao-para-inativar.component';
import { ModalDeletarCursoComponent } from '../modal-deletar-curso/modal-deletar-curso.component';

// Definição da interface Curso
export interface Curso {
  idCurso: number;
  Nome: string;
  Imagem: string;
  tags: string[];
  Descricao: string;
  tempId?: number;
  Status: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  podeEditar: boolean = false;
  podeExcluir: boolean = false;
  podeAprovar: boolean = false;
  podeReprovar: boolean = false;
  podeInativar: boolean = false;
  podeVisualizar: boolean = true;
  PerfilDeAcesso = sessionStorage.getItem('PerfilDeAcesso');
  termoPesquisa: string = '';
  exibirBotaoAdicionar: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog, private pesquisaService: PesquisaService) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('/meusCursosAluno')) {
        this.listarCursosMatriculados();
      } else if (currentRoute.includes('/meusCursosProfessor')) {
        this.podeEditar = true;
        this.podeExcluir = true;
        this.listarCursosEmCriacao();
        this.exibirBotaoAdicionar = true;
      } else if (currentRoute.includes('/staff')) {
        this.podeAprovar = true;
        this.podeReprovar = true;
        this.listarCursosAguardandoAprovacao();
      } else if (currentRoute.includes('/home-logado')) {
        this.listarCursosAprovados();
        this.liberaInativar();
      } else if(currentRoute.includes('/')){
        this.listarCursosAprovados();
        this.podeVisualizar = false;
      }
    });
  }

  liberaInativar(){
    if(this.PerfilDeAcesso == "Administrador"){
      this.podeInativar = true;
    }
  }

  listarCursosEmCriacao(): void {
    const idUsuario = sessionStorage.getItem('idAluno');
    if (idUsuario) {
      this.http.get<Curso[]>(`http://localhost:8800/getCursosEmCriacao/${idUsuario}`)
        .subscribe(
          (data) => {
            console.log('Cursos em criação:', data);
            this.cursos = data;
            this.cursosFiltrados = data;
            this.carregarDadosExtras();
          },
          (error) => {
            console.error('Erro ao obter cursos em criação:', error);
          }
        );
    }
  }

  listarCursosAguardandoAprovacao(): void {
    this.http.get<Curso[]>('http://localhost:8800/getCursosAguardandoAprovacao')
      .subscribe(
        (data) => {
          console.log('Cursos aguardando aprovação:', data);
          this.cursos = data;
          this.cursosFiltrados = data;
          this.carregarDadosExtras();
        },
        (error) => {
          console.error('Erro ao obter cursos aguardando aprovação:', error);
        }
      );
  }

  listarCursosAprovados(): void {
    this.http.get<Curso[]>('http://localhost:8800/getCursosAprovados')
      .subscribe(
        (data) => {
          console.log('Cursos aprovados:', data);
          this.cursos = data;
          this.cursosFiltrados = data;
          this.carregarDadosExtras();
        },
        (error) => {
          console.error('Erro ao obter cursos aprovados:', error);
        }
      );
  }

  listarCursosMatriculados(): void {
    const idUsuario = sessionStorage.getItem('idAluno');
    if (idUsuario) {
      this.http.get<Curso[]>(`http://localhost:8800/getCursosMatriculados/${idUsuario}`)
        .subscribe(
          (data) => {
            console.log('Cursos matriculados:', data);
            this.cursos = data;
            this.cursosFiltrados = data;
            this.carregarDadosExtras();
          },
          (error) => {
            console.error('Erro ao obter cursos matriculados:', error);
          }
        );
    }
  }

  carregarDadosExtras(): void {
    this.cursos.forEach(curso => {
      console.log('Processando curso:', curso);
      if (curso.idCurso) {
        this.getImagemCurso(curso.idCurso, curso);
        this.getTagsCurso(curso.idCurso, curso);
      } else {
        console.error('ID do curso é undefined para curso:', curso);
      }
    });
  }

  getTagsCurso(idCurso: number, curso: Curso): void {
    this.http.get<string[]>(`http://localhost:8800/${idCurso}/tags`)
      .subscribe(
        (tags) => {
          curso.tags = tags;
          console.log('Tags do curso', curso.Nome, ':', tags);
        },
        (error) => {
          console.error(`Erro ao obter tags do curso ${idCurso}:`, error);
        }
      );
  }

  getImagemCurso(idCurso: number, curso: Curso): void {
    if (idCurso) {
      console.log(`Setting image URL for course ${curso.Nome} with ID ${idCurso}`);
      curso.Imagem = `http://localhost:8800/getImagemCurso/${idCurso}`;
    } else {
      console.error('ID do curso é undefined para curso:', curso);
    }
  }

  redirecionarParaRota(idCurso: number) {
    this.router.navigate(['/EditCourseFormComponent', idCurso]);
  }

  redirecionarParaRotaDetalhe(idCurso: number) {
    this.router.navigate(['/detalheCurso', idCurso]);
  }

  getTruncatedText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }

  aprovarCurso(idCurso: number) {
    this.http.put<string[]>(`http://localhost:8800/aprovarCurso/${idCurso}`, {})
      .subscribe(
        (response) => {
          console.log("Curso aprovado");
          this.listarCursosAguardandoAprovacao();
        },
        (error) => {
          console.error(`Erro ao salvar o curso`, error);
        }
      );
  }

  reprovarCurso(idCurso: number) {
    this.http.put<string[]>(`http://localhost:8800/reprovarCurso/${idCurso}`, {})
      .subscribe(
        (response) => {
          console.log("Curso reprovado");
          this.listarCursosAguardandoAprovacao();
        },
        (error) => {
          console.error(`Erro ao reprovar curso`, error);
        }
      );
  }

  InativarCurso(idCurso: number) {
    this.http.put<string[]>(`http://localhost:8800/inativarCurso/${idCurso}`, {})
      .subscribe(
        (response) => {
          console.log("Curso inativado");
          this.listarCursosAprovados();
        },
        (error) => {
          console.error(`Erro ao inativar curso`, error);
        }
      );
  }

  openModalInativar(idCurso: number) {
    const dialogRef = this.dialog.open(ModalConfirmacaoParaInativarComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.InativarCurso(idCurso);
      } else {
        console.log('Ação cancelada pelo usuário');
      }
    });
  }

  openModalDeletar(idCurso: number) {
    const dialogRef = this.dialog.open(ModalDeletarCursoComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletarCurso(idCurso);
      } else {
        console.log('Ação cancelada pelo usuário');
      }
    });
  }

  deletarCurso(idCurso: number) {
    this.deletarVinculosDeTags(idCurso);
    this.deletarAulas(idCurso);

    this.http.delete<any[]>(`http://localhost:8800/deleteCurso/${idCurso}`)
      .subscribe(
        (response) => {
          console.log("Curso deletado");
          this.listarCursosEmCriacao();
        },
        (error) => {
          console.error(`Erro ao reprovar curso`, error);
        }
      );
  }

  deletarAulas(idCurso: number) {
    this.http.delete<any>(`http://localhost:8800/deleteTodasAulas/${idCurso}`)
      .subscribe(
        (response) => {
          console.log('Todas as aulas foram deletadas');
        },
        (error) => {
          console.error('Erro ao deletar as aulas:', error);
        }
      );
  }

  deletarVinculosDeTags(idCurso: number) {
    this.http.delete<any>(`http://localhost:8800/deleteVinculoTagCurso/${idCurso}`)
      .subscribe(
        (response) => {
          console.log('Todos os vínculos de tags foram deletados');
        },
        (error) => {
          console.error('Erro ao deletar os vínculos de tags:', error);
        }
      );
  }

  pesquisar() {
    const termo = this.termoPesquisa.trim().toLowerCase();
    if (termo) {
      this.cursosFiltrados = this.cursos.filter(curso =>
        curso.Nome.toLowerCase().includes(termo) ||
        curso.tags.some(tag => tag.toLowerCase().includes(termo))
      );
    } else {
      this.cursosFiltrados = [...this.cursos];
    }
  }
}
