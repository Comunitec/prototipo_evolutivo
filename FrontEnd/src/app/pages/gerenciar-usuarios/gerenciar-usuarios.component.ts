import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faEdit, faTrash, IconDefinition, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarUsuarioComponent } from 'src/app/components/modal-editar-usuario/modal-editar-usuario.component';
import { ModalExcluirContaComponent } from 'src/app/components/modal-excluir-conta/modal-excluir-conta.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SignupFormComponent } from 'src/app/components/signup-form/signup-form.component';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  Pontuacao: number;
  photoUrl?: string;
}

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchControl: FormControl = new FormControl('');
  faEdit: IconDefinition = faEdit;
  faTrash: IconDefinition = faTrash;
  faUserGear: IconDefinition = faUserGear;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarUsuarios();

    this.searchControl.valueChanges.pipe(
      debounceTime(300) // Espera 300ms após o último evento de digitação
    ).subscribe(value => {
      this.filterUsuarios(value);
    });
  }

  carregarUsuarios() {
    this.http.get<Usuario[]>('http://localhost:8800/getAlunos').subscribe(
      data => {
        console.log('Dados dos usuários:', data);
        this.usuarios = data.map(usuario => ({
          ...usuario,
          photoUrl: `http://localhost:8800/imagem/${usuario.idAluno}`
        }));
        this.filteredUsuarios = this.usuarios; // Inicializa a lista filtrada
      },
      error => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  filterUsuarios(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsuarios = this.usuarios;
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.filteredUsuarios = this.usuarios.filter(usuario =>
        usuario.Nome.toLowerCase().includes(searchTerm) ||
        usuario.Email.toLowerCase().includes(searchTerm)
      );
    }
  }

  editarUsuario(idAluno: number) {
    const usuario = this.usuarios.find(usuario => usuario.idAluno === idAluno);
    const dialogRef = this.dialog.open(ModalEditarUsuarioComponent, {
      width: '50%',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuário editado:', result);
      } else {
        console.log('Edição de usuário cancelada');
      }
    });
  }

  openModal(id: number): void {
    const dialogRef = this.dialog.open(ModalExcluirContaComponent, {
      width: '450px',
      data: { idAluno: id }
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

  openCadastroModal(): void {
    const dialogRef = this.dialog.open(SignupFormComponent, {
      width: '60%', // Defina o tamanho do modal conforme necessário
      data: { origem: 'modal' } // Passar a origem como parâmetro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de cadastro foi fechado');
      this.carregarUsuarios(); // Recarregar a lista de usuários após fechar o modal, se necessário
    });
  }

}
