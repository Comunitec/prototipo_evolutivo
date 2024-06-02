import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import alunoRoutes from "./routes/alunos.js";
import cursoRoutes from "./routes/cursos.js";
import tagRoutes from "./routes/tags.js"
import alunoCursoRoutes from './routes/alunoscurso.js'
import aulaRoutes from './routes/aulas.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware do CORS
app.use(cors());

// Middlewares de parsing do body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'static')));

// Rotas
app.use("/", alunoRoutes);
app.use("/", cursoRoutes);
app.use("/", tagRoutes);
app.use("/", alunoCursoRoutes);
app.use("/", aulaRoutes)

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
