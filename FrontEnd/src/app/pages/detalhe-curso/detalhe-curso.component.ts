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
}

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {
  curso: Curso | null = null;
  verAulas = false;

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
      console.log(`Setting image URL for course ${curso.Nome} with ID ${idCurso}`);
      curso.Imagem = `http://localhost:8800/getImagemCurso/${idCurso}`;
    } else {
      console.error('ID do curso é undefined para curso:', curso);
    }
  }

  getCursoDetalhes(idCurso: number): void {
    this.http.get<Curso>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
      (curso) => {
        this.getImagemCurso(idCurso, curso);
        this.getNomeCriador(curso.idAlunoCriador).subscribe(
          (data) => {
            console.log(`Resposta da API para o aluno criador com ID ${curso.idAlunoCriador}:`, data);

            curso.nomeCriador = data.Nome; // Atribuir o nome do criador ao curso
            this.curso = curso;
            this.verAulas = !this.curso.matricula;
            console.log('Curso:', this.curso);
          },
          (error) => {
            console.error(`Erro ao obter nome do criador para o curso ${idCurso}:`, error);
            this.curso = curso; // Atribuir o curso mesmo se houver erro ao obter o nome do criador
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
    console.log(`Requisição para obter nome do criador com ID ${idAluno}`);
    return this.http.get<{ Nome: string }>(`http://localhost:8800/getAlunoPorId/${idAluno}`);
   }

  openModal(): void {
    if (this.curso) {
      const dialogRef = this.dialog.open(ModalMatRealizadaComponent, {
        width: '350px'
      });

      this.curso.matricula = false;
      this.verAulas = true;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
