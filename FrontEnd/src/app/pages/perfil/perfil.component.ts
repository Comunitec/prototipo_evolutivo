import { Component, OnInit } from '@angular/core';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';
import { AtualizarPerfilService } from 'src/app/services/atualizar-perfil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ModalExcluirContaComponent } from 'src/app/components/modal-excluir-conta/modal-excluir-conta.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  faTrash = faTrash;
  faCamera = faCamera;
  faFloppyDisk = faFloppyDisk;
  faKey = faKey;
  faUser = faUser;

  emblemas: string[] = [];

  url = "http://localhost:8800/imagem/";
  Nome: string | null = sessionStorage.getItem('Nome');
  Pontos: string | null = sessionStorage.getItem('Pontuacao');
  id: string | null = sessionStorage.getItem('idAluno');
  imagem: string = this.id ? this.url + this.id : '';
  Email: string | null = sessionStorage.getItem('Email');
  DataNasc = '';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private atualizarPerfilService: AtualizarPerfilService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      // Converter a data para o formato ISO 8601 (yyyy-mm-dd)
      this.DataNasc = new Date(dataNasc).toISOString().substring(0, 10);
    }

    this.carregarEmblemas();
  }

  carregarEmblemas() {
    if (this.id) {
      this.http.get<{ idCurso: number }[]>(`http://localhost:8800/getCursosConcluidos/${this.id}`).subscribe(
        cursosConcluidos => {
          const emblemaRequests = cursosConcluidos.map(curso =>
            this.http.get(`http://localhost:8800/getEmblemaCurso/${curso.idCurso}`, { responseType: 'blob' })
          );

          forkJoin(emblemaRequests).subscribe(
            emblemasBlobs => {
              this.emblemas = emblemasBlobs.map(blob => URL.createObjectURL(blob));
            },
            error => {
              console.error('Erro ao carregar os emblemas dos cursos', error);
            }
          );
        },
        error => {
          console.error('Erro ao obter os cursos concluídos', error);
        }
      );
    }
  }

  atualizarPerfil() {
    const id = sessionStorage.getItem('idAluno');
    const userData = {
      Nome: this.Nome,
      Email: this.Email,
      DataNasc: this.DataNasc,
    };

    this.http.put<string[]>(`http://localhost:8800/updateAluno/${id}`, userData)
      .subscribe(
        response => {
          console.log("Aluno atualizado com sucesso!!!");
          this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          const updatedData = {
            Nome: this.Nome,
            Email: this.Email,
            DataNasc: this.DataNasc,
            idAluno: this.id,
          };

          // Atualize o serviço com os novos valores
          this.atualizarPerfilService.changeAluno(updatedData);

        },
        error => {
          console.error('Erro na atualização do aluno.', error);
          this.snackBar.open('Erro ao atualizar o perfil.', 'Fechar', {
            duration: 3000,
          });
        }
      );
  }

  openModal(): void {
    const id = sessionStorage.getItem('idAluno');
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '360px',
      data: { idAluno: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Senha alterada:', result);
        // Aqui você pode adicionar a lógica para alterar a senha no backend
      } else {
        console.log('Alteração de senha cancelada');
      }
    });
  }

  openModalExcluir(): void {
    // Aqui, você deve abrir o modal de exclusão
    const dialogRef = this.dialog.open(ModalExcluirContaComponent, {
      width: '450px',
      data: { idAluno: this.id } // Passa o id do aluno para o modal, se necessário
    });

    // Lida com o fechamento do modal
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmado') {
        // Redireciona para a página de login após a exclusão
        window.location.href = '/login'; // Isso fará o redirecionamento para a página de login
      } else {
        console.log('Exclusão de conta cancelada');
      }
    });
  }
}