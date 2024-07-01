import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalMatRealizadaComponent } from 'src/app/components/modal-mat-realizada/modal-mat-realizada.component';

interface Curso {
  idCurso: number;
  Nome: string;
  Imagem: string;
  Certificado: string;
  Emblema: string;
  tags: string[];
  Descricao: string;
  DataCriacao: string;
  idAlunoCriador: number;
  nomeCriador: string;
  matricula: boolean;
  Status: string;
}

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {
  curso: Curso | null = null;
  verAulas = false;
  idAlunoLogado = sessionStorage.getItem('idAluno');
  isAlunoCriador: boolean = false;
  idAlunoCurso: number | null = null;
  notaMedia: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const idCurso = this.route.snapshot.paramMap.get('id');
    if (idCurso) {
      this.getCursoDetalhes(Number(idCurso));
    }
  }

  getImagemCurso(idCurso: number, curso: Curso): void {
    if (idCurso) {
      curso.Imagem = `http://localhost:8800/getImagemCurso/${idCurso}`;
    } else {
      console.error('ID do curso é undefined para curso:', curso);
    }
  }

  getEmblemaCurso(idCurso: number, curso: Curso): void {
    if (idCurso) {
      curso.Emblema = `http://localhost:8800/getEmblemaCurso/${idCurso}`;
    } else {
      console.error('ID do curso é undefined para curso:', curso);
    }
  }

  getCursoDetalhes(idCurso: number): void {
    this.http.get<Curso>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
      (curso) => {
        this.getImagemCurso(idCurso, curso);
        this.getNotaMediaCurso(idCurso);
        this.getEmblemaCurso(idCurso, curso);
        this.getTagsCurso(idCurso, curso); // Adicionado para garantir o carregamento das tags
        this.getNomeCriador(curso.idAlunoCriador).subscribe(
          (data) => {
            curso.nomeCriador = data.Nome;
            this.curso = curso;
            this.verAulas = !this.curso.matricula;
            this.isAlunoCriador = Number(this.idAlunoLogado) === curso.idAlunoCriador;
            this.verificarMatricula(Number(this.idAlunoLogado), curso.idCurso);
          },
          (error) => {
            console.error(`Erro ao obter nome do criador para o curso ${idCurso}:`, error);
            this.curso = curso;
            this.verAulas = !this.curso.matricula;
          }
        );
      },
      (error) => {
        console.error(`Erro ao obter detalhes do curso ${idCurso}:`, error);
      }
    );
  }

  getNomeCriador(idAluno: number) {
    return this.http.get<{ Nome: string }>(`http://localhost:8800/getAlunoPorId/${idAluno}`);
  }

  verificarMatricula(idAluno: number, idCurso: number): void {
    this.http.get<{ matriculado: boolean }>(`http://localhost:8800/verificarMatricula/${idAluno}/${idCurso}`).subscribe(
      (response) => {
        if (this.curso) {
          this.curso.matricula = response.matriculado;
        }
      },
      (error) => {
        console.error('Erro ao verificar matrícula:', error);
      }
    );
  }

  matricularAluno(): void {
    if (!this.curso || !this.idAlunoLogado) return;

    const matriculaData = { idAluno: Number(this.idAlunoLogado), idCurso: this.curso.idCurso };

    this.http.post<{ idAlunoCurso: number }>('http://localhost:8800/matricularAluno', matriculaData).subscribe(
      (response) => {
        this.curso!.matricula = true;
        this.idAlunoCurso = response.idAlunoCurso;
      },
      (error) => {
        console.error('Erro ao matricular aluno:', error);
      }
    );
  }

  desmatricularAluno(): void {
    if (!this.curso || !this.idAlunoLogado) return;

    const matriculaData = { idAluno: Number(this.idAlunoLogado), idCurso: this.curso.idCurso };

    this.http.delete('http://localhost:8800/desmatricularAluno', { body: matriculaData }).subscribe(
      (response) => {
        this.curso!.matricula = false;
      },
      (error) => {
        console.error('Erro ao desmatricular aluno:', error);
      }
    );
  }

  openModal(): void {
    this.matricularAluno();
    if (this.curso) {
      const dialogRef = this.dialog.open(ModalMatRealizadaComponent, {
        width: '350px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.matricularAluno();
        }
      });
    }
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

  getNotaMediaCurso(idCurso: number):void {
    this.http.get<{ notaMedia: number }>(`http://localhost:8800/getAvaliacaoMediaCurso/${idCurso}`)
      .subscribe(response => {
          console.log(response);
          this.notaMedia = response.notaMedia;
      }, error => {
          console.error('Erro ao obter a nota média:', error);
      });
  }
}
