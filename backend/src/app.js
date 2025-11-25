import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";

import SistemaController from "./controller/SistemaController"
import sistemaRoutes from "./routes/sistemaRoutes.js";

const app = express();
app.use(express.json());

const doc = yaml.load(fs.readFileSync('/openapi.yaml', 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));


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