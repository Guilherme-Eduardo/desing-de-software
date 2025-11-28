// src/Controller/SistemaController.js
import ServicoCliente from "../services/ServicoCliente.js";

const servicoCliente = new ServicoCliente();

/* Retorna uma lista com todos os clientes */
export async function listarClientes(req, res, next) {
  try {
    const clientes = await servicoCliente.listarClientes();
    res.json(clientes);
  } catch (error) {
    next(error);
  }
}

/* Retorna um cliente pelo ID */
export async function obterCliente(req, res, next) {
  try {
    const { id } = req.params;
    const cliente = await servicoCliente.obterClientePorId(id);
    res.json(cliente);
  } catch (error) {
    next(error);
  }
}


/* Cria um novo cliente */
export async function criarCliente(req, res, next) {
  console.log("POST /clientes recebido — body:", req.body);
  try {
    const cliente = await servicoCliente.criaCliente(req.body);
    console.log("Cliente criado com sucesso:", cliente);
    res.status(201).json(cliente);
  } catch (error) {
    console.error("Erro em criarCliente controller:", error);
    next(error);
  }
}



/* Atualiza cliente */
export async function atualizarCliente(req, res, next) {
  try {
    const { id } = req.params;
    const cliente = await servicoCliente.atualizaCliente(id, req.body);
    res.json(cliente);
  } catch (error) {
    next(error);
  }
}


/* Deleta um cliente */
export async function removerCliente(req, res, next) {
  try {
    const { id } = req.params;
    await servicoCliente.removeCliente(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
