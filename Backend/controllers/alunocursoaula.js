import { db } from "../db.js";

export const finalizarQuestionario = (req, res) => {
  const { idAlunocurso, idAula, status } = req.body;

  // Consulta para inserir finalização do questionário
  const insertQuery = `
    INSERT INTO alunocursoaula (idAlunocurso, idAula, status)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [idAlunocurso, idAula, status], (err, data) => {
    if (err) return res.status(500).json(err, data);
    return res.status(201).json({ message: "Questionário finalizado com sucesso." });
  });
};
