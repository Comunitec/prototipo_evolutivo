import express from "express"
import alunoRoutes from "./routes/alunos.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", alunoRoutes)

app.listen(8800)