export default class Cliente {
  constructor(
    id,
    nome,
    documento,
    telefone,
    email,
    reservas = [] // histórico de reservas
  ) {
    this.id = id;
    this.nome = nome;
    this.documento = documento;
    this.telefone = telefone;
    this.email = email;
    this.reservas = reservas; // pode ser lista de objetos ou de IDs
  }

  adicionarReserva(reserva) {
    if (!this.reservas) {
      this.reservas = [];
    }
    this.reservas.push(reserva);
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
      email: this.email,
      reservas: this.reservas
    };
  }

  static fromObject(id, obj) {
    if (!obj) {
      throw new Error("Objeto de cliente inválido");
    }

    const reservas = Array.isArray(obj.reservas) ? obj.reservas : [];

    return new Cliente(
      id,
      obj.nome,
      obj.documento,
      obj.telefone,
      obj.email,
      reservas
    );
  }
}
