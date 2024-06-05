import { db } from "../db.js";

// Get de todas as questões de um determinado curso
export const getQuestoes = (req, res) => {
    const idCurso = req.params.idCurso;
    const q = `
        SELECT qe.*
        FROM questao qe
        INNER JOIN questionario q ON qe.idQuestionario = q.idQuestionario
        INNER JOIN aula a ON q.idAula = a.idAula
        WHERE a.idCurso = ?
    `;
    db.query(q, [idCurso], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Get de todas as questões de um determinado questionário, dado o idCurso e numeroAula
export const getQuestoesByCursoEAula = (req, res) => {
    const idCurso = req.params.idCurso;
    const numeroAula = req.params.numeroAula; // Agora usando req.params para receber o número da aula

    console.log(`idCurso: ${idCurso}, numeroAula: ${numeroAula}`); // Log dos parâmetros recebidos

    const q = `
        SELECT qe.*
        FROM questao qe
        INNER JOIN questionario q ON qe.idQuestionario = q.idQuestionario
        INNER JOIN aula a ON q.idAula = a.idAula
        WHERE a.idCurso = ? AND a.numeroAula = ?
    `;
    
    db.query(q, [idCurso, numeroAula], (err, data) => {
        if (err) {
            console.error('Database error:', err); // Log do erro
            return res.status(500).json(err);
        }
        
        console.log('Data retrieved:', data); // Log dos dados retornados
        return res.status(200).json(data);
    });
};

//Add questão 
export const addQuestao = (req, res) => {
    const idCurso = req.params.idCurso;
    const { NumeroAula, Descricao } = req.body;

    if (!NumeroAula) {
        return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
    }

    // Encontra o idQuestionario correspondente ao idCurso e NumeroAula fornecidos
    const getQuestionarioQuery = `
        SELECT q.idQuestionario FROM questionario q
        INNER JOIN aula a ON q.idAula = a.idAula
        WHERE a.idCurso = ? AND a.NumeroAula = ?
    `;
    db.query(getQuestionarioQuery, [idCurso, NumeroAula], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Questionário não encontrado.' });
        }

        const idQuestionario = result[0].idQuestionario;

        // Verifica se já existe uma questão associada a este questionário
        const checkQuestaoQuery = `
            SELECT idQuestao FROM questao WHERE idQuestionario = ?
        `;
        db.query(checkQuestaoQuery, [idQuestionario], (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                return res.status(400).json({ message: 'Já existe uma questão associada a este questionário.' });
            }

            // Insere a nova questão associando-a ao questionário encontrado
            const insertQuery = `
                INSERT INTO questao (Descricao, idQuestionario)
                VALUES (?, ?)
            `;
            db.query(insertQuery, [Descricao, idQuestionario], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(201).json({ message: 'Questão inserida com sucesso.', data });
            });
        });
    });
};