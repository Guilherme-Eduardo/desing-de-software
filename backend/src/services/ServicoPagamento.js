import Pagamento from "../entities/Pagamento.js";
import RepositorioPagamento from "../repositories/RepositorioPagamento.js";
import { StatusPagamento } from "../entities/StatusPagamento.js";

export default class ServicoPagamento {

    constructor() {
        this.repositorio = new RepositorioPagamento();
        this.count_id = 0;
    }

    async criarPagamento (total) {

        const novoId = this.count_id;
        this.count_id++;

        const pagamento = new Pagamento(novoId, total);

        await this.repositorio.inserirPagamento(pagamento);

        return pagamento;
    }

    removerPagamento (id) {

        return this.repositorio.deletarPagamento(id);

    }

    async estornarPagamento(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;

        pagamento.setStatus(StatusPagamento.ESTORNADO);
        await this.repositorio.atualizarPagamento(pagamento);
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

        await this.repositorio.atualizarPagamento(pagamento);
        return pagamento;
    }


    async recusarPagamento(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
        return null;
        }

        pagamento.setStatus(StatusPagamento.RECUSADO);
        await this.repositorio.atualizarPagamento(pagamento);
        return pagamento;
    }

    async verificarStatus(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;
            return pagamento.getStatus();
         

    }
}

