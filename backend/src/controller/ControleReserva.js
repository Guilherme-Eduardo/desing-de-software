// src/Controller/SistemaController.js
import ServicoReserva from "../services/ServicoReserva.js";
import ServicoCliente from "../services/ServicoCliente.js";
import ServicoEspaco from "../services/ServicoEspaco.js";

const servicoReserva = new ServicoReserva();
const servicoEspaco = new ServicoEspaco();
const servicoCliente = new ServicoCliente();

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
    const { inicio, fim, espacoID, clienteID } = req.body;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.espacoID) req.body.espacoID = Number(req.body.espacoID);
    if (req.body.clienteID) req.body.clienteID = Number(req.body.clienteID);

    // Verificar se cliente existe
    const existeCliente = servicoCliente.verificaValidade(Number(clienteID));
    if (!existeCliente)
      return res.status(404).json({ erro: "Cliente não encontrado" });

    // Verificar se espaço existe
    const existeEspaco = servicoEspaco.verificaValidade(Number(espacoID));
    if (!existeEspaco)
      return res.status(404).json({ erro: "Espaço não encontrado" });

    const total = await servicoEspaco.getTotal(Number(espacoID));

    // Verificar disponibilidade
    const disponivel = servicoReserva.verificaDisponibilidade(
      Number(espacoID),
      inicio,
      fim
    );

    if (!disponivel)
      return res.status(404).json({ erro: "Não há disponibilidade" });

    const novaReserva = await servicoReserva.criarReserva(req.body, total);
    res.status(201).json(novaReserva);
  } catch (error) {
    next(error);
  }
}

/* Atualiza uma determinada reserva do sistema */
export async function atualizarReserva(req, res, next) {
  try {
    const { id } = req.params;
    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.espacoID) req.body.espacoID = Number(req.body.espacoID);
    if (req.body.clienteID) req.body.clienteID = Number(req.body.clienteID);

    const reservaAtualizada = await servicoReserva.atualizarReserva(
      Number(id),
      req.body
    );

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

    const deleted = await servicoReserva.removerReserva(Number(id));

    if (!deleted) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
