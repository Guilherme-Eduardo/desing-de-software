import Pagamento from "../entities/Pagamento.js";
import RepositorioPagamento from "../repositories/RepositorioPagamento.js";
import { StatusPagamento } from "../entities/StatusPagamento.js";

export default class ServicoPagamento {

    constructor() {
        this.repositorio = new RepositorioPagamento();
    }

    async criarPagamento(total) {

        const novoId = this.repositorio.proxID();
        this.count_id++;

        const pagamento = new Pagamento(novoId, total);
        console.log("TEstes", pagamento);
        await this.repositorio.inserirPagamento(pagamento);

        return pagamento;
    }

    removerPagamento(id) {

        return this.repositorio.deletarPagamento(id);

    }


    async processarPagamento(id, valorPago) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
            return null;
        }

        const valor = Number(valorPago);

        const pagamento_obj = new Pagamento (pagamento.id, pagamento.total, pagamento.valor_pago, pagamento.status);

        const total = pagamento_obj.getTotal();
        const pagoAtual = pagamento_obj.getPago();

        let novoPago = pagoAtual + valor;
        if (novoPago > total) {
            novoPago = total;
        }

        pagamento_obj.setPago(novoPago);

        
        if (novoPago >= total) {
            pagamento_obj.setStatus(StatusPagamento.APROVADO);
        } else if (novoPago > 0) {
            pagamento_obj.setStatus(StatusPagamento.SINAL);
        } else {
            pagamento_obj.setStatus(StatusPagamento.PENDENTE);
        }
        
        console.log (pagamento_obj);
        await this.repositorio.atualizarPagamento(pagamento_obj);

        return pagamento_obj;
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

