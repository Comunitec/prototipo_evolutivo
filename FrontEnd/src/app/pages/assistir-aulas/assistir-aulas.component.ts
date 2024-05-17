import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalWQuestoesComponent } from 'src/app/components/modal-wquestoes/modal-wquestoes.component';

@Component({
  selector: 'app-assistir-aulas',
  templateUrl: './assistir-aulas.component.html',
  styleUrls: ['./assistir-aulas.component.css'],
})
export class AssistirAulasComponent {
  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog
  ){}


  tituloAula1 = "Introdução ao Typescript";
  tituloAula2 = "Funções do Typescript ";
  tituloAula3 = "Typescript na prática";
  tituloAula4 = "Typescript no mercado de trabalho";

  descricao1 = "Nessa aula você verá os pré requisitos para utilizar o Angular";
  descricao2 = "Nessa aula você verá as principais funções do Angular que serão utilizadas no decorrer do curso";
  descricao3 = "Nessa aula você verá Typescript na prática";
  descricao4 = "Nessa aula você verá Typescript no mercado de trabalho";

  Aula1Url = "https://www.youtube.com/embed/EF7KmZ1VNPM?si=0pc3HOjf3P6oRpbp"
  Aula1Web = this.sanitizer.bypassSecurityTrustResourceUrl(this.Aula1Url)


  openModal(): void {
    const dialogRef = this.dialog.open(ModalWQuestoesComponent, {
      width: '350px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
