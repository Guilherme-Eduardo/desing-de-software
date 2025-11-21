import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Controllers (depois você cria os arquivos)
import reservaController from "./controllers/reservaController.js";
// import clienteController from "./controllers/clienteController.js";
// import espacoController from "./controllers/espacoController.js";
// import pagamentoController from "./controllers/pagamentoController.js";

const app = express();
app.use(express.json());

// Config Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Seu Cantinho API",
      version: "1.0.0"
    }
  },
  apis: ["./src/controllers/*.js"]
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use("/reservas", reservaController);
// app.use("/clientes", clienteController);
// app.use("/espacos", espacoController);
// app.use("/pagamentos", pagamentoController);

// Tratamento básico de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ erro: err.message });
});

export default app;