import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faEdit, faTrash, IconDefinition, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarUsuarioComponent } from 'src/app/components/modal-editar-usuario/modal-editar-usuario.component';
import { ModalExcluirContaComponent } from 'src/app/components/modal-excluir-conta/modal-excluir-conta.component';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  Pontuacao: number; // Adicionando a propriedade Pontuacao
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
  faUserGear: IconDefinition = faUserGear;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

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

  editarUsuario(idAluno: number) { // Alterado o parâmetro para idAluno
    const usuario = this.usuarios.find(usuario => usuario.idAluno === idAluno);
    const dialogRef = this.dialog.open(ModalEditarUsuarioComponent, {
      width: '50%',
      data: { usuario } // Passa o objeto de usuário para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuário editado:', result);
        // Adicione aqui a lógica para atualizar os dados do usuário após a edição
      } else {
        console.log('Edição de usuário cancelada');
      }
    });
  }

  openModal(id: number): void {
    const dialogRef = this.dialog.open(ModalExcluirContaComponent, {
      width: '450px',
      data: { idAluno: id } // Passa o ID do usuário para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmado') {
        this.carregarUsuarios();
      }
    });
  }

  adicionarUsuario() {
    this.router.navigate(['/signup']);
  }
  pesquisarUsuario(){}
  }
