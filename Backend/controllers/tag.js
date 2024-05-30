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