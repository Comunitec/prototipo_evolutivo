import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalSaibaMaisFormularioComponent } from '../modal-saiba-mais-formulario/modal-saiba-mais-formulario.component';
import { ModalAulaSalvaComponent } from '../modal-aula-salva/modal-aula-salva.component';
import { ModalErroAoSalvarAulaComponent } from '../modal-erro-ao-salvar-aula/modal-erro-ao-salvar-aula.component';
import { ModalCursoenviadoParaAprovacaoComponent } from '../modal-cursoenviado-para-aprovacao/modal-cursoenviado-para-aprovacao.component';
import { ModalSaibaMaisVideoComponent } from '../modal-saiba-mais-video/modal-saiba-mais-video.component';

interface Aula {
  Titulo: string;
  Descricao: string;
  LinkIncorporacao: string;
  LinkFormulario: string;
  idCurso: string;
  NumeroAula: number;
}

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
})
export class ClassFormComponent implements OnInit {
  aulas: Aula[] = [];
  podeEnviarParaAprovacao = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregarAulas();
  }

  podeEnviarParaStaff(){
    this.podeEnviarParaAprovacao = this.aulas.length > 3;
  }

  carregarAulas() {
    const idCurso = this.route.snapshot.params['id'];
    this.http
      .get<Aula[]>(`http://localhost:8800/getAulas/${idCurso}`)
      .subscribe(
        (response) => {
          console.log('Aulas do curso:', response);
          this.aulas = response;
          this.podeEnviarParaStaff(); // Atualiza a possibilidade de enviar para aprovação
        },
        (error) => {
          console.error('Erro ao obter aulas do curso:', error);
        }
      );
  }

  saveClass(numeroAula: number) {
    console.log('Salvar aula com NumeroAula:', numeroAula);
    const aulaToSave = this.aulas.find(
      (aula) => aula.NumeroAula === numeroAula
    );
    if (aulaToSave) {
      const idCurso = this.route.snapshot.params['id'];
      this.http
        .put<any>(
          `http://localhost:8800/updateAula/${idCurso}/${numeroAula}`,
          aulaToSave
        )
        .subscribe(
          (response) => {
            console.log('Aula atualizada com sucesso:', response);
            this.openModalAulaSalva();
            this.podeEnviarParaStaff(); // Atualiza a possibilidade de enviar para aprovação
          },
          (error) => {
            console.error('Erro ao atualizar aula:', error);
            this.openModalErroSalvarAula();
          }
        );
    }
  }

  adicionarAula() {
    const idCurso = this.route.snapshot.params['id'];
    this.http
      .post<any>(`http://localhost:8800/addAula/${idCurso}`, '')
      .subscribe(
        (response) => {
          console.log('Aula inserida com sucesso:', response);
          this.carregarAulas(); // Recarrega as aulas e atualiza a possibilidade de enviar para aprovação
        },
        (error) => {
          console.error('Erro ao inserir aula:', error);
        }
      );
  }

  deletarAulas() {
    const idCurso = this.route.snapshot.params['id'];
    this.http
      .delete<any>(`http://localhost:8800/deleteTodasAulas/${idCurso}`)
      .subscribe(
        (response) => {
          console.log('Todas as aulas foram deletadas com sucesso:', response);
          this.carregarAulas(); // Recarrega as aulas e atualiza a possibilidade de enviar para aprovação
        },
        (error) => {
          console.error('Erro ao deletar aulas:', error);
        }
      );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalSaibaMaisFormularioComponent, {
      width: '350px',
    });
  }

  openModalSaibaMaisVideo(){
    const dialogRef = this.dialog.open(ModalSaibaMaisVideoComponent, {
      width: '350px',
    });
  }

  openModalAulaSalva(): void {
    const dialogRef = this.dialog.open(ModalAulaSalvaComponent, {
      width: '350px',
    });
  }

  openModalErroSalvarAula(): void {
    const dialogRef = this.dialog.open(ModalErroAoSalvarAulaComponent, {
      width: '350px',
    });
  }

  openModalCursoEnviadoParaAprovacao(): void {
    const dialogRef = this.dialog.open(ModalCursoenviadoParaAprovacaoComponent, {
      width: '350px',
    });
  }

  enviarParaStaff(){
    const idCurso = this.route.snapshot.params['id'];
      this.http.put<string[]>(`http://localhost:8800/enviarParaAprovacao/${idCurso}`, {})
        .subscribe(
          (response) => {
            console.log("Curso enviado para aprovação");
            this.openModalCursoEnviadoParaAprovacao();
            this.router.navigate(['/meusCursosProfessor']);
          },
          (error) => {
            console.error(`Erro ao enviar curso para aprovação`, error);
          }
        );
  }
}

