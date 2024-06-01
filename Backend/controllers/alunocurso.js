import { db } from "../db.js";
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