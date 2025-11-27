import RepositorioReserva from "../repositories/RepositorioReserva.js";
import Reserva from "../entities/Reserva.js";
import { StatusReserva } from "../entities/StatusReserva.js";

export default class ServicoReserva {
  constructor() {
    this.repositorio = new RepositorioReserva();
    this.countID = 0;
  }

  async listarReservas() {
    return this.repositorio.listarReservas(); // ajuste o nome se for diferente
  }

  async criarReserva(dados) {
    // aqui você adapta aos campos reais da sua Reserva
    const { data_inicio, data_fim, espaco, cliente, status } = dados;

    const reserva = new Reserva(
      this.countID,
      data_inicio,
      data_fim,
      espaco,
      cliente,
      status ?? StatusReserva.PENDENTE
    );

    // if (this.repositorio.buscarReserva(reserva)) {
    //   console.log("Reserva já cadastrada");
    //   return null;
    // }

    this.countID++;

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
    return this.repositorio.deletarReserva(id);
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

