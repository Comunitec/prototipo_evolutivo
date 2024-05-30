import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  photoUrl?: string; // Adicionando a propriedade photoUrl
}

@Component({
  selector: 'app-modal-excluir-conta',
  templateUrl: './modal-excluir-conta.component.html',
  styleUrls: ['./modal-excluir-conta.component.css']
})
export class ModalExcluirContaComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(public dialogRef: MatDialogRef<ModalExcluirContaComponent>, private http: HttpClient, private router: Router, private dialog: MatDialog) {}

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

  excluirUsuario() {
    const id = this.usuarios[0].idAluno; // Supondo que você deseja excluir o primeiro usuário da lista
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
