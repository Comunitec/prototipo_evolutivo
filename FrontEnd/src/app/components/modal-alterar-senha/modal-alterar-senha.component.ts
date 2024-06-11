import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-alterar-senha',
  templateUrl: './modal-alterar-senha.component.html',
  styleUrls: ['./modal-alterar-senha.component.css']
})
export class ModalAlterarSenhaComponent implements OnInit {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';
  senha: string = '';

  senhaVisivel: boolean = false;
  senhaVisivelAtual: boolean = false;
  senhaVisivelNova: boolean = false;
  senhaVisivelConfirmarNova: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalAlterarSenhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idAluno: number },
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getSenhaAtual();
  }

  close(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    // Verificar se a nova senha é igual à confirmação da nova senha
    if (this.novaSenha !== this.confirmarNovaSenha) {
      alert("A nova senha e a confirmação da nova senha não coincidem.");
      return;
    }

    // Verificar se a nova senha é igual à senha atual
    if (this.novaSenha === this.senhaAtual) {
      alert("A nova senha não pode ser igual à senha atual.");
      return;
    }

    const idAluno = this.data.idAluno; // Usando o idAluno passado nos dados do modal

    const novaSenha = this.novaSenha;

    this.http.put<any>(`http://localhost:8800/atualizarSenha/${idAluno}`, { novaSenha }).subscribe(
      (response) => {
        console.log("Senha atualizada com sucesso!");
        this.dialogRef.close({ senhaAtual: this.senhaAtual, novaSenha: this.novaSenha });
      },
      (error) => {
        console.error('Erro ao atualizar a senha:', error);
      }
    );
  }

  getSenhaAtual(): void {
    const idAluno = this.data.idAluno;
    this.http.get<any>(`http://localhost:8800/getSenhaAtual/${idAluno}`).subscribe(
      (response) => {
        this.senhaAtual = response.senhaAtual;
      },
      (error) => {
        console.error('Erro ao obter a senha atual:', error);
      }
    );
  }

  toggleVisibilidadeSenha(campo: string): void {
    switch (campo) {
      case 'atual':
        this.senhaVisivelAtual = !this.senhaVisivelAtual;
        break;
      case 'nova':
        this.senhaVisivelNova = !this.senhaVisivelNova;
        break;
      case 'confirmarNova':
        this.senhaVisivelConfirmarNova = !this.senhaVisivelConfirmarNova;
        break;
      default:
        break;
    }
  }
}
