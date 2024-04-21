import { Component } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent {  
  nomeCurso = "Typescript";
  descricao = "O curso de TypeScript oferece uma introdução abrangente a essa linguagem de programação superset do JavaScript, abordando desde conceitos básicos até tópicos avançados. Os alunos aprenderão a criar aplicativos robustos e escaláveis, aproveitando os recursos de tipagem estática, interfaces e classes. Com ênfase na segurança e manutenibilidade do código, o curso explora como TypeScript facilita o desenvolvimento de projetos complexos, tornando-os mais legíveis e menos propensos a erros. Ao final, os participantes estarão aptos a utilizar TypeScript eficientemente em diversas aplicações, aumentando sua produtividade como desenvolvedores.";
  imagem = "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*moJeTvW97yShLB7URRj5Kg.png";
  tags: string[] = ["HTML", "CSS", "JS", "TS"];
  podeEditar = true;
  podeExcluir = true;
}
