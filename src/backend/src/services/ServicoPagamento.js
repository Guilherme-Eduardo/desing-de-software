import Pagamento from "../entities/Pagamento.js";
import RepositorioPagamento from "../repositories/RepositorioPagamento.js";
import { StatusPagamento } from "../entities/StatusPagamento.js";

export default class ServicoPagamento {

    constructor() {
        this.repositorio = new RepositorioPagamento();
    }

    // Cria um novo pagamento
    async criarPagamento(total) {

        const novoId = await this.repositorio.proxID();

        const pagamento = new Pagamento(novoId, total);

        await this.repositorio.inserirPagamento(pagamento);

        return pagamento;
    }

    // Remove um pagamento cadatsratdo através de seu ID
    removerPagamento(id) {

        return this.repositorio.deletarPagamento(id);
    }

    // Realiza o processamento de um pagamento 
    async processarPagamento(id, valorPago) {
        
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) {
            return null;
        }

        const valor = Number(valorPago);

        const pagamento_obj = new Pagamento(pagamento.id, pagamento.total, pagamento.valor_pago, pagamento.status);

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

        await this.repositorio.atualizarPagamento(pagamento_obj);

        return pagamento_obj;
    }

    // Verifica o status de um pagamento através de seu ID
    async verificarStatus(id) {
        const pagamento = await this.repositorio.buscarPorId(id);
        if (!pagamento) return null;
        return pagamento.getStatus();


    }
}

