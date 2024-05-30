import { db } from "../db.js";
import path from 'path';

//Get de todos os cursos
export const getCursos = (_, res) => {
  const q = "SELECT * FROM curso";
  
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

//Add curso
export const addCurso = (req, res) => {
  const { Nome, Descricao, idAlunoCriador } = req.body;
  const status= 'em criação';

  // Logs para verificar a chegada dos dados
  console.log("Received body:", req.body);
  console.log("Received files:", req.files);

  // Verificar se os arquivos foram enviados corretamente
  const { Imagem, Certificado, Emblema } = req.files;

  if (!Imagem || !Certificado || !Emblema) {
    console.error("Arquivos não enviados corretamente");
    return res.status(400).json({ error: "Arquivos não enviados corretamente" });
  }

  // Verificar se os nomes dos arquivos estão definidos corretamente
  const imagemName = Imagem[0].filename;
  const certificadoName = Certificado[0].filename;
  const emblemaName = Emblema[0].filename;

  console.log("Imagem Name:", imagemName);
  console.log("Certificado Name:", certificadoName);
  console.log("Emblema Name:", emblemaName);

  if (!imagemName || !certificadoName || !emblemaName) {
    console.error("Nomes dos arquivos não definidos corretamente");
    return res.status(400).json({ error: "Nomes dos arquivos não definidos corretamente" });
  }

  // Caminhos relativos para os arquivos
  const imagemPath = path.join('static/images/cursos', imagemName);
  const certificadoPath = path.join('static/images/certificados', certificadoName);
  const emblemaPath = path.join('static/images/emblemas', emblemaName);

  console.log("Imagem Path:", imagemPath);
  console.log("Certificado Path:", certificadoPath);
  console.log("Emblema Path:", emblemaPath);

  // Inserir informações do curso no banco de dados
  const q = "INSERT INTO curso(`Nome`, `Descricao`, `Imagem`, `Certificado`, `Emblema`, `idAlunoCriador`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [Nome, Descricao, imagemPath, certificadoPath, emblemaPath, idAlunoCriador, status];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao inserir curso no banco de dados:", err);
      return res.status(500).json({ error: "Erro ao inserir curso no banco de dados" });
    }
    return res.status(200).json("Curso criado com sucesso.");
  });
};
