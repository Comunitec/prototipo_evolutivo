import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Definição da interface Curso
interface Curso {
  idCurso: number;
  Nome: string;
  Imagem: string; // Adicionamos o campo para a URL da imagem do curso
  tags: string[];
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  podeEditar: boolean = false;
  podeExcluir: boolean = false;
  podeAprovar: boolean = false;
  podeReprovar: boolean = false;
  podeInativar: boolean = false;

  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentRoute = this.router.url;
      // Aqui você pode definir as variáveis com base na rota atual
      if (currentRoute.includes('/meusCursosAluno')) {
        // Defina as permissões para alunos
      } else if (currentRoute.includes('/meusCursosProfessor')){
        // Defina as permissões para professores
        this.podeEditar = true;
        this.podeExcluir = true;
      } else if (currentRoute.includes('/staff')){
        // Defina as permissões para o staff
        this.podeAprovar= true;
        this.podeReprovar = true;
      }
    });

    // Chama a função para carregar os cursos ao inicializar o componente
    this.listarCursos();
    
  }

  listarCursos(): void {
    this.http.get<Curso[]>('http://localhost:8800/getCursos')
      .subscribe(
        (data) => {
          this.cursos = data;
          // Para cada curso, obtemos a URL da imagem usando o ID do curso
          this.cursos.forEach(curso => {
            this.getImagemCurso(curso.idCurso, curso);
            this.getTagsCurso(curso.idCurso, curso);
          });
        },
        (error) => {
          console.error('Erro ao obter cursos:', error);
        }
      );
  }

  getTagsCurso(idCurso: number, curso: Curso): void {
    this.http.get<string[]>(`http://localhost:8800/${idCurso}/tags`)
      .subscribe(
        (tags) => {
          curso.tags = tags;
          console.log('Tags do curso', curso.Nome, ':', tags); // Verifica se as tags estão sendo recebidas corretamente
        },
        (error) => {
          console.error(`Erro ao obter tags do curso ${idCurso}:`, error);
        }
      );
  }

  getImagemCurso(idCurso: number, curso: Curso): void {
    // Monta a URL da imagem do curso usando o ID do curso
    curso.Imagem = `http://localhost:8800/getImagemCurso/${idCurso}`;
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

