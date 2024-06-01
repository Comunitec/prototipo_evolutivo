import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { Alternativa, Aula, Curso, Questao, Tag } from 'src/app/interfaces/curso';
import { ActivatedRoute } from '@angular/router';

type imageType = string | ArrayBuffer | null;

@Component({
  selector: 'app-course-form',
  templateUrl: './edit-course-form.component.html',
  styleUrls: ['./edit-course-form.component.css'],
})
export class EditCourseFormComponent implements OnInit {
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
    public dialogTab: MatTabsModule,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}


    ngOnInit(): void {
      this.loadTags();
      // Obter o ID do curso da rota
      const idCurso = this.route.snapshot.params['id'];
  
      this.http.get<any>(`http://localhost:8800/getCursoPorId/${idCurso}`).subscribe(
    (cursoData) => {
      // Preencher os campos do formulário com os dados do curso obtidos
      this.curso.tituloCurso = cursoData.Nome; // Ajuste aqui conforme necessário
      this.curso.descricaoCurso = cursoData.Descricao; // Ajuste aqui conforme necessário
      // Preencher os outros campos também, se necessário
    },
    (error) => {
      console.error('Erro ao obter os dados do curso:', error);
    }
  );

  this.http.get<any>(`http://localhost:8800/${idCurso}/tags`).subscribe(
      (tagData: string[]) => {
        // Preencher os campos do formulário com os dados do curso obtidos
        this.curso.tag = tagData;
    },
    (error) => {
      console.error('Erro ao obter os dados do curso:', error);
    }
  );
  this.curso.imagem = 'http://localhost:8800/getImagemCurso/' + idCurso;
  this.curso.emblema = 'http://localhost:8800/getEmblemaCurso/' + idCurso;

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

  salvarCurso() {
    this.curso.tag = this.selectedOptions;

    const idCurso = this.route.snapshot.params['id'];
    // Prepare form data
    const formData = new FormData();
    formData.append('Nome', this.curso.tituloCurso);
    formData.append('Descricao', this.curso.descricaoCurso);

    if (this.selectedImagemFile) {
      formData.append('Imagem', this.selectedImagemFile);
    }
    if (this.selectedEmblemaFile) {
      formData.append('Emblema', this.selectedEmblemaFile);
    }
    if (this.selectedCertificadoFile) {
      formData.append('Certificado', this.selectedCertificadoFile);
    }

    this.http.post<any>(`http://localhost:8800/updateCurso/${idCurso}`, formData).subscribe(
      (response) => {
        console.log('Curso salvo com sucesso:', response);
        // Extraia o ID do curso da resposta
        const idCurso = response.idCurso;

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

  removeTags() {
    this.selectedOptions = [];
    this.tagBoolean = false;
  }

  optionSelected() {
    if (this.selectedTag && this.selectedOptions.length < 3) {
      this.selectedOptions.push(this.selectedTag);
      this.tagBoolean = true;
      this.selectedTag = undefined; // Clear selected tag
    }
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      if (type === 'imagem') {
        reader.onload = (e) => {
          this.selectedImagem = e.target?.result as string | ArrayBuffer | null;
          this.selectedImagemFile = file;
        };
        reader.readAsDataURL(file);
      } else if (type === 'emblema') {
        reader.onload = (e) => {
          this.selectedEmblema = e.target?.result as string | ArrayBuffer | null;
          this.selectedEmblemaFile = file;
        };
        reader.readAsDataURL(file);
      } else if (type === 'certificado') {
        this.selectedCertificadoName = file.name;
        this.selectedCertificadoFile = file;
      }
    }
  }

  triggerFileInput(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.click();
    }
  }
}