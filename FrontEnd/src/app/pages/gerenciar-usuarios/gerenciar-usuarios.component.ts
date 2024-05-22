import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent {
  usuarios = [
    { nome: 'Alice Johnson', email: 'alice.johnson@fatec.sp.gov.br' },
    { nome: 'Bob Smith', email: 'bob.smith@fatec.sp.gov.br' },
    { nome: 'Carol Williams', email: 'carol.williams@fatec.sp.gov.br' },
    { nome: 'David Brown', email: 'david.brown@fatec.sp.gov.br' },
    { nome: 'Emma Davis', email: 'emma.davis@fatec.sp.gov.br' },
    { nome: 'Frank Miller', email: 'frank.miller@fatec.sp.gov.br' },
    { nome: 'Grace Wilson', email: 'grace.wilson@fatec.sp.gov.br' },
    { nome: 'Hank Moore', email: 'hank.moore@fatec.sp.gov.br' },
    { nome: 'Ivy Taylor', email: 'ivy.taylor@fatec.sp.gov.br' },
    { nome: 'Jack Anderson', email: 'jack.anderson@fatec.sp.gov.br' },
    { nome: 'Katie Thomas', email: 'katie.thomas@fatec.sp.gov.br' },
    { nome: 'Leo Martinez', email: 'leo.martinez@fatec.sp.gov.br' },
    { nome: 'Mia Harris', email: 'mia.harris@fatec.sp.gov.br' },
    { nome: 'Nina Clark', email: 'nina.clark@fatec.sp.gov.br' },
    { nome: 'Owen Rodriguez', email: 'owen.rodriguez@fatec.sp.gov.br' },
    { nome: 'Paula Lewis', email: 'paula.lewis@fatec.sp.gov.br' },
    { nome: 'Quincy Walker', email: 'quincy.walker@fatec.sp.gov.br' },
    { nome: 'Rachel Young', email: 'rachel.young@fatec.sp.gov.br' },
    { nome: 'Sam King', email: 'sam.king@fatec.sp.gov.br' },
    { nome: 'Tina Wright', email: 'tina.wright@fatec.sp.gov.br' }
  ];

  faEdit = faEdit;
  faTrash = faTrash;

  editando: boolean = false;

  editarUsuario(usuario: any) {}
  excluirUsuario(usuario: any) {}
  adicionarUsuario() {}
}
