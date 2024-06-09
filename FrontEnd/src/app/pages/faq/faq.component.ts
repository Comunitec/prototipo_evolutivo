import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface FAQ {
  idFaq: number;
  fk_adm_idAluno: number;
  Pergunta: string;
  Resposta: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] = [];
  podeVerMenuLateral: boolean = false;
  podeAdicionarEDeletar: boolean = false;
  PerfilDeAcesso = sessionStorage.getItem('PerfilDeAcesso');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarMenuLateral();
    this.listarFaqs();
    this.liberaAdicionarEDeletar();
  }

  liberaAdicionarEDeletar(){
    if(this.PerfilDeAcesso == "Administrador"){
      this.podeAdicionarEDeletar = true;
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('idAluno');
  }

  carregarMenuLateral() {
    if (this.isLoggedIn()) {
      this.podeVerMenuLateral = true;
    }
  }

  listarFaqs(): void {
    this.http.get<FAQ[]>('http://localhost:8800/getFaq')
      .subscribe(
        (data) => {
          console.log('FAQs:', data);
          this.faqs = data;
        },
        (error) => {
          console.error('Erro ao obter FAQs:', error);
        }
      );
  }

  deletarFaq(id: number): void {
    this.http.delete(`http://localhost:8800/deleteFaq/${id}`)
      .subscribe(
        () => {
          console.log(`FAQ com id ${id} deletado com sucesso.`);
          // Atualizar a lista de FAQs após deletar
          this.listarFaqs();
        },
        (error) => {
          console.error(`Erro ao deletar FAQ com id ${id}:`, error);
        }
      );
  }
}
