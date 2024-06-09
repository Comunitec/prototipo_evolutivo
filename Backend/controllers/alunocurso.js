import { db } from "../db.js";

// Função para registrar a matrícula de um aluno em um curso
export const matricularAluno = (req, res) => {
  const { idAluno, idCurso } = req.body;

  // Consulta para verificar se a matrícula já existe
  const checkQuery = `
    SELECT * FROM alunocurso
    WHERE idAluno = ? AND idCurso = ?
  `;

  // Consulta para inserir a matrícula
  const insertQuery = `
    INSERT INTO alunocurso (idAluno, idCurso)
    VALUES (?, ?)
  `;

  // Primeiro, verificamos se a matrícula já existe
  db.query(checkQuery, [idAluno, idCurso], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0) {
      return res.status(400).json({ message: "Aluno já matriculado neste curso.", results });
    }

    // Se não existe, inserimos a nova matrícula
    db.query(insertQuery, [idAluno, idCurso], (err, data) => {
      if (err) return res.status(500).json(err);

      // Pega o idAlunoCurso gerado automaticamente
      const lastInsertIdQuery = `SELECT LAST_INSERT_ID() AS idAlunoCurso`;
      db.query(lastInsertIdQuery, (err, results) => {
        if (err) return res.status(500).json(err);
        const idAlunoCurso = results[0].idAlunoCurso;
        return res.status(201).json({ message: "Matrícula realizada com sucesso.", idAlunoCurso });
      });
    });
  });
};

// Verifica se um aluno está matriculado em um curso
export const verificarMatricula = (req, res) => {
  const { idAluno, idCurso } = req.params;

  const query = `
    SELECT * FROM alunocurso
    WHERE idAluno = ? AND idCurso = ?
  `;

  db.query(query, [idAluno, idCurso], (err, results) => {
    if (err) return res.status(500).json(err);
    const matriculado = results.length > 0;
    return res.status(200).json({ matriculado });
  });
};


// Função para obter o idAlunoCurso
export const getIdAlunoCurso = (req, res) => {
  const { idAluno, idCurso } = req.params;

  const query = `
    SELECT idAlunoCurso FROM alunocurso
    WHERE idAluno = ? AND idCurso = ?
  `;

  db.query(query, [idAluno, idCurso], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) {
      return res.status(404).json({ message: "Matrícula não encontrada." });
    }
    const idAlunoCurso = results[0].idAlunoCurso;
    return res.status(200).json({ idAlunoCurso });
  });
};

// Desmatrícula de aluno em curso
export const desmatricularAluno = (req, res) => {
  const { idAluno, idCurso } = req.body;
  const q = `DELETE FROM alunocurso WHERE idAluno = ? AND idCurso = ?`;

  db.query(q, [idAluno, idCurso], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: 'Desmatrícula realizada com sucesso.' });
  });
};

// Get de cursos nos quais um aluno está matriculado
export const getCursosMatriculados = (req, res) => {
  const idAluno = req.params.idAluno;
  const q = `
    SELECT curso.*
    FROM 
      alunocurso
    INNER JOIN 
      curso ON alunocurso.idCurso = curso.idCurso
    WHERE 
      alunocurso.idAluno = ?
  `;
  db.query(q, [idAluno], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
