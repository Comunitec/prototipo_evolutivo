import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalSalvarCursoComponent } from 'src/app/components/modal-salvar-curso/modal-salvar-curso.component';

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

interface Tag {
  idTag: Number;
  Nome: string;
}

type imageType = string | ArrayBuffer | null;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  curso: Curso = {
    tituloCurso: '',
    descricaoCurso: '',
    tag: [],
    imagem: '',
    emblema: '',
    certificado: '',
    aulas: [],
  };

  tagList: Tag[] = [];
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
  ];

  mostrarAulas = false;

  selectedImagem: imageType = null;
  selectedEmblema: imageType = null;
  selectedCertificadoName: string | null = null;
  selectedImagemFile: File | null = null;
  selectedEmblemaFile: File | null = null;
  selectedCertificadoFile: File | null = null;

  editingIndex: number | null = null;

  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.http.get<Tag[]>('http://localhost:8800/getTags').subscribe(
      (tags) => {
        // Adiciona os dados recebidos da API à variável tagList
        this.tagList = [...tags];
      },
      (error) => {
        console.error('Erro ao carregar as tags:', error);
      }
    );
  }
  
  

  createEmptyAlternatives(): Alternativa[] {
    return [
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

  salvarCurso() {
    this.curso.tag = this.selectedOptions;
  
    // Prepare form data
    const formData = new FormData();
    formData.append('Nome', this.curso.tituloCurso);
    formData.append('Descricao', this.curso.descricaoCurso);
    formData.append('idAlunoCriador', '5'); // ID fixo do aluno criador
  
    if (this.selectedImagemFile) {
      formData.append('Imagem', this.selectedImagemFile);
    }
    if (this.selectedEmblemaFile) {
      formData.append('Emblema', this.selectedEmblemaFile);
    }
    if (this.selectedCertificadoFile) {
      formData.append('Certificado', this.selectedCertificadoFile);
    }
  
    this.http.post<any>('http://localhost:8800/addCurso', formData).subscribe(
      (response) => {
        console.log('Curso salvo com sucesso:', response);
        // Extraia o ID do curso da resposta
        const idCurso = response.idCurso; 
        this.mostrarAulas = true;
        // Associe as tags ao curso após salvar o curso
        this.associarTagsAoCurso(idCurso);
      },
      (error) => {
        console.error('Erro ao salvar curso:', error);
      }
    );
  }

  associarTagsAoCurso(idCurso: number) {
    // Para cada tag selecionada, faz uma requisição para associá-la ao curso
    this.selectedOptions.forEach((tagNome) => {
      const tag = this.tagList.find((tag) => tag.Nome === tagNome);
      if (tag) {
        const tagCursoData = { idCurso, idTag: tag.idTag };
        this.http.post<any>('http://localhost:8800/addTagCurso', tagCursoData).subscribe(
          (response) => {
            console.log(`Tag associada ao curso com sucesso: ${tag.Nome}`);
          },
          (error) => {
            console.error(`Erro ao associar tag ao curso: ${tag.Nome}`, error);
          }
        );
      }
    });
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
            this.selectedImagem = e.target?.result as string | ArrayBuffer | null;
            this.selectedImagemFile = file;
          } else if (type === 'emblema') {
            this.selectedEmblema = e.target?.result as string | ArrayBuffer | null;
            this.selectedEmblemaFile = file;
          }
        };
        reader.readAsDataURL(file);
      } else if (type === 'certificado') {
        this.selectedCertificadoName = file.name;
        this.selectedCertificadoFile = file;
      }
    }
  }

  finalizarGerenciamento() {
    console.log('Gerenciamento do curso finalizado:', this.curso);
    this.openModal();
  }
}
