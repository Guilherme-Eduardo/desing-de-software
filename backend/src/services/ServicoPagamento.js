import Pagamento from "../entities/Pagamento.js";
import RepositorioPagamento from "../repositories/RepositorioPagamento.js";
import { StatusPagamento } from "../entities/StatusPagamento.js";

export default class ServicoPagamento {

    constructor() {
        this.repositorio = new RepositorioPagamento();
        this.count_id = 0;
    }

    async criarPagamento(total) {

        const novoId = this.count_id;
        this.count_id++;

        const pagamento = new Pagamento(novoId, total);
        console.log("TEstes", pagamento);
        await this.repositorio.inserirPagamento(pagamento);

        return pagamento;
    }

    removerPagamento(id) {

        return this.repositorio.deletarPagamento(id);

    }

    async estornarPagamento(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;

        pagamento.setStatus(StatusPagamento.ESTORNADO);
        await this.repositorio.atualizarPagamento(pagamento);
        return pagamento;
    }

    // ServicoPagamento.js
    async processarPagamento(id, valorPago) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
            return null;
        }

        const valor = Number(valorPago);

        // Valor inválido: não altera nada
        if (Number.isNaN(valor) || valor <= 0) {
            return pagamento; // devolve como está
        }

        const total = pagamento.getTotal();
        const pagoAtual = pagamento.getPago();

        let novoPago = pagoAtual + valor;
        if (novoPago > total) {
            novoPago = total;
        }

        pagamento.setPago(novoPago);

        if (novoPago >= total) {
            pagamento.setStatus(StatusPagamento.APROVADO);
        } else if (novoPago > 0) {
            pagamento.setStatus(StatusPagamento.SINAL);
        } else {
            pagamento.setStatus(StatusPagamento.PENDENTE);
        }

        await this.repositorio.atualizarPagamento(pagamento);

        // AGORA: retorna o pagamento inteiro atualizado
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

