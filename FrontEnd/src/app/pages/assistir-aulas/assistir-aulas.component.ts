import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalWQuestoesComponent } from 'src/app/components/modal-wquestoes/modal-wquestoes.component';
import { ModalCursoFinalizadoComponent } from 'src/app/components/modal-curso-finalizado/modal-curso-finalizado.component';
import { ModalAulaJaEstaFinalizadaComponent } from 'src/app/components/modal-aula-ja-esta-finalizada/modal-aula-ja-esta-finalizada.component';

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
  statusAlunoCurso: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.idCurso) {
      this.getCurso(this.idCurso);
      this.getAulas(this.idCurso);
    }
    this.getStatusAlunoCurso();
    
  }

  getStatusAlunoCurso(){
    const idCurso = this.route.snapshot.params['id'];
    const idAluno = sessionStorage.getItem('idAluno'); 

    this.http.get<{ status: string }>(`http://localhost:8800/getStatusAlunoCurso/${idCurso}/${idAluno}`).subscribe(
      response => {
        this.statusAlunoCurso = response.status == 'concluido';
      },
      error => {
        console.error('Erro ao verificar o status do curso:', error);
      }
    );
  }

  getCurso(idCurso: number): void {
    this.http.get<Curso>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
      (curso) => {
        this.nomeCurso = curso.Nome;
        this.idAlunoCriador = curso.idAlunoCriador;
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
          questionarioFinalizado: false
        }));
        this.checkFinalizados(); // Verifica se os questionários foram finalizados
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
        if (result === 'concluido') {
          this.marcarQuestionarioComoFinalizado(idAula);
        }
      });
    } catch (error) {
      console.error('Erro ao abrir modal:', error);
    }
  }

  checkFinalizados(): void {
    this.aulas.forEach(aula => {
      const alunocursoaulaData = {
        idAlunocurso: Number(this.idAlunoLogado),
        idAula: aula.idAula,
      };
      this.http.post<{ finalizado: boolean }>(`http://localhost:8800/checkFinalizado`, alunocursoaulaData).subscribe(
        (response) => {
          aula.questionarioFinalizado = response.finalizado;
          this.verificarSeTodosQuestionariosFinalizados();
        },
        (error) => {
          console.error('Erro ao verificar questionário finalizado:', error);
        }
      );
    });
  }

  marcarQuestionarioComoFinalizado(idAula: number): void {
    const aula = this.aulas.find(a => a.idAula === idAula);
    if (aula) {
      aula.questionarioFinalizado = true;
      this.verificarSeTodosQuestionariosFinalizados();
    }
  }

  verificarSeTodosQuestionariosFinalizados(): void {
    const idCurso = this.route.snapshot.params['id'];
    const idAluno = this.idAlunoLogado;
    this.http.get<{ totalAulasConcluidas: number }>(`http://localhost:8800/countAulasConcluidas/${idAluno}/${idCurso}`).subscribe(
      (response) => {
        // Se o total de aulas concluídas for 4, define finalizarCursoVisivel como true
        this.finalizarCursoVisivel = response.totalAulasConcluidas === 4;

        console.log('ESTOU APARECENDO POR ISSO')
      },
      (error) => {
        console.error('Erro ao verificar o número de aulas concluídas:', error);
      }
    );
  }


  finalizarCurso(): void {
    const idAluno = Number(this.idAlunoLogado);
    const idCurso = this.idCurso;
    const status = 'concluido';

    const alunocursoData = {
      idAluno,
      idCurso,
      status
    };

    this.http.post(`http://localhost:8800/finalizarCurso`, alunocursoData).subscribe(
      (response) => {
        console.log('Curso finalizado com sucesso:', response);
          // Open the modal here
          this.dialog.open(ModalCursoFinalizadoComponent, {
            width: '400px',
            data: { message: 'Curso finalizado com sucesso!' }
          });
          this.getStatusAlunoCurso();
      },
      (error) => {
        console.error('Erro ao finalizar o curso:', error);
      }
    );
  }
}
