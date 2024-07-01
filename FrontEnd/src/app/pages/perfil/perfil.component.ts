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
  selectedFile: File | null = null;

  url = "http://localhost:8800/imagem/";
  Nome: string | null = '';
  Pontos: string | null = '';
  id: string | null = '';
  imagem: string = '';
  Email: string | null = '';
  DataNasc: string | null = '';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private atualizarPerfilService: AtualizarPerfilService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.atualizarDadosDoPerfil();
    this.carregarEmblemas();
    this.carregarPontos();
  }

  atualizarDadosDoPerfil() {
    this.Nome = sessionStorage.getItem('Nome');
    this.Pontos = sessionStorage.getItem('Pontuacao');
    this.id = sessionStorage.getItem('idAluno');
    this.imagem = this.id ? this.url + this.id : '';
    this.Email = sessionStorage.getItem('Email');
    const dataNasc = sessionStorage.getItem('DataNasc');
    this.DataNasc = dataNasc ? new Date(dataNasc).toISOString().substring(0, 10) : '';
  }
  carregarPontos() {
    if (this.id) {
      this.http.get<number>(`http://localhost:8800/getPontosAluno/${this.id}`).subscribe(
        pontos => {
          this.Pontos = pontos.toString(); // Atualiza os pontos no componente
        },
        error => {
          console.error('Erro ao carregar pontos do aluno:', error);
        }
      );
    }
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagem = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  atualizarPerfil() {
    const id = sessionStorage.getItem('idAluno');
    const formData = new FormData();

    formData.append('Nome', this.Nome as string);
    formData.append('Email', this.Email as string);
    formData.append('DataNasc', this.DataNasc || ''); // Tratamento para DataNasc nulo
    if (this.selectedFile) {
      formData.append('Foto', this.selectedFile);
    }

    this.http.put(`http://localhost:8800/updateAluno/${id}`, formData)
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

          // Atualize os dados no componente após a atualização
          this.atualizarDadosDoPerfil();

        },
        error => {
          console.error('Erro na atualização do aluno.', error);
          this.snackBar.open('Erro ao atualizar o perfil.', 'Fechar', {
            duration: 3000,
          });
        }
      );
      window.location.reload();
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
