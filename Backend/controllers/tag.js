import { db } from "../db.js";

//Get de todas as tags
export const getTags = (_, res) => {
    const q = "SELECT * FROM tag";
    
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  };
  
  // Fazer a relação entre a tag e o curso
  export const addTagCurso = (req, res) => {
    const { idCurso, idTag } = req.body;
  
    // Insira o relacionamento na tabela TagCurso
    const q = "INSERT INTO tagcurso (idCurso, idTag) VALUES (?, ?)";
    const values = [idCurso, idTag];
  
    db.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao inserir relacionamento na tabela TagCurso:", err);
        return res.status(500).json({ error: "Erro ao inserir relacionamento na tabela TagCurso" });
      }
      return res.status(200).json("Relacionamento entre curso e tag adicionado com sucesso.");
    });
  };

// pegar os nomes das tags de um determinado curso
export const getTagsPorCurso = (req, res) => {
  const { idCurso } = req.params;

  // Verifique se o ID do curso foi fornecido
  if (!idCurso) {
    return res.status(400).json({ error: "ID do curso é obrigatório." });
  }

  // Consulta SQL para obter os nomes das tags associadas ao curso
  const q = `
    SELECT t.Nome AS nome_tag
    FROM tag t
    INNER JOIN tagcurso tc ON t.idTag = tc.idTag
    WHERE tc.idCurso = ?
  `;
  const values = [idCurso];

  // Executa a consulta no banco de dados
  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao buscar tags do curso:", err);
      return res.status(500).json({ error: "Erro ao buscar tags do curso" });
    }
    const tags = result.map((row) => row.nome_tag);
    return res.status(200).json(tags);
  });
};

//Deletar todas as tags vinculadas a um curso
export const deleteTags = (req, res) => {
  const idCurso = req.params.idCurso;

  const q = `DELETE FROM tagCurso WHERE idCurso = ?`;

  db.query(q, [idCurso], (err, data) => { 
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: 'O vinculo entre o curso e as tags foi deletado', data });
  });
};