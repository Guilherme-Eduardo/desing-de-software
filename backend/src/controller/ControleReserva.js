// src/Controller/SistemaController.js
import ServicoReserva from "../services/ServicoReserva.js";

const servicoReserva = new ServicoReserva();

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



