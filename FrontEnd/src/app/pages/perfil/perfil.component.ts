import { Component } from '@angular/core';
import{faEdit,faTrash, faCamera} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  faCamera= faCamera;


}
