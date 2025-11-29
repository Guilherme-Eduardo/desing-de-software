import express from "express";
import upload from "../config/upload.js";

import * as ControleCliente from "../controller/ControleCliente.js";
import * as ControleEndereco from "../controller/ControleEndereco.js";
import * as ControleEspaco from "../controller/ControleEspaco.js";
import * as ControlePagamento from "../controller/ControlePagamento.js";
import * as ControleProprietário from "../controller/ControleProprietário.js";
import * as ControleReserva from "../controller/ControleReserva.js";
import * as ControleFilial from "../controller/ControleFilial.js"

const router = express.Router();

/* Rotas destinadas a Reserva */ 
router.get("/reservas", ControleReserva.listarReservas);
router.post("/reservas", ControleReserva.criarReserva);
router.patch("/reservas/:id", ControleReserva.atualizarReserva);
router.delete("/reservas/:id", ControleReserva.removerReserva);


/* Rotas destinadas ao Espaço*/
router.get("/espacos", ControleEspaco.listarEspacos);
router.post("/espacos", upload.single("imagem"), ControleEspaco.criarEspaco);
router.patch("/espacos/:id", upload.single("imagem"), ControleEspaco.atualizarEspaco);
router.delete("/espacos/:id", ControleEspaco.removerEspaco);


/* Rotas destinadas aos Pagamentos */
router.get("/pagamentos", ControlePagamento.listarPagamentos);
router.post("/pagamentos", ControlePagamento.criarPagamento);
router.patch("/pagamentos/:id", ControlePagamento.atualizarPagamento);
router.delete("/pagamentos/:id", ControlePagamento.removerPagamento);


/* Rotas destinadas ao Clientes */
router.get("/clientes", ControleCliente.listarClientes);
router.post("/clientes", ControleCliente.criarCliente);
router.patch("/clientes/:id", ControleCliente.atualizarCliente);
router.delete("/clientes/:id", ControleCliente.removerCliente);


/* Rotas destinadas a filiais */
router.get("/filiais", ControleFilial.listarFiliais);
router.post("/filiais", ControleFilial.criarFilial);
router.patch("/filiais/:id", ControleFilial.atualizarFilial);
router.delete("/filiais/:id", ControleFilial.removerFilial);


/* Rotas destinadas ao Proprietario*/
router.get("/proprietarios", ControleProprietário.listarProprietarios);
router.get("/proprietarios/:id", ControleProprietário.obterProprietario);
router.post("/proprietarios", ControleProprietário.criarProprietario);
router.delete("/proprietarios/:id", ControleProprietário.removerProprietario);

/* Rotas destinadas ao endereço */
router.post("/enderecos", ControleEndereco.criarEndereco);
router.get("/enderecos", ControleEndereco.listarEnderecos);
router.delete("/enderecos/:id", ControleEndereco.removerEndereco);
router.patch("/enderecos/:id", ControleEndereco.atualizarEndereco);

export default router;
