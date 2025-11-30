import RepositorioReserva from "../repositories/RepositorioReserva.js";
import Reserva from "../entities/Reserva.js";
import { StatusReserva } from "../entities/StatusReserva.js";
import ServicoPagamento from "./ServicoPagamento.js";


export default class ServicoReserva {
  constructor() {
    this.repositorio = new RepositorioReserva();
    this.servicoPagamento = new ServicoPagamento();
    this.countID = 0;
  }

  async listarReservas() {
    return this.repositorio.listarReservas();
  }

  async criarReserva(dados, total) {

    const { inicio, fim, espacoId, clienteId } = dados;

    const pagamento = await this.servicoPagamento.criarPagamento(total);

    const reserva = new Reserva(
      Number(this.countID),
      inicio,
      fim,
      espacoId,
      clienteId,
      StatusReserva.PENDENTE,
      pagamento
    );

    if (await this.repositorio.buscarReserva(reserva)) {
      console.log("Reserva já cadastrada");
      return null;
    }

    this.countID++;

    await this.repositorio.inserirReserva(reserva);

    return reserva;
  }

  async atualizarReserva(id, dadosAtualizados) {
    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);
    if (!existente) {
      return null;
    }

    const obj = Reserva.fromObject(id, existente);

    if (dadosAtualizados.inicio !== undefined) {
      obj.setInicio(dadosAtualizados.inicio);
    }

    if (dadosAtualizados.fim !== undefined) {
      obj.setFim(dadosAtualizados.fim);
    }

    if (dadosAtualizados.espacoId !== undefined) {
      obj.setEspaco(Number(dadosAtualizados.espacoId));
    }

    if (dadosAtualizados.clienteId !== undefined) {
      obj.setCliente(Number(dadosAtualizados.clienteId));
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

  async verificaDisponibilidade(espacoId, inicio, fim) {
    return this.repositorio.verificaDisponibilidade(espacoId, inicio, fim);
  }
}

