export interface Curso {
  tituloCurso: string;
  descricaoCurso: string;
  tag: string[];
  imagem: string;
  emblema: string;
  certificado: string;
  aulas: Aula[];
}

export interface Aula {
  tituloAula: string;
  descricaoAula: string;
  linkAula: string;
  questionario: Questao[];
}

export interface Questao {
  questao: string;
  descricao: string;
  respostas: Alternativa[];
}

export interface Alternativa {
  textoAlternativa: string;
  correta: boolean;
}

export interface Tag {
  idTag: number;
  Nome: string;
}

export interface Tag {
  idTag: number;
  Nome: string;
}
