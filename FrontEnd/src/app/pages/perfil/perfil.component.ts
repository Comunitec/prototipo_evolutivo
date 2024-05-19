import { Component } from '@angular/core';
import { faEdit, faTrash, faCamera, faFloppyDisk, faXmark, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Importe o MatDialog
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  faCamera = faCamera;
  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;
  faKey = faKey;
  editando: boolean = false;

  // Dados fictícios do perfil
  ranking: number = 20;
  pontuacao: number = 100;
  emblemas: string[] = ['Emblema 1', 'Emblema 2', 'Emblema 3'];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    // Aqui você pode buscar os dados do perfil do backend quando a API estiver pronta
    // this.http.get('url-do-backend').subscribe(data => {
    //   this.ranking = data.ranking;
    //   this.pontuacao = data.pontuacao;
    //   this.emblemas = data.emblemas;
    // });
  }

  habilitarEdicao(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(".card_dados_cadastrais input");
    inputs.forEach(input => {
      input.removeAttribute("disabled");
    });

    const inputFile = document.getElementById("input-foto") as HTMLInputElement;
    inputFile.removeAttribute("disabled");

    this.editando = true;
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '350px'
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
