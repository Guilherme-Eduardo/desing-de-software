// src/Controller/SistemaController.js
import ServicoEspaco from "../services/ServicoEspaco.js";
import ServicoReserva from "../services/ServicoReserva.js";
import ServicoPagamento from "../services/ServicoPagamento.js";
import ServicoCliente from "../services/ServicoCliente.js";
import ServicoProprietario from "../services/ServicoProprietario.js";

const servicoReserva = new ServicoReserva();
const servicoEspaco = new ServicoEspaco();
const servicoPagamento = new ServicoPagamento();
const servicoCliente = new ServicoCliente();
const servicoProprietario = new ServicoProprietario();


/* Retorna uma lista de reservas realizadas */
export async function listarReservas(req, res, next) {
  try {
    const reservas = await servicoReserva.listarReservas();
    res.json(reservas);
  } catch (error) {
    console.log("Erro ao retornar reservas => [GET /reservas]", error);
    next(error);
  }
}


/* Cria uma nova reserva no sistema */
export async function criarReserva(req, res, next) {
  try {
    const novaReserva = await servicoReserva.criarReserva(req.body);
    res.status(201).json(novaReserva);
  } catch (error) {
    next(error);
  }
}

/* Atualiza uma determinada reserva do sistema */
export async function atualizarReserva(req, res, next) {
  try {
    const { id } = req.params;
    const reservaAtualizada = await servicoReserva.atualizarReserva(id, req.body);

    if (!reservaAtualizada) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.json(reservaAtualizada);
  } catch (error) {
    next(error);
  }
}

/* Remove do sistema uma determinada reserva */
export async function removerReserva(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await servicoReserva.removerReserva(id);

    if (!deleted) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}



/* Retorna todos os espaços cadastrados */
export async function listarEspacos(req, res, next) {
  try {
    const espacos = await servicoEspaco.listarEspacos();
    res.json(espacos);
  } catch (error) {
    next(error);
  }
}


/* Insere um novo espaço no sistema */
export async function criarEspaco(req, res, next) {
  try {
    const novoEspaco = await servicoEspaco.criarEspaco(req.body);
    res.status(201).json(novoEspaco);
  } catch (error) {
    next(error);
  }
}


/* Atualiza as informações de um determinado espaço */
export async function atualizarEspaco(req, res, next) {
  try {
    const { id } = req.params;
    const espacoAtualizado = await servicoEspaco.atualizarEspaco(id, req.body);

    if (!espacoAtualizado) {
      return res.status(404).json({ erro: "Espaço não encontrado" });
    }

    res.json(espacoAtualizado);
  } catch (error) {
    next(error);
  }
}


/* Remove um espaço */
export async function removerEspaco(req, res, next) {
  try {
    const { id } = req.params;
    const removed = await servicoEspaco.removerEspaco(id);

    if (!removed) {
      return res.status(404).json({ erro: "Espaço não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/* Retorna uma lista de pagamentos */
export async function listarPagamentos(req, res, next) {
  try {
    const pagamentos = await servicoPagamento.listarPagamentos();
    res.json(pagamentos);
  } catch (err) {
    next(err);
  }
}

/* Registra um pagamento no sistema */
export async function criarPagamento(req, res, next) {
  try {
    const pagamento = await servicoPagamento.registrarPagamento(req.body);
    res.status(201).json(pagamento);
  } catch (err) {
    next(err);
  }
}


/* Atualiza um pagamento */
export async function atualizarPagamento(req, res, next) {
  try {
    const { id } = req.params;
    const pagamentoAtualizado = await servicoPagamento.atualizarPagamento(
      id,
      req.body
    );

    if (!pagamentoAtualizado) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    res.json(pagamentoAtualizado);
  } catch (err) {
    next(err);
  }
}


/* Remove um pagamento */
export async function removerPagamento(req, res, next) {
  try {
    const { id } = req.params;
    const removido = await servicoPagamento.removerPagamento(id);

    if (!removido) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}


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
  try {
    const cliente = await servicoCliente.criaCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
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

/* Lista todos os proprietários */
export async function listarProprietarios(req, res, next) {
  try {
    const proprietarios = await servicoProprietario.listarProprietarios();
    res.json(proprietarios);
  } catch (err) {
    next(err);
  }
}

/* Busca um proprietário pelo id */
export async function obterProprietario(req, res, next) {
  try {
    const { id } = req.params;
    const proprietario = await servicoProprietario.buscarProprietario(id);
    res.json(proprietario);
  } catch (err) {
    next(err);
  }
}

/* Cria um novo proprietário */
export async function criarProprietario(req, res, next) {
  try {
    const proprietarioCriado = await servicoProprietario.criarProprietario(
      req.body
    );
    res.status(201).json(proprietarioCriado);
  } catch (err) {
    next(err);
  }
}

/* Atualiza um proprietário existente */
export async function atualizarProprietario(req, res, next) {
  try {
    const { id } = req.params;
    const proprietarioAtualizado =
      await servicoProprietario.atualizarProprietario(id, req.body);

    res.json(proprietarioAtualizado);
  } catch (err) {
    next(err);
  }
}

/* Remove um proprietário */
export async function removerProprietario(req, res, next) {
  try {
    const { id } = req.params;
    await servicoProprietario.removerProprietario(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
