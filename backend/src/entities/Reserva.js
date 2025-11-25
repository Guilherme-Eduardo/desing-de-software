import { StatusReserva } from "./StatusReserva.js";

export default class Reserva {

    constructor (id, data, status) {

        this.id = id;
        this.data = data;
        this.status = status;
    }

    static fromObject(obj) {
    if (!obj) {
      throw new Error("Objeto de proprietário inválido");
    }

    return new Reserva (
      obj.id,
      obj.data,
      obj.status
    );
  }

  /**
   * Retorna uma representação JSON do proprietário.
   */
  toJSON() {
    return {
      id: this.id,
      data : this.data,
      status : this.status
    };
  }
}