import { db } from "../db.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

//Get de todos os alunos
export const getAlunos = (_, res) => {
  const q = "SELECT * FROM aluno";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
//Get de todos os alunos ranking
export const getAlunosRanking = (_, res) => {
  const q = `
    SELECT idAluno, Nome, Pontuacao,
           RANK() OVER (ORDER BY Pontuacao DESC) AS position
    FROM aluno
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const deleteAluno = (req, res) => {
  const id = req.params.id;

  const qSelect = "SELECT Foto FROM aluno WHERE idAluno = ?";
  const qDelete = "DELETE FROM aluno WHERE idAluno = ?";

  db.query(qSelect, [id], (err, result) => {
    if (err) {
      console.error("Erro ao selecionar imagem do aluno:", err);
      return res.sendStatus(500);
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const imagePath = result[0].Foto.toString();
    const imageAbsPath = path.join(process.cwd(), imagePath);

    console.log("Caminho absoluto da imagem:", imageAbsPath);

    fs.unlink(imageAbsPath, (err) => {
      if (err) {
        console.error("Erro ao excluir imagem do aluno:", err);
        return res.sendStatus(500);
      }

      db.query(qDelete, [id], (err) => {
        if (err) {
          console.error("Erro ao excluir aluno do banco de dados:", err);
          return res.sendStatus(500);
        }

        return res.status(200).json({ message: "Usuário e imagem deletados com sucesso." });
      });
    });
  });
};

//Adicionar alunos
export const addAluno = (req, res) => {
  const { Nome, Email, Senha, DataNasc, Pontuacao, PerfilDeAcesso } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Foto não enviada" });
  }

  const filename = req.file.filename;
  const filepath = path.join('/static/images/alunos', filename);


  const q = "INSERT INTO aluno(`Nome`, `Email`, `Senha`, `DataNasc`, `Foto`, `Pontuacao`, `PerfilDeAcesso`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [Nome, Email, Senha, DataNasc, filepath, Pontuacao, PerfilDeAcesso];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");

  });
};

// Recuperar imagem de aluno
export const getImagemAluno = (req, res) => {
  const id = req.params.id; // ID do aluno
  const q = "SELECT Foto FROM aluno WHERE idAluno = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    
    const imagePath = result[0].Foto.toString(); // Converter para string
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