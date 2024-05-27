import { Component } from '@angular/core';
import { ModalSalvarCursoComponent } from 'src/app/components/modal-salvar-curso/modal-salvar-curso.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

interface Curso {
  tituloCurso: string;
  descricaoCurso: string;
  tag: string[];
  imagem: string;
  emblema: string;
  certificado: string;
  aulas: Aula[];
}

interface Aula {
  tituloAula: string;
  descricaoAula: string;
  linkAula: string;
  questionario: Questao[];
}

interface Questao {
  questao: string;
  respostas: Alternativa[];
}

interface Alternativa {
  textoAlternativa: string;
  correta: boolean;
}

type imageType = string | ArrayBuffer | null;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  constructor(public sanitizer: DomSanitizer, public dialog: MatDialog) {}

  curso: Curso = {
    tituloCurso: '',
    descricaoCurso: '',
    tag: [],
    imagem: '',
    emblema: '',
    certificado: '',
    aulas: [],
  };

  tagList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  selectedTag: string | undefined;
  selectedOptions: string[] = [];
  tagBoolean = false;

  classOpen = false;
  tituloAula = '';
  descricaoAula = '';
  linkAula = '';
  classList: Aula[] = [];
  questionario: Questao[] = [
    {
      questao: '',
      respostas: this.createEmptyAlternatives(),
    },
    {
      questao: '',
      respostas: this.createEmptyAlternatives(),
    },
    {
      questao: '',
      respostas: this.createEmptyAlternatives(),
    },
    {
      questao: '',
      respostas: this.createEmptyAlternatives(),
    },
  ];

  mostrarAulas = false;

  createEmptyAlternatives(): Alternativa[] {
    return [
      { textoAlternativa: '', correta: false },
      { textoAlternativa: '', correta: false },
      { textoAlternativa: '', correta: false },
      { textoAlternativa: '', correta: false },
      { textoAlternativa: '', correta: false },
    ];
  }

  setCorrectAnswer(questaoIndex: number, alternativaIndex: number) {
    this.questionario[questaoIndex].respostas.forEach((resposta, index) => {
      resposta.correta = index === alternativaIndex;
    });
  }

  editingIndex: number | null = null;

  salvarCurso() {
    this.curso.tag = this.selectedOptions;
    this.curso.imagem = this.selectedImagem as string;
    this.curso.emblema = this.selectedEmblema as string;
    this.curso.certificado = this.selectedCertificadoName as string;
    console.log(this.curso);
    this.mostrarAulas = true;

  }

  saveClass() {
    if (this.editingIndex !== null) {
      this.curso.aulas[this.editingIndex] = {
        tituloAula: this.tituloAula,
        descricaoAula: this.descricaoAula,
        linkAula: this.linkAula,
        questionario: this.questionario.map((q) => ({
          questao: q.questao,
          respostas: q.respostas.map((a) => ({ ...a })),
        })),
      };
      this.editingIndex = null;
    } else {
      this.curso.aulas.push({
        tituloAula: this.tituloAula,
        descricaoAula: this.descricaoAula,
        linkAula: this.linkAula,
        questionario: this.questionario.map((q) => ({
          questao: q.questao,
          respostas: q.respostas.map((a) => ({ ...a })),
        })),
      });
    }

    console.log(this.curso.aulas);
    this.resetClassForm();
  }

  resetClassForm() {
    this.tituloAula = '';
    this.descricaoAula = '';
    this.linkAula = '';
    this.questionario = [
      { questao: '', respostas: this.createEmptyAlternatives() },
      { questao: '', respostas: this.createEmptyAlternatives() },
      { questao: '', respostas: this.createEmptyAlternatives() },
      { questao: '', respostas: this.createEmptyAlternatives() },
    ];
  }

  isOtherCorrectSelected(qi: number, ai: number): boolean {
    return this.questionario[qi].respostas.some(
      (resposta, index) => index !== ai && resposta.correta
    );
  }

  removeTags() {
    this.selectedOptions = [];
    this.tagBoolean = false;
  }

  optionSelected() {
    if (this.selectedTag && this.selectedOptions.length < 3) {
      this.selectedOptions.push(this.selectedTag);
      this.selectedTag = undefined;
    }
    if (this.selectedOptions.length > 0) {
      this.tagBoolean = true;
    }
  }

  mostraDados(aula: Aula, index: number) {
    console.log(
      'Título: ' + aula.tituloAula,
      'Descrição: ' + aula.descricaoAula
    );
    this.tituloAula = aula.tituloAula;
    this.descricaoAula = aula.descricaoAula;
    this.linkAula = aula.linkAula;
    this.questionario = aula.questionario;
    this.editingIndex = index;
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalSalvarCursoComponent);
  }

  selectedImagem: imageType = null;
  selectedEmblema: imageType = null;
  selectedCertificadoName: imageType = null;

  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      if (type === 'imagem' || type === 'emblema') {
        reader.onload = (e) => {
          if (type === 'imagem') {
            this.selectedImagem = e.target?.result as
              | string
              | ArrayBuffer
              | null;
          } else if (type === 'emblema') {
            this.selectedEmblema = e.target?.result as
              | string
              | ArrayBuffer
              | null;
          }
        };
        reader.readAsDataURL(file);
      } else if (type === 'certificado') {
        this.selectedCertificadoName = file.name;
      }
    }
  }

  finalizarGerenciamento() {
    // Lógica para finalizar o gerenciamento do curso
    console.log('Gerenciamento do curso finalizado:', this.curso);
    this.openModal();
  }
}
