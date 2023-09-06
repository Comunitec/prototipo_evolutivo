const router = require("express").Router();
const User = require("../Models/User");

// Criação de usuários

//rotas da api
router.post("/", async (req, res) => {
  //req.body
  const { name, email, password, preferences, ranking, points } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório" });
    return;
  }

  const user = {
    name,
    email,
    password,
    preferences,
    ranking,
    points,
  };

  try {
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

// Atualziação de dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, password, preferences, ranking, points } = req.body;

  const user = {
    name,
    email,
    password,
    preferences,
    ranking,
    points,
  };

  try {
    const UpdatedUser = await User.updateOne({ _id: id }, user);

    if (UpdatedUser.matchedCount === 0) {
      res.status(404).json({ message: "usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
