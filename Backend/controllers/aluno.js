import { db } from "../db.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jsonwebtoken from 'jsonwebtoken';

//Get de todos os alunos
export const getAlunos = (_, res) => {
  const q = "SELECT * FROM aluno";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
//Get de todos os alunos ranking
export const getAlunosRanking = (_, res) => {
  const q = `
    SELECT idAluno, Nome, Pontuacao,
           RANK() OVER (ORDER BY Pontuacao DESC) AS position
    FROM aluno
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const deleteAluno = (req, res) => {
  const id = req.params.id;

  const qSelect = "SELECT Foto FROM aluno WHERE idAluno = ?";
  const qDelete = "DELETE FROM aluno WHERE idAluno = ?";

  db.query(qSelect, [id], (err, result) => {
    if (err) {
      console.error("Erro ao selecionar imagem do aluno:", err);
      return res.sendStatus(500);
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const imagePath = result[0].Foto.toString();
    const imageAbsPath = path.join(process.cwd(), imagePath);

    console.log("Caminho absoluto da imagem:", imageAbsPath);

    fs.unlink(imageAbsPath, (err) => {
      if (err) {
        console.error("Erro ao excluir imagem do aluno:", err);
        return res.sendStatus(500);
      }

      db.query(qDelete, [id], (err) => {
        if (err) {
          console.error("Erro ao excluir aluno do banco de dados:", err);
          return res.sendStatus(500);
        }

        return res.status(200).json({ message: "Usuário e imagem deletados com sucesso." });
      });
    });
  });
};

//Adicionar alunos
export const addAluno = (req, res) => {
  const { Nome, Email, Senha, DataNasc, Pontuacao, PerfilDeAcesso } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Foto não enviada" });
  }

  const filename = req.file.filename;
  const filepath = path.join('/static/images/alunos', filename);


  const q = "INSERT INTO aluno(`Nome`, `Email`, `Senha`, `DataNasc`, `Foto`, `Pontuacao`, `PerfilDeAcesso`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [Nome, Email, Senha, DataNasc, filepath, Pontuacao, PerfilDeAcesso];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");

  });
};

// Rota privada
export const rotaPrivada = (req, res) => {
  const id = req.params.id;
  const q = "SELECT idAluno, Nome, Email, DataNasc, PerfilDeAcesso, Pontuacao FROM aluno WHERE idAluno = ?";

  // check if user exists
  db.query(q, [id], (err, results) => {
    if (err) {
      res.status(500).json({ msg: 'Erro interno' });
    } else if (results.length === 0) {
      res.status(401).json({ msg: 'Usuário não encontrado' });
    } else {
      const user = results[0];
      return res.status(200).json({ msg: "usuario existe!" , user });
    }
  });
};


export const checkToken=  (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    jsonwebtoken.verify(token, "seu_segredo");
    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

// Login
export const authLogin = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM aluno WHERE email = ?";

  //validações
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // Verificar se o usuário existe no banco de dados
  db.query(q, [email], (err, results) => {
    if (err) {
      res.status(500).json({ msg: 'Erro interno' });
    } else if (results.length === 0) {
      res.status(401).json({ msg: 'Usuário não encontrado' });
    } else {
      const user = results[0];
      // Verificar se a senha está correta
      if (user.Senha === password) {
        // Gerar token JWT
        const token = jsonwebtoken.sign({ email: user.Email }, 'seu_segredo');
        const idAluno = user.idAluno;

        res.status(200).json({ msg: "Autenticação realizada com sucesso!" , token, idAluno});
      } else {
        res.status(401).json({ msg: 'Senha incorreta' });
      }
    }
  });

}



// Recuperar imagem de aluno
export const getImagemAluno = (req, res) => {
  const id = req.params.id; // ID do aluno
  const q = "SELECT Foto FROM aluno WHERE idAluno = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    
    const imagePath = result[0].Foto.toString(); // Converter para string
    const imageAbsPath = path.join(process.cwd(), imagePath); // Caminho absoluto da imagem usando process.cwd()

    console.log("Caminho absoluto da imagem:", imageAbsPath);

    // Lê o arquivo de imagem do disco
    fs.readFile(imageAbsPath, (err, data) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // Envia a imagem como resposta
      console.log("Imagem lida com sucesso.");
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data);
    });
  });
};


// Get informações do aluno por ID
export const getAlunoPorId = (req, res) => {
  const id = req.params.id; // Supondo que o ID seja passado como um parâmetro na URL
  
  const q = "SELECT * FROM aluno WHERE idAluno = ?"; // Ajuste conforme o nome da sua tabela de alunos e o campo de nome
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    return res.status(200).json(data[0]);
  });
};

// Get informações do aluno por ID atualizar dados aluno
export const updateAluno = (req, res) => {
  const id = req.params.id;
  const { Nome, Email, DataNasc } = req.body;

  // Log para imprimir o valor da data de nascimento
  console.log("Data de nascimento recebida:", DataNasc);

  const q = "UPDATE aluno SET Nome = ?, Email = ?, DataNasc = ? WHERE idAluno = ?";
  
  db.query(q, [Nome, Email, DataNasc, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar aluno:", err);
      return res.sendStatus(500);
    }

    console.log("Resultado da atualização:", result);
    return res.status(200).json({ message: "Aluno atualizado com sucesso." });
  });
};

// Rota para recuperar a senha atual do aluno por ID
export const getSenhaAtual = (req, res) => {
  const id = req.params.id; // ID do aluno
  const q = "SELECT Senha FROM aluno WHERE idAluno = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    
    const senhaAtual = result[0].Senha;

    // Retorna a senha atual como resposta
    return res.status(200).json({ senhaAtual });
  });
};

export const atualizarSenha = (req, res) => {
  const id = req.params.id;
  const novaSenha = req.body.novaSenha; // A nova senha enviada pelo front-end

  const q = "UPDATE aluno SET Senha = ? WHERE idAluno = ?";
  
  db.query(q, [novaSenha, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar senha:", err);
      return res.sendStatus(500);
    }

    console.log("Senha atualizada com sucesso:", result);
    return res.status(200).json({ message: "Senha atualizada com sucesso." });
  });
};