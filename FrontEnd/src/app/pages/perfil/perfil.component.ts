import { Component, OnInit } from '@angular/core';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';
import { formatDate } from '@angular/common';

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
  Nome = sessionStorage.getItem('Nome');
  Pontos = sessionStorage.getItem('Pontuacao');
  id = sessionStorage.getItem('idAluno');
  imagem = this.url + this.id;
  Email = sessionStorage.getItem('Email');
  DataNasc = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      // Converter a data para o formato ISO 8601 (yyyy-mm-dd)
      this.DataNasc = new Date(dataNasc).toISOString().substring(0, 10);
    }
  }
  openModal(): void {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '360px'
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
}
