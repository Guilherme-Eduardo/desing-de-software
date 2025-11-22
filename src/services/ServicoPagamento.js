import Pagamento from "entities/Pagamento.js";
import RepositorioPagamento from "repositories/RepositorioPagamento";
import { StatusPagamento } from "../entities/StatusPagamento";

export default class ServicoPagamento {

    constructor () {
        this.repositorio = new RepositorioPagamento ();
        this.id = 0;
    }

    criarPagamento (total) {

        const novo = new Pagamento (this.id, total);
        this.id++;
        this.repositorio.insertPagamento(novo);

        return novo;
    }

    removerPagamento (pagamento) {

        this.repositorio.deletePagamento(pagamento);

    }

    estornarPagamento (pagamento) {

        pagamento.setStatus(StatusPagamento.ESTORNADO);
    }

    processarPagamento (pagamento, valor_pago) {

        if (valor_pago == pagamento.getTotal() - pagamento.getPago() ) {
            pagamento.setStatus(StatusPagamento.APROVADO);
        }
        else {    
            pagamento.setStatus(StatusPagamento.SINAL);
        }
        
        pagamento.setPago(pagamento.getPago() + valor_pago)
    }

    recusarPagamento (pagamento) {
        pagamento.setStatus(StatusPagamento.RECUSADO);
    }

    verificarStatus (pagamento) {
        return pagamento.getStatus();
    }

    buscarPagamento (pagamento) {
        return this.repositorio.findPagamento(pagamento);
    }
}