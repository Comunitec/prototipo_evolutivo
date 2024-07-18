import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  DataNasc: string;
  Pontuacao: number;
  Foto?: File;
  emblemas: string[];
  photoUrl?: string;
}

@Component({
  selector: 'app-modal-editar-usuario',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.css']
})
export class ModalEditarUsuarioComponent implements OnInit {
  faTrash = faTrash;
  faCamera = faCamera;
  faFloppyDisk = faFloppyDisk;
  faKey = faKey;
  faUser = faUser;
  faXmark = faXmark;

  emblemas: string[] = [];
  usuario: Usuario;

  constructor(
    private dialogRef: MatDialogRef<ModalEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { usuario: Usuario },
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    this.usuario = { ...data.usuario };
  }

  ngOnInit() {
    this.carregarEmblemas();
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      this.usuario.DataNasc = new Date(dataNasc).toISOString().substring(0, 10); // Formato YYYY-MM-DD
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '360px',
      data: { idAluno: this.usuario.idAluno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Senha alterada:', result);
        // Lógica para alterar a senha no backend, se necessário
      } else {
        console.log('Alteração de senha cancelada');
      }
    });
  }

  carregarEmblemas() {
    if (this.usuario.idAluno) {
      this.http.get<{ idCurso: number }[]>(`http://localhost:8800/getCursosConcluidos/${this.usuario.idAluno}`).subscribe(
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
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.usuario.Foto = file; // Salva o arquivo selecionado na propriedade Foto

      const reader = new FileReader();
      reader.onload = () => {
        this.usuario.photoUrl = reader.result as string; // Atualiza a URL da foto no front-end
      };
      reader.readAsDataURL(file);
    }
  }

  salvarAlteracoes(): void {
    const formData = new FormData();
    formData.append('Nome', this.usuario.Nome);
    formData.append('Email', this.usuario.Email);
    formData.append('DataNasc', this.formatarData(this.usuario.DataNasc));
    formData.append('Pontuacao', this.usuario.Pontuacao.toString());
    if (this.usuario.Foto) {
      formData.append('Foto', this.usuario.Foto);
    }

    const url = `http://localhost:8800/updateAluno/${this.usuario.idAluno}`; // Rota para atualizar o aluno

    this.http.put(url, formData).subscribe(
      response => {
        console.log('Usuário atualizado com sucesso:', response);
        this.dialogRef.close(true); // Fechar modal em caso de sucesso


      },
      error => {
        console.error('Erro ao atualizar o usuário:', error);
      }
    );
    window.location.reload();
  }

  cancelar(): void {
    this.dialogRef.close(false); // Fechar modal indicando cancelamento
  }
  private formatarData(data: string): string {
    // Função para formatar a data se necessário
    return data; // Aqui você deve implementar a lógica para formatar conforme necessário
  }
}
