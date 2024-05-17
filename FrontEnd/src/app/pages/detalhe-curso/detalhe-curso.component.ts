import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalMatRealizadaComponent } from 'src/app/components/modal-mat-realizada/modal-mat-realizada.component';

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent {
  nomeCurso = "Typescript";
  finishTotal = "35";
  nomeCriador = "Eduardo Abreu";
  descricao = "O curso de TypeScript oferece uma  \nintrodução abrangente a essa linguagem de programação superset do JavaScript, \nabordando desde conceitos básicos até tópicos avançados. Os alunos aprenderão a criar aplicativos robustos e escaláveis, aproveitando os recursos de tipagem estática, interfaces e classes. Com ênfase na segurança e manutenibilidade do código, o curso explora como TypeScript facilita o desenvolvimento de projetos complexos, tornando-os mais legíveis e menos propensos a erros. Ao final, os participantes estarão aptos a utilizar TypeScript eficientemente em diversas aplicações, aumentando sua produtividade como desenvolvedores.";
  imagem = "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*moJeTvW97yShLB7URRj5Kg.png";
  tags: string[] = ["HTML", "CSS", "JS", "TS"];
  matricula = true;
  verAulas = false;


  constructor(
    public dialog: MatDialog
  ){ }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalMatRealizadaComponent, {
      width: '350px'
      
    });
    this.matricula = false;
    this.verAulas = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}