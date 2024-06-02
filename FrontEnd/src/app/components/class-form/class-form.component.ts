import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Aula {
  Titulo: string;
  Descricao: string;
  LinkIncorporacao: string;
  idCurso: string;
  NumeroAula: number;
}

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  aulas: Aula[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.carregarAulas();
  }

  carregarAulas(){
    const idCurso = this.route.snapshot.params['id'];
    this.http.get<Aula[]>(`http://localhost:8800/getAulas/${idCurso}`).subscribe(
      (response) => {
        console.log('Aulas do curso:', response);
        this.aulas = response;
      },
      (error) => {
        console.error('Erro ao obter aulas do curso:', error);
      }
    );
  }

  saveClass(numeroAula: number) {
    console.log('Salvar aula com NumeroAula:', numeroAula);
    const aulaToSave = this.aulas.find(aula => aula.NumeroAula === numeroAula);
    if (aulaToSave) {
      const idCurso = this.route.snapshot.params['id'];
      this.http.put<any>(`http://localhost:8800/updateAula/${idCurso}/${numeroAula}`, aulaToSave).subscribe(
        (response) => {
          console.log('Aula atualizada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao atualizar aula:', error);
        }
      );
    }
  }

  adicionarAula(){
    const idCurso = this.route.snapshot.params['id'];
    this.http.post<any>(`http://localhost:8800/addAula/${idCurso}`, '').subscribe(
      (response) => {
        console.log('Aula inserida com sucesso:', response);
        this.carregarAulas();
      },
      (error) => {
        console.error('Erro ao inserir aula:', error);
      }
    );
  }

  deletarAulas(){
    const idCurso = this.route.snapshot.params['id'];
    this.http.delete<any>(`http://localhost:8800/deleteTodasAulas/${idCurso}`).subscribe(
      (response) => {
        console.log('Todas as aulas foram deletadas com sucesso:', response);
        this.carregarAulas();
      },
      (error) => {
        console.error('Erro ao deletar aulas:', error);
      }
    );

  }


}
