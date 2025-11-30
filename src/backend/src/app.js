import express from "express";
import fs from "fs";
import yaml from "js-yaml";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sistemaRoutes from "./routes/sistemaRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

yaml.load(fs.readFileSync('openapi.yaml', 'utf-8'));
const doc = yaml.load(fs.readFileSync('./openapi.yaml', 'utf-8'));



app.use("/uploads", express.static(path.resolve(__dirname, "tmp", "uploads")));
app.use("/", sistemaRoutes);


/* Tratamento de erros */
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  res.status(status).json({
    erro: err.message || "Erro interno no servidor"
  });
});


export default app;