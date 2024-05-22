import { db } from "../db.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

//Get de todos os cursos
export const getCursos = (_, res) => {
    const q = "SELECT * FROM curso";
  
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
  };

// Adicionar cursos
export const addCurso = (req, res) => {
  const { Nome, Descricao, idAlunoCriador, idTag } = req.body;
  const arquivos = req.files;

  if (!arquivos || !arquivos['Imagem'] || !arquivos['Certificado'] || !arquivos['Emblema']) {
    return res.status(400).json({ error: "Todos os arquivos (Imagem, Certificado, Emblema) são necessários" });
  }

  const imagem = arquivos['Imagem'][0].filename;
  const certificado = arquivos['Certificado'][0].filename;
  const emblema = arquivos['Emblema'][0].filename;

  const imagemPath = path.join('/static/images/cursos', imagem);
  const certificadoPath = path.join('/static/certificados', certificado);
  const emblemaPath = path.join('/static/emblemas', emblema);

  const query = "INSERT INTO curso(`Nome`, `Descricao`, `Imagem`, `Certificado`, `Emblema`, `idAlunoCriador`, `idTag`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [Nome, Descricao, imagemPath, certificadoPath, emblemaPath, idAlunoCriador, idTag];

  db.query(query, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Curso criado com sucesso.");
  });
};