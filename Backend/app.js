import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; // Importa a função fileURLToPath

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Obtém o diretório atual

import alunoRoutes from "./routes/alunos.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use("/", alunoRoutes);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
