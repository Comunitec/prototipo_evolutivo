import { db } from "../db.js";

// Get de todos os questionários de um determinado curso
export const getQuestionarios = (req, res) => {
    const idCurso = req.params.idCurso;
    const q = `
        SELECT q.*
        FROM questionario q
        INNER JOIN aula a ON q.idAula = a.idAula
        WHERE a.idCurso = ?
    `;
    db.query(q, [idCurso], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

//Adicionar questionários
export const addQuestionario = (req, res) => {
    const idCurso = req.params.idCurso;
    const { NumeroAula, Titulo, Descricao } = req.body;

    if (!NumeroAula || !Titulo || !Descricao) {
        return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
    }

    // Encontra o idAula correspondente ao NumeroAula e idCurso fornecidos
    const getAulaIdQuery = `
        SELECT idAula FROM aula WHERE idCurso = ? AND NumeroAula = ?
    `;
    db.query(getAulaIdQuery, [idCurso, NumeroAula], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aula não encontrada.' });
        }

        const idAula = result[0].idAula;

        // Insere o novo questionário associando-o à aula encontrada
        const insertQuery = `
            INSERT INTO questionario (Titulo, Descricao, idAula)
            VALUES (?, ?, ?)
        `;
        db.query(insertQuery, [Titulo, Descricao, idAula], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json({ message: 'Questionário inserido com sucesso.', data });
        });
    });
};