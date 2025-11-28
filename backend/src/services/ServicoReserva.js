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
    const { inicio, fim, espaco, cliente} = dados;

    const reserva = new Reserva(
      this.countID,
      inicio,
      fim,
      espaco,
      cliente,
      StatusReserva.PENDENTE
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
    const existente = await this.repositorio.buscarPorId(id);
    if (!existente) {
      return null;
    }

    const obj = Reserva.fromObject(id, existente);

    // atualiza só o que chegou
    if (dadosAtualizados.inicio !== undefined) {
      obj.setInicio(dadosAtualizados.inicio);
    }
    if (dadosAtualizados.fim !== undefined) {
      obj.setFim(dadosAtualizados.fim);
    }
    if (dadosAtualizados.espaco !== undefined) {
      obj.setEspaco(dadosAtualizados.espaco);
    }
    if (dadosAtualizados.cliente !== undefined) {
      obj.setCliente(dadosAtualizados.cliente);
    }
    if (dadosAtualizados.status !== undefined) {
      obj.setStatus(dadosAtualizados.status);
    }

    await this.repositorio.atualizarReserva(obj);
    
    return obj;
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

