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

  async listarReservas() {
    return this.repositorio.listarReservas();
  }

  async criarReserva(dados, total) {

    const { inicio, fim, espacoId, clienteId } = dados;

    const pagamento = await this.servicoPagamento.criarPagamento(total);

    const reserva = new Reserva(
      Number(this.repositorio.proxID()),
      inicio,
      fim,
      espacoId,
      clienteId,
      StatusReserva.PENDENTE,
      {
        id: pagamento.id,
        valor_pago: pagamento.getPago(),   // 0
        status: pagamento.getStatus(),    // "pendente"
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

  async atualizarReserva(id, dadosAtualizados) {
    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);
    if (!existente) {
      return null;
    }
    
    const obj = Reserva.fromObject(id, existente);
    console.log (obj);

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

async verificarDisponibilidade(espacoId, inicio, fim) {

  const dataInicio = new Date(inicio);
  const dataFim = new Date(fim);

  const reservas = await this.repositorio.lerJSON();

  // Sem reservas
  if (reservas.length === 0) {
    return true;
  }

  // Filtra reservas do espaço
  const lista = reservas.filter(r => String(r.espaco) === String(espacoId));

  if (lista.length === 0) {
    return true;
  }

  for (const item of lista) {
    const itemInicio = new Date(item.inicio);
    const itemFim = new Date(item.fim);

    // Verificar se datas foram convertidas corretamente
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





  // ServicoReserva.js
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

    // AQUI: pegar o id do pagamento dentro da reserva
    const pagamentoID = reserva.pagamento.id;

    console.log("PAGAMENTOID: ", pagamentoID);

    if (pagamentoID == -1) {
      return {
        erro: "Pagamento associado à reserva não encontrado.",
        statusCode: 500,
      };
    }

    // processarPagamento agora devolve o pagamento inteiro
    const pagamento = await this.servicoPagamento.processarPagamento(
      pagamentoID,
      valorPago
    );

    console.log("PAGAMENTO: ", pagamento);

    if (!pagamento) {
      return {
        erro: "Pagamento não encontrado.",
        statusCode: 404,
      };
    }

    const statusPagamento = pagamento.getStatus();
    const valorPagoAtual = pagamento.getPago();

    // SINCRONIZA o resumo de pagamento dentro da reserva
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

    // usa o método que você JÁ tem para atualizar a reserva
    await this.repositorio.atualizarReserva(reserva);

    return {
      reservaId,
      statusPagamento,
      statusReserva: novoStatusReserva,
      pagamento: reserva.pagamento,
    };
  }

}