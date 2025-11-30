import RepositorioReserva from "../repositories/RepositorioReserva.js";
import Reserva from "../entities/Reserva.js";
import { StatusReserva } from "../entities/StatusReserva.js";
import ServicoPagamento from "./ServicoPagamento.js";
import { StatusPagamento } from "../entities/StatusPagamento.js";


export default class ServicoReserva {
  constructor() {
    this.repositorio = new RepositorioReserva();
    this.servicoPagamento = new ServicoPagamento();
  }

  // Retona uma lista das reservas cadastradas.
  async listarReservas() {
    return this.repositorio.listarReservas();
  }

  // Cria uma reserva com DADOS de preço TOTAL.
  async criarReserva(dados, total) {

    const { inicio, fim, espacoId, clienteId } = dados;
    const id = await this.repositorio.proxID();
    const pagamento = await this.servicoPagamento.criarPagamento(total);

    const reserva = new Reserva(
      id,
      inicio,
      fim,
      espacoId,
      clienteId,
      StatusReserva.PENDENTE,
      {
        id: pagamento.id,
        valor_pago: pagamento.getPago(),
        status: pagamento.getStatus(),
      }
    );

    if (await this.repositorio.buscarReserva(reserva)) {
      console.log("Reserva já cadastrada");
      return null;
    }

    this.countID++;

    await this.repositorio.inserirReserva(reserva);

    return reserva;
  }

  // Atualiza os dados de uma reserva apartir do seu ID
  async atualizarReserva(id, dadosAtualizados) {
    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);
    if (!existente) {
      return null;
    }

    const obj = Reserva.fromObject(id, existente);
    console.log(obj);

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


  // Remove uma reserva cadastrada
  async removerReserva(id) {
    return this.repositorio.deletarReserva(id);
  }

  // Verfica se o espaço está disponível para ser reservado
  async verificarDisponibilidade(espacoId, inicio, fim) {

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);

    const reservas = await this.repositorio.lerJSON();

    if (reservas.length === 0) {
      return true;
    }

    const lista = reservas.filter(r => String(r.espaco) === String(espacoId));

    if (lista.length === 0) {
      return true;
    }

    for (const item of lista) {
      const itemInicio = new Date(item.inicio);
      const itemFim = new Date(item.fim);

      if (isNaN(itemInicio) || isNaN(itemFim)) {
        continue;
      }

      const colisao = (dataInicio < itemFim) && (itemInicio < dataFim);

      if (colisao) {
        return false;
      }
    }

    return true;
  }

  // Realiza o pagamnto da reserva
  async pagarReserva(reservaId, valorPago) {
    reservaId = Number(reservaId);

    const reserva = await this.repositorio.buscarPorId(reservaId);
    if (!reserva) {
      return {
        erro: "Reserva não encontrada.",
        statusCode: 404,
      };
    }

    if (reserva.status === StatusReserva.CONFIRMADO) {
      return {
        erro: "Reserva não está em um estado válido para pagamento.",
        statusCode: 422,
      };
    }

    const pagamentoID = reserva.pagamento.id;

    console.log("PAGAMENTOID: ", pagamentoID);

    if (pagamentoID == -1) {
      return {
        erro: "Pagamento associado à reserva não encontrado.",
        statusCode: 500,
      };
    }

    const pagamento = await this.servicoPagamento.processarPagamento(
      pagamentoID,
      valorPago
    );

    if (!pagamento) {
      return {
        erro: "Pagamento não encontrado.",
        statusCode: 404,
      };
    }

    const statusPagamento = pagamento.getStatus();
    const valorPagoAtual = pagamento.getPago();

    reserva.pagamento = {
      id: pagamentoID,
      valor_pago: valorPagoAtual,
      status: statusPagamento,
    };

    let novoStatusReserva = reserva.status;

    if (statusPagamento === StatusPagamento.PENDENTE) {
      novoStatusReserva = StatusReserva.PENDENTE;
    } else if (statusPagamento === StatusPagamento.SINAL) {
      novoStatusReserva = StatusReserva.RESERVADO;
    } else if (statusPagamento === StatusPagamento.APROVADO) {
      novoStatusReserva = StatusReserva.CONFIRMADO;
    }

    reserva.status = novoStatusReserva;

    await this.repositorio.atualizarReserva(reserva);

    return {
      reservaId,
      statusPagamento,
      statusReserva: novoStatusReserva,
      pagamento: reserva.pagamento,
    };
  }
}