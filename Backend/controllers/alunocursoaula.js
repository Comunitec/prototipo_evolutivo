import { db } from "../db.js";

export const finalizarQuestionario = (req, res) => {
  const { idAlunocurso, idAula, status } = req.body;

  const checkQuery = `
    SELECT * FROM alunocursoaula
    WHERE idAlunocursoaula = ? AND idAula = ? and status = "concluido"
  `;

  // Consulta para inserir finalização do questionário
  const insertQuery = `
    INSERT INTO alunocursoaula (idAlunocurso, idAula, status)
    VALUES (?, ?, ?)
  `;

  // Primeiro, verificamos se o registro já existe
  db.query(checkQuery, [idAlunocurso, idAula], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0) {
      return res.status(400).json({ message: "Questionário já finalizado.", results });
    }
    // Se não existe, inserimos a finalização do questionário
    
    db.query(insertQuery, [idAlunocurso, idAula, status], (err, data) => {
      if (err) return res.status(500).json(err, data);
      return res.status(201).json({ message: "Questionário finalizado com sucesso." });
    });
  });
  };

export const getQuestionariosFinalizados = (req, res) => {
  const { idAlunoCursoAula } = req.params;

  const query = `
    SELECT * FROM alunocursoaula
    WHERE idAlunoCursoAula = ?
  `;

  db.query(query, [idAlunoCursoAula], (err, results) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(results);
  });
}