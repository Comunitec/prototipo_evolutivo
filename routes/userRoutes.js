const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

// Criação de usuários

//rotas da api
// router.post("/", async (req, res) => {
//   //req.body
//   const { name, email, password, preferences, ranking, points } = req.body;

//   if (!name) {
//     res.status(422).json({ error: "O nome é obrigatório" });
//     return;
//   }

//   const user = {
//     name,
//     email,
//     password,
//     preferences,
//     ranking,
//     points,
//   };

//   try {
//     await User.create(user);
//     res.status(201).json({ message: "Usuário criado com sucesso" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });
// Rota de criação de usuário
router.post("/", async (req, res) => {
  const { name, email, password, preferences, ranking, points } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "Nome, email e senha são obrigatórios" });
    return;
  }

  try {
    // Hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword, // Salvar a senha hashada no banco de dados
      preferences,
      ranking,
      points,
    };

    await User.create(user);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Leitura de dados - mostrar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Buscar usuário por id
router.get("/:id", async (req, res) => {
  // extrair o dado da requisição pela url, req.params
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).json({ message: "usuário não encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    error: error;
  }
});

// Rota de atualização de usuário
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, password, preferences, ranking, points } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "Nome, email e senha são obrigatórios" });
    return;
  }

  try {
    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      name,
      email,
      password: hashedPassword, // Atualizar a senha hashada no banco de dados
      preferences,
      ranking,
      points,
    };

    const result = await User.updateOne({ _id: id }, updatedUser);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Dados do request recebidos:");
  console.log("Email:", email);
  console.log("Senha:", password);

  if (!email || !password) {
    res.status(422).json({ error: "Email e senha são obrigatórios" });
    return;
  }

  // Criar um objeto user com os dados de login
  const user = {
    email: email,
    password: password,
  };

  try {
    // Use o objeto user para acessar os campos
    const userFromDB = await User.findOne({ email: user.email });

    if (!userFromDB) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      userFromDB.password
    );

    if (passwordMatch) {
      res.status(200).json({ message: "Login bem-sucedido" });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
