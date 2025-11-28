import { StatusReserva } from "./StatusReserva.js";
import Pagamento from "./Pagamento.js";

export default class Reserva {

    constructor (id, inicio, fim, espaco, cliente, status, pagamento) {

        this.id = id;
        this.inicio = inicio;
        this.fim = fim;
        this.espaco = espaco;
        this.cliente = cliente;
        this.status = status;
        this.pagamento = pagamento;
    }

    async getPagamento () { return this.pagamento; }
    
    async setInicio (inicio) { this.inicio = inicio; }
    async setFim (fim) { this.fim = fim; }
    async setEspaco (espaco) { this.espaco = espaco; }
    async setCliente (cliente) { this.cliente = cliente; }
    async setStatus (status) { this.status = status; }

    static fromObject(id, obj) {
      
      if (!obj) {
        throw new Error("Objeto de reserva inválido");
      }

      const { id_pag, pago, total, status } = obj.pagamento;

      const pagamento = new Pagamento (id_pag, pago, total, status);
      
      return new Reserva (
        id,
        obj.inicio,
        obj.fim,
        obj.espaco,
        obj.cliente,
        obj.status,
        pagamento
      );
    }

  /**
   * Retorna uma representação JSON do pagamento.
   */
  toJSON() {
    return {
      id: this.id,
      inicio : this.inicio,
      fim : this.fim,
      espaco : this.espaco,
      cliente : this.cliente,
      status : this.status,
      pagamento: this.pagamento.toJSON()
    };
  }
}