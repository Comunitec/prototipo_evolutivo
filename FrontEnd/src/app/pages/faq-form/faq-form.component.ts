import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Definição da interface FAQ
interface FAQ {
  id: number;
  fk_adm_idAluno: number;
  Pergunta: string;
  Resposta: string;
}

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent {
  novaPergunta: string = '';
  novaResposta: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  addFaq(): void {
    const idAluno = sessionStorage.getItem('idAluno');
    if (idAluno) {
      const novoFaq: Partial<FAQ> = {
        fk_adm_idAluno: +idAluno,
        Pergunta: this.novaPergunta,
        Resposta: this.novaResposta
      };

      this.http.post<FAQ[]>('http://localhost:8800/addFaq', novoFaq)
        .subscribe(
          (data) => {
            console.log('FAQ adicionado:', data);
            this.router.navigate(['/faq']);
          },
          (error) => {
            console.error('Erro ao adicionar FAQ:', error);
          }
        );
    }
  }

  onSubmit(): void {
    this.addFaq();
  }
}
