import express from "express";
import * as SistemaController from "../Controller/SistemaController.js";

const router = express.Router();

/* Rotas destinadas a Reserva */ 
router.get("/reservas", SistemaController.listarReservas);
router.post("/reservas", SistemaController.criarReserva);
router.put("/reservas/:id", SistemaController.atualizarReserva);
router.delete("/reservas/:id", SistemaController.removerReserva);


/* Rotas destinadas ao Espaço*/
router.get("/espacos", SistemaController.listarEspacos);
router.post("/espacos", SistemaController.criarEspaco);
router.put("/espacos/:id", SistemaController.atualizarEspaco);
router.delete("/espacos/:id", SistemaController.removerEspaco);


/* Rotas destinadas aos Pagamentos */
router.get("/pagamentos", SistemaController.listarPagamentos);
router.post("/pagamentos", SistemaController.criarPagamento);
router.put("/pagamentos/:id", SistemaController.atualizarPagamento);
router.delete("/pagamentos/:id", SistemaController.removerPagamento);


/* Rotas destinadas ao Clientes */
router.get("/clientes", SistemaController.listarClientes);
router.get("/clientes/:id", SistemaController.obterCliente);
router.post("/clientes", SistemaController.criarCliente);
router.put("/clientes/:id", SistemaController.atualizarCliente);
router.delete("/clientes/:id", SistemaController.removerCliente);


/* Rotas destinadas ao Proprietario*/
router.get("/proprietarios", SistemaController.listarProprietarios);
router.get("/proprietarios/:id", SistemaController.obterProprietario);
router.post("/proprietarios", SistemaController.criarProprietario);
router.put("/proprietarios/:id", SistemaController.atualizarProprietario);
router.delete("/proprietarios/:id", SistemaController.removerProprietario);

export default router;
