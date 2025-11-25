import RepositorioReserva from "../repositories/RepositorioReserva.js";
import Reserva from "../entities/Reserva.js";
import { StatusReserva } from "../entities/StatusReserva.js";

export default class ServicoReserva {
  constructor() {
    this.repositorio = new RepositorioReserva();
  }

  async listarReservas() {
    return this.repositorio.getReservas(); // ajuste o nome se for diferente
  }

  async criarReserva(dados) {
    // aqui você adapta aos campos reais da sua Reserva
    const { id, data, espacoId, clienteId, status } = dados;

    const reserva = new Reserva(
      id,
      data,
      espacoId,
      clienteId,
      status ?? StatusReserva.PENDENTE
    );

    await this.repositorio.inserirReserva(reserva);

    return reserva;
  }

  async atualizarReserva(id, dadosAtualizados) {
    const reservaExistente = await this.repositorio.buscarPorId(id);
    if (!reservaExistente) {
      return null;
    }

    // atualiza só o que chegou
    if (dadosAtualizados.data !== undefined) {
      reservaExistente.setData(dadosAtualizados.data);
    }

    if (dadosAtualizados.status !== undefined) {
      reservaExistente.setStatus(dadosAtualizados.status);
    }

    await this.repositorio.atualizarReserva(reservaExistente);
    return reservaExistente;
  }

  async removerReserva(id) {
    // repositório retorna true/false
    return this.repositorio.deleteReserva(id);
  }

  async cancelarReserva(id) {
    const reserva = await this.repositorio.buscarPorId(id);
    if (!reserva) return null;

    reserva.setStatus(StatusReserva.CANCELADA);
    await this.repositorio.atualizarReserva(reserva);
    return reserva;
  }

  verificarStatus(reserva) {
    return reserva.getStatus();
  }
}

