import { Component, Optional, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUsuarioCriadoComponent } from 'src/app/components/modal-usuario-criado/modal-usuario-criado.component';
import { ModalErroAoCriarUsuarioComponent } from 'src/app/components/modal-erro-ao-criar-usuario/modal-erro-ao-criar-usuario.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  Nome: string = '';
  Email: string = '';
  Senha: string = '';
  ConfirmarSenha: string = '';
  DataNasc: string = '';
  Pontuacao: number = 0;
  PerfilDeAcesso: string = "Aluno";
  selectedFile: File | null = null;
  selectedImagem: string | ArrayBuffer | null = null;
  origem: string | null = null;
  formSubmitted: boolean = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() private dialogRef: MatDialogRef<SignupFormComponent>, // Injetar MatDialogRef opcionalmente
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Capturar a origem dos dados injetados
    if (this.data && this.data.origem) {
      this.origem = this.data.origem;
    } else {
      this.origem = this.route.snapshot.queryParamMap.get('origem');
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImagem = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(file);
    }
  }

  enviarRegistro() {
    this.formSubmitted = true; // Marcador de formulário submetido

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!this.Nome || !this.Email || !this.Senha || !this.DataNasc) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      this.openModalErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar formato do email
    if (!this.validarEmail()) {
      console.error('O email deve ser válido e do domínio @fatec.sp.gov.br.');
      this.openModalErro('O email deve ser válido e do domínio @fatec.sp.gov.br.');
      return;
    }

    // Validar senha e confirmação de senha
    if (this.Senha.length < 3 || this.Senha !== this.ConfirmarSenha) {
      console.error('A senha deve ter pelo menos 3 caracteres e as senhas devem coincidir.');
      this.openModalErro('A senha deve ter pelo menos 3 caracteres e as senhas devem coincidir.');
      return;
    }

    const url = 'http://localhost:8800/addAluno';

    const formData = new FormData();
    formData.append('Nome', this.Nome);
    formData.append('Email', this.Email);
    formData.append('Senha', this.Senha);
    formData.append('DataNasc', this.DataNasc);
    formData.append('Pontuacao', this.Pontuacao.toString());
    formData.append('PerfilDeAcesso', this.PerfilDeAcesso);
    if (this.selectedFile) {
      formData.append('Foto', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(url, formData).subscribe(
      (response: any) => {
        console.log('Resposta do servidor:', response);
        this.closeModalCadastro(); // Fechar o modal de cadastro
        this.openModalSucesso(); // Abrir o modal de sucesso
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        this.openModalErro('Erro ao enviar o formulário. Por favor, tente novamente.'); // Exemplo genérico de mensagem de erro
      }
    );
  }

  validarEmail(): boolean {
    if (!this.Email) return false; // Retorna falso se o email não estiver preenchido

    // Verifica se há algo antes do '@'
    const parts = this.Email.split('@');
    if (parts.length !== 2 || parts[0].length === 0) {
      return false;
    }

    return this.Email.endsWith('@fatec.sp.gov.br');
  }

  openModalSucesso(): void {
    const dialogRef = this.dialog.open(ModalUsuarioCriadoComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de sucesso foi fechado');
    });
  }

  openModalErro(message: string): void {
    const dialogRef = this.dialog.open(ModalErroAoCriarUsuarioComponent, {
      width: '350px',
      data: { message } // Passando a mensagem de erro para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de erro foi fechado');
    });
  }

  closeModalCadastro(): void {
    if (this.dialogRef) {
      this.dialogRef.close(); // Fechar o modal de cadastro
    }
  }

  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }

  goBack(event: Event) {
    event.preventDefault();
    console.log('Origem:', this.origem);
    if (this.origem === 'modal' && this.dialogRef) {
      console.log('Fechando modal');
      this.dialogRef.close(); // Fechar o modal
    } else {
      console.log('Navegando para a página inicial');
      this.router.navigate(['/']); // Navegar de volta para a página inicial
    }
  }
}
