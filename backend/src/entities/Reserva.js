import { StatusReserva } from "./StatusReserva.js";

export default class Reserva {

    constructor (id, data_inicio, data_fim, espaco, cliente, status) {

        this.id = id;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.espaco = espaco;
        this.cliente = cliente;
        this.status = status;
    }

    static fromObject(obj) {
    if (!obj) {
      throw new Error("Objeto de reserva inválido");
    }

    return new Reserva (
      obj.id,
      obj.data_inicio,
      obj.data_fim,
      obj.espaco,
      obj.cliente,
      obj.status
    );
  }

  /**
   * Retorna uma representação JSON do proprietário.
   */
  toJSON() {
    return {
      id: this.id,
      data_inicio : this.data_inicio,
      data_fim : this.data_fim,
      espaco : this.espaco,
      cliente : this.cliente,
      status : this.status
    };
  }
}