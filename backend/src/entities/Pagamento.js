import PendenteState from "statespagamento/PendenteState.js";
import { StatusPagamento } from "./StatusPagamento";

export default class Pagamento {

    static count_id = 0;

    constructor (id, total, pago = 0, status = StatusPagamento.PENDENTE) {

        this.id = id;
        this.valor_pago = pago;
        this.total = total;
        this.status = status;
    }


    setStatus (status) { this.staus = status; }

    setPago(pago) { this.valor_pago = pago; }

    setTotal(total){ this.total = total; }
    
    getStatus () { return this.status; }

    getPago() { return this.valor_pago; }

    getTotal() { return this.total; }


    static fromObject (obj) {

        if (!obj)
            throw new Error ("Objeto Pagamento não encontrado.");

        return new Pagamento (
            obj.id,
            obj.valor_pago,
            obj.total,
            obj.status
        )
    }

    toJSON() {

        return {
            id: this.id,
            valor_pago: this.valor_pago,
            total: this.total,
            status: this.status
        }
    }
}