import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Curso {
  idCurso: number;
  Nome: string;
  Imagem: string;
  Certificado: string;
}

@Component({
  selector: 'app-finalizar-curso',
  templateUrl: './finalizar-curso.component.html',
  styleUrls: ['./finalizar-curso.component.css']
})
export class FinalizarCursoComponent implements OnInit{
  
curso: Curso | null = null;
pontos = "100";
idAlunoLogado = sessionStorage.getItem('idAluno');
idAlunoCurso: number | null = null;
imagem = ""
certificado = ""
url = "";
avaliarCursoNota: boolean = true;
obgAvaliar: boolean = false;

constructor(
  private route: ActivatedRoute,
  private http: HttpClient
) {}

ngOnInit(): void {
  const idCurso = this.route.snapshot.paramMap.get('id');
  if (idCurso) {
    this.getCursoDetalhes(Number(idCurso));
  }
}


getImagemCurso(idCurso: number): void {
  if (idCurso) {
    console.log(`Setting image URL for course  with ID ${idCurso}`);
    this.imagem = `http://localhost:8800/getImagemCurso/${idCurso}`;
    console.log("teste", this.imagem);
  } else {
    console.error('ID do curso é undefined para curso:');
  }
}

getCertificadoCurso2(idCurso: number): Observable<Blob> {
  return this.http.get(`http://localhost:8800/getCertificadoCurso/${idCurso}`, { responseType: 'blob' });
}


getCertificadoCurso(idCurso: number): void {
  if (idCurso) {

    this.getCertificadoCurso2(idCurso).subscribe(
      (response) => {
        const url = window.URL.createObjectURL(response);
        this.certificado = url;
      },
    )
  } else {
    console.error('ID do curso é undefined para curso:');
  }
}

getCursoDetalhes(idCurso: number): void {
  this.http.get<Curso>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
    (curso) => {
      console.log("primeiro" ,idCurso);
      this.getImagemCurso(idCurso);
      this.getCertificadoCurso(idCurso);
    },
    (error) => {
      console.error(`Erro ao obter detalhes do curso ${idCurso}:`, error);
    }
  );
}

avaliarCurso(nota: number): void {
  const idCurso = this.route.snapshot.paramMap.get('id');
  this.http.put<any>(`http://localhost:8800/avaliarCurso/${idCurso}/${this.idAlunoLogado}/${nota}`, "").subscribe(
    (response) => {
      console.log("Curso avaliado com sucesso!");
      this.avaliarCursoNota = false;
      this.obgAvaliar = true;
    },
    (error) => {
      console.error('Erro ao atualizar a senha:', error);
    }
  );

  
}

}

