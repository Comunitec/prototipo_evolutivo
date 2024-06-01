import { db } from "../db.js";
import path from 'path';
import fs from 'fs';

//Get de todos os cursos
export const getCursos = (_, res) => {
  const q = "SELECT * FROM curso";
  
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

//Get de cursos com status em criação de um determinado usuário
export const getCursosEmCriacao = (req, res) => {
  const idAlunoCriador = req.params.idAlunoCriador;

  const q = "SELECT * FROM curso WHERE idAlunoCriador = ? AND Status = 'em criação'";
  db.query(q, idAlunoCriador, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

//Get de cursos com status aguardando aprovação
export const getCursosAguardandoAprovacao = (_, res) => {
  const q = "SELECT * FROM curso WHERE Status = 'aguardando aprovação'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

//Get de cursos com status aprovado
export const getCursosAprovados = (_, res) => {
  const q = "SELECT * FROM curso WHERE Status = 'aprovado'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


// Get de um curso específico por ID
export const getCursoPorId = (req, res) => {
  const idCurso = req.params.id; // Supondo que o ID seja passado como um parâmetro na URL
  
  const q = "SELECT * FROM curso WHERE idCurso = ?";
  db.query(q, [idCurso], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }
    return res.status(200).json(data[0]);
  });
};

// Rota para adicionar um curso
export const addCurso = (req, res) => {
  const { Nome, Descricao, idAlunoCriador } = req.body;
  const status = 'em criação';

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

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir curso no banco de dados:", err);
      return res.status(500).json({ error: "Erro ao inserir curso no banco de dados" });
    }
    const idCurso = result.insertId; // Obtém o ID do curso recém-inserido
    console.log("ID do curso inserido:", idCurso);
    return res.status(200).json({ message: "Curso criado com sucesso.", idCurso });
  });
};

export const getImagemCurso = (req, res) => {
  const id = req.params.id; // ID do curso
  const q = "SELECT Imagem FROM curso WHERE idCurso = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    
    const imagePath = result[0].Imagem.toString(); // Converter para string
    const imageAbsPath = path.join(process.cwd(), imagePath); // Caminho absoluto da imagem usando process.cwd()

    console.log("Caminho absoluto da imagem:", imageAbsPath);

    // Lê o arquivo de imagem do disco
    fs.readFile(imageAbsPath, (err, data) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // Envia a imagem como resposta
      console.log("Imagem lida com sucesso.");
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data);
    });
  });
};