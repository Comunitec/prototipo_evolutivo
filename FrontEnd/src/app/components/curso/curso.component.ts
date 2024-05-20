import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  nomeCurso = "Typescript";
  descricao = "O curso de TypeScript oferece uma introdução abrangente a essa linguagem de programação superset do JavaScript, abordando desde conceitos básicos até tópicos avançados. Os alunos aprenderão a criar aplicativos robustos e escaláveis, aproveitando os recursos de tipagem estática, interfaces e classes. Com ênfase na segurança e manutenibilidade do código, o curso explora como TypeScript facilita o desenvolvimento de projetos complexos, tornando-os mais legíveis e menos propensos a erros. Ao final, os participantes estarão aptos a utilizar TypeScript eficientemente em diversas aplicações, aumentando sua produtividade como desenvolvedores.";
  imagem = "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*moJeTvW97yShLB7URRj5Kg.png";
  tags: string[] = ["HTML", "CSS", "JS", "TS"];
  podeEditar = false;
  podeExcluir = false;
  podeAprovar = false;
  podeReprovar = false;
  podeInativar = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentRoute = this.router.url;
      // Aqui você pode definir as variáveis com base na rota atual
      if (currentRoute.includes('/meusCursosAluno')) {
      } else if (currentRoute.includes('/meusCursosProfessor')){
        this.podeEditar = true;
        this.podeExcluir = true;
      }else if (currentRoute.includes('/staff')){
        this.podeAprovar= true;
        this.podeReprovar = true;
      }

    });
  }

  redirecionarParaRota(idCurso: string) {
    // Aqui você pode redirecionar para a rota desejada, passando o id do curso
    this.router.navigate(['/sua-rota', idCurso]);
  }

  getTruncatedText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }
}
