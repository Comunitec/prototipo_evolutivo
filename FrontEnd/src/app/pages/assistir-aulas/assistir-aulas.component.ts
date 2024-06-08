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
  SafeLinkIncorporacao?: SafeResourceUrl | null; // Adicionamos um campo opcional para a URL segura
}

interface Curso {
  idCurso: number;
  Nome: string;
  Imagem?: string; // Adicionamos um campo opcional para a URL da imagem
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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID do curso:', this.idCurso);
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
          SafeLinkIncorporacao: aula.LinkIncorporacao ? this.sanitizer.bypassSecurityTrustResourceUrl(aula.LinkIncorporacao) : null
        }));
        console.log('Aulas:', this.aulas);
      },
      (error) => {
        console.error(`Erro ao obter aulas para o curso ${idCurso}:`, error);
      }
    );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalWQuestoesComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
