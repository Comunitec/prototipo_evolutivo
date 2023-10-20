// Coniguração inicial
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:4200", // Substitua pelo seu domínio Angular
};

app.use(cors(corsOptions));

// forma de ler Json / middlewares
app.use(
  express.urlencoded({
    extended: true, // permite que o formulário tenha mais campos do que os definidos no model
  })
);

app.use(express.json());

// rotas da api
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

// Rota inicial / endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi Express!" });
});

//entregar uma porta
mongoose
  .connect(
    "mongodb+srv://root:root@comunitec.8vdgzn2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080);
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => console.log(err));
