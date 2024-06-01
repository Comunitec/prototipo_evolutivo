import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-excluir-conta',
  templateUrl: './modal-excluir-conta.component.html',
  styleUrls: ['./modal-excluir-conta.component.css']
})
export class ModalExcluirContaComponent implements OnInit {
  faTriangleExclamation = faTriangleExclamation;

  constructor(
    public dialogRef: MatDialogRef<ModalExcluirContaComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { idAluno: number }
  ) {}

  ngOnInit() {
    // Não precisa carregar os usuários aqui
  }

  excluirUsuario() {
    const id = this.data.idAluno;
    this.http.delete(`http://localhost:8800/deleteAluno/${id}`).subscribe(
      () => {
        console.log('Usuário excluído com sucesso.');
        this.dialogRef.close('confirmado'); // Fecha o modal após excluir o usuário
      },
      error => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
