import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalWQuestoesComponent } from 'src/app/components/modal-wquestoes/modal-wquestoes.component';

interface Aula {
  idAula: number;
  Titulo: string | null;
  Descricao: string | null;
  LinkIncorporacao: string | null;
  idCurso: number;
  NumeroAula: number;
  LinkFormulario: string | null;
  SafeLinkIncorporacao?: SafeResourceUrl | null;
  questionarioFinalizado: boolean;
}

interface Curso {
  idCurso: number;
  Nome: string;
  idAlunoCriador: number;
}

@Component({
  selector: 'app-assistir-aulas',
  templateUrl: './assistir-aulas.component.html',
  styleUrls: ['./assistir-aulas.component.css']
})
export class AssistirAulasComponent implements OnInit {
  aulas: Aula[] = [];
  nomeCurso: string = '';
  idCurso: number;
  idAlunoCriador: number = 0;
  idAlunoLogado = sessionStorage.getItem('idAluno');
  isAlunoCriador: boolean = false;
  finalizarCursoVisivel: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('ID do curso:', this.idCurso);
  }

  ngOnInit(): void {
    if (this.idCurso) {
      this.getCurso(this.idCurso);
      this.getAulas(this.idCurso);
    }
  }

  getCurso(idCurso: number): void {
    this.http.get<Curso>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
      (curso) => {
        this.nomeCurso = curso.Nome;
        this.idAlunoCriador = curso.idAlunoCriador;
        // console.log('Curso:', curso);

        // Verifica se o aluno logado é o criador do curso
        this.isAlunoCriador = Number(this.idAlunoLogado) === this.idAlunoCriador;
      },
      (error) => {
        console.error(`Erro ao obter detalhes do curso ${idCurso}:`, error);
      }
    );
  }

  getAulas(idCurso: number): void {
    this.http.get<Aula[]>(`http://localhost:8800/getAulas/${idCurso}`).subscribe(
      (data: Aula[]) => {
        this.aulas = data.map(aula => ({
          ...aula,
          SafeLinkIncorporacao: aula.LinkIncorporacao ? this.sanitizer.bypassSecurityTrustResourceUrl(this.formatYouTubeUrl(aula.LinkIncorporacao)) : null,
          questionarioFinalizado: false // Inicializa como não finalizado
        }));
        console.log('Aulas:', this.aulas);
      },
      (error) => {
        console.error(`Erro ao obter aulas para o curso ${idCurso}:`, error);
      }
    );
  }

  formatYouTubeUrl(url: string): string {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    return `https://www.youtube.com/embed/${ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId}`;
  }

  getIdAlunoCurso(idAluno: number, idCurso: number): Promise<number | null> {
    return this.http.get<{ idAlunoCurso: number }>(`http://localhost:8800/getIdAlunoCurso/${idAluno}/${idCurso}`).toPromise()
      .then(response => response ? response.idAlunoCurso : null)
      .catch(error => {
        console.error('Erro ao obter idAlunoCurso:', error);
        throw error;
      });
  }

  async openModal(LinkFormulario: string, idAula: number, idCurso: number): Promise<void> {
    try {
      const idAlunoCurso = await this.getIdAlunoCurso(Number(this.idAlunoLogado), idCurso);
      const dialogRef = this.dialog.open(ModalWQuestoesComponent, {
        width: '500px',
        data: { LinkFormulario, idAula, idCurso, idAlunoCurso }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        if (result === 'concluido') {
          this.marcarQuestionarioComoFinalizado(idAula);
        }
      });
    } catch (error) {
      console.error('Erro ao abrir modal:', error);
    }
  }

  marcarQuestionarioComoFinalizado(idAula: number): void {
    const aula = this.aulas.find(a => a.idAula === idAula);
    console.log('Aula:', aula);
    if (aula) {
      aula.questionarioFinalizado = true;
      this.verificarSeTodosQuestionariosFinalizados();
    }
  }

  verificarSeTodosQuestionariosFinalizados(): void {
    this.finalizarCursoVisivel = this.aulas.every(aula => aula.questionarioFinalizado);
  }
}
