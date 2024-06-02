import { db } from "../db.js";

export const addAula = (req, res) => {
    const idCurso = req.params.idCurso;
    const { Titulo, Descricao, LinkIncorporacao } = req.body;

    if (!idCurso) {
        return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
    }

    // Verifica o número de aulas existentes para o curso
    const countQuery = `
        SELECT COUNT(*) AS totalAulas FROM aula WHERE idCurso = ?
    `;

    db.query(countQuery, [idCurso], (err, countResult) => {
        if (err) return res.status(500).json(err);

        const totalAulas = countResult[0].totalAulas;
        if (totalAulas >= 4) {
            return res.status(400).json({ message: 'O curso já possui 4 aulas. Não é possível adicionar mais aulas.' });
        }

        // Define o número da nova aula
        const NumeroAula = totalAulas + 1;

        // Insere a nova aula
        const insertQuery = `
            INSERT INTO aula (Titulo, Descricao, LinkIncorporacao, idCurso, NumeroAula)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(insertQuery, [Titulo, Descricao, LinkIncorporacao, idCurso, NumeroAula], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json({ message: 'Aula inserida com sucesso.', data });
        });
    });
};

// Update de uma aula
export const updateAula = (req, res) => {
    const idCurso = req.params.idCurso;
    const numeroAula = req.params.numeroAula; // Número da aula a ser atualizada
    const { Titulo, Descricao, LinkIncorporacao } = req.body;

    if (!Titulo || !Descricao || !LinkIncorporacao || !idCurso || !numeroAula) {
        return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
    }

    // Verifica se a aula a ser atualizada existe
    const checkQuery = `
        SELECT * FROM aula WHERE idCurso = ? AND NumeroAula = ?
    `;
    db.query(checkQuery, [idCurso, numeroAula], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aula não encontrada.' });
        }

        // Atualiza a aula
        const updateQuery = `
            UPDATE aula
            SET Titulo = ?, Descricao = ?, LinkIncorporacao = ?
            WHERE idCurso = ? AND NumeroAula = ?
        `;
        db.query(updateQuery, [Titulo, Descricao, LinkIncorporacao, idCurso, numeroAula], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: 'Aula atualizada com sucesso.', data });
        });
    });
};

//Delete de todas as aulas
export const deleteTodasAulas = (req, res) => {
    const idCurso = req.params.idCurso;
        // Deleta todas as aulas
        const q = `
            DELETE FROM aula WHERE idCurso = ?
        `;
        db.query(q, idCurso, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: 'Aulas deletadas com sucesso', data });
        });

};


// Get de aulas de um determinado curso
export const getAulas = (req, res) => {
    const idCurso = req.params.idCurso;
    const q = `
        SELECT * FROM aula WHERE idCurso = ?
    `;
    db.query(q, [idCurso], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};