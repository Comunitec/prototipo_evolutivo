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