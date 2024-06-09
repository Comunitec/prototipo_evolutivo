import { db } from "../db.js";

//Get de todas as FAQS 
export const getFaq = (_, res) => {
    const q = "SELECT * FROM faq";
    
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  };

  //Add Faq
  export const addFaq = (req, res) => {
    const { fk_adm_idAluno, Pergunta, Resposta } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!fk_adm_idAluno || !Pergunta || !Resposta) {
        return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
    }

    // Insere o novo FAQ
    const insertQuery = `
        INSERT INTO faq (fk_adm_idAluno, Pergunta, Resposta)
        VALUES (?, ?, ?)
    `;
    db.query(insertQuery, [fk_adm_idAluno, Pergunta, Resposta], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: 'FAQ inserido com sucesso.', data });
    });
};

// Deletar FAQ
export const deleteFaq = (req, res) => {
    const { idFaq } = req.params; // Obter o ID do parâmetro da URL

    if (!idFaq) {
      return res.status(400).json({ message: 'ID do FAQ não fornecido.' });
    }
  
    const q = "DELETE FROM faq WHERE idFaq = ?";
    
    db.query(q, [idFaq], (err, result) => {
      if (err) {
        console.error('Erro ao deletar FAQ:', err);
        return res.status(500).json({ message: 'Erro interno ao deletar FAQ.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'FAQ não encontrado.' });
      }
      return res.status(200).json({ message: 'FAQ deletado com sucesso.' });
    });
};