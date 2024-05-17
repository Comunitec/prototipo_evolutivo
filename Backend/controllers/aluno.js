import { db } from "../db.js";
import bodyParser from 'body-parser';

export const getAlunos = (_, res) => {
  const q = "SELECT * FROM aluno";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// export const addAluno = (req, res) => {
//     const q = "INSERT INTO aluno(`Nome`, `Email`, `DataNasc`, `Foto`, `Pontuacao`, `PerfilDeAcesso`) VALUES(?)";

//     const values = [
//       req.body.Nome,
//       req.body.Email,
//       req.body.DataNasc,
//       req.body.Foto,
//       req.body.Pontuacao,
//       req.body.PerfilDeAcesso 
//     ];
  
//     db.query(q, [values], (err) => {
//         if (err) return res.json(err);
    
//         return res.status(200).json("Usuário criado com sucesso.");
//       });
// };


// Função para adicionar aluno
export const addAluno = (req, res) => {
  const { Nome, Email, Senha, DataNasc, Pontuacao, PerfilDeAcesso, Foto } = req.body;

  const buffer = Buffer.from(Foto, 'base64'); // Converte a string base64 para um buffer binário

  const q = "INSERT INTO aluno(`Nome`, `Email`, `Senha`, `DataNasc`, `Foto`, `Pontuacao`, `PerfilDeAcesso`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [Nome, Email, Senha, DataNasc, buffer, Pontuacao, PerfilDeAcesso];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};




