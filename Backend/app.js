import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; // Importa a função fileURLToPath
import cors from "cors";
import alunoRoutes from "./routes/alunos.js";
import cursoRoutres from "./routes/cursos.js"


const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Obtém o diretório atual



const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use("/", alunoRoutes);
app.use("/", cursoRoutres)

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
