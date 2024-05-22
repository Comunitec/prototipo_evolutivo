import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  photoUrl?: string; // Adicionando a propriedade photoUrl
}


@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  faEdit: IconDefinition = faEdit;
  faTrash: IconDefinition = faTrash;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get<Usuario[]>('http://localhost:8800/getAlunos').subscribe(
      data => {
        console.log('Dados dos usuários:', data);
        this.usuarios = data.map(usuario => ({
          ...usuario,
          photoUrl: `http://localhost:8800/imagem/${usuario.idAluno}`
        }));
      },
      error => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  editarUsuario(id: number) {
    this.router.navigate(['/editar-usuario', id]);
  }

  excluirUsuario(id: number) {
    this.http.delete(`http://localhost:8800/deleteAluno/${id}`).subscribe(
      () => {
        this.carregarUsuarios();
      },
      error => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
  }

  adicionarUsuario() {
    // Lógica para adicionar um novo usuário
  }
}
