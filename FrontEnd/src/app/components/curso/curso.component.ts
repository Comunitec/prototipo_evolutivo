import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Definição da interface Curso
interface Curso {
  idCurso: number;
  Nome: string;
  Imagem: string; // Adicionamos o campo para a URL da imagem do curso
  tags: string[];
  Descricao: string;
  tempId?: number; // Propriedade temporária para armazenar o ID temporário
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  podeEditar: boolean = false;
  podeExcluir: boolean = false;
  podeAprovar: boolean = false;
  podeReprovar: boolean = false;
  podeInativar: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('/meusCursosAluno')) {
        this.listarCursosMatriculados();
        // Defina as permissões para alunos
      } else if (currentRoute.includes('/meusCursosProfessor')) {
        // Defina as permissões para professores
        this.podeEditar = true;
        this.podeExcluir = true;
        this.listarCursosEmCriacao();
      } else if (currentRoute.includes('/staff')) {
        // Defina as permissões para o staff
        this.podeAprovar = true;
        this.podeReprovar = true;
        this.listarCursosAguardandoAprovacao();
      } else if (currentRoute.includes('/home-logado') || currentRoute.includes('/o')) {
        this.listarCursosAprovados();
      }
    });
  }

  listarCursosEmCriacao(): void {
    const idUsuario = sessionStorage.getItem('idAluno');
    if (idUsuario) {
      this.http.get<Curso[]>(`http://localhost:8800/getCursosEmCriacao/${idUsuario}`)
        .subscribe(
          (data) => {
            console.log('Cursos em criação:', data);
            this.cursos = data;
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
            console.log('Cursos em criação:', data);
            this.cursos = data;
            this.carregarDadosExtras();
          },
          (error) => {
            console.error('Erro ao obter cursos em criação:', error);
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

  getTruncatedText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }
}
