import Pagamento from "entities/Pagamento.js";
import RepositorioPagamento from "repositories/RepositorioPagamento";
import { StatusPagamento } from "../entities/StatusPagamento";

export default class ServicoPagamento {

    constructor() {
        this.repositorio = new RepositorioPagamento();
    }

    async criarPagamento (total) {

    const novoId = await this.repositorio.proximoId();

    const pagamento = new Pagamento(novoId, total);

    await this.repositorio.insertPagamento(pagamento);

    return pagamento;
    }

    removerPagamento (id) {

        return this.repositorio.deletePagamento(id);

    }

    async estornarPagamento(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;

        pagamento.setStatus(StatusPagamento.ESTORNADO);
        await this.repositorio.updatePagamento(pagamento);
        return pagamento;
    }

    async processarPagamento(id, valorPago) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
        return null;
        }

        const total = pagamento.getTotal();
        const pagoAtual = pagamento.getPago();
        const restante = total - pagoAtual;

        const novoPago = pagoAtual + valorPago;
        pagamento.setPago(novoPago);

        // Regra que você já tinha:
        if (valorPago === restante) {
        pagamento.setStatus(StatusPagamento.APROVADO);
        } else {
        pagamento.setStatus(StatusPagamento.SINAL);
        }

        await this.repositorio.updatePagamento(pagamento);
        return pagamento;
    }


    async recusarPagamento(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
        return null;
        }

        pagamento.setStatus(StatusPagamento.RECUSADO);
        await this.repositorio.updatePagamento(pagamento);
        return pagamento;
    }

    async verificarStatus(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;
            return pagamento.getStatus();
         

        }
    buscarPagamento (pagamento) {
        return this.repositorio.findPagamento(pagamento);
    }
}

