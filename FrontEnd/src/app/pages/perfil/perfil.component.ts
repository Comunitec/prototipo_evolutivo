import { Component } from '@angular/core';
import { faEdit, faTrash, faCamera, faEye, faEyeSlash, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  faCamera = faCamera;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;

  editando: boolean = false;

  habilitarEdicao(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(".card_dados_cadastrais input");
    inputs.forEach(input => {
      input.removeAttribute("disabled");
    });

    const inputFile = document.getElementById("input-foto") as HTMLInputElement;
    inputFile.removeAttribute("disabled");

    this.editando = true; // Definir editando como true para habilitar os botões
  }
}
