export default class Cliente {
  constructor(
    id,
    nome,
    documento,
    telefone,
    email,
    endereco,
    reservas = [] // histórico de reservas
  ) {
    this.id = id;
    this.nome = nome;
    this.documento = documento;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco;
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
      documento: this.documento,
      telefone: this.telefone,
      email: this.email,
      endereco: this.endereco ? this.endereco.toJSON() : null,
      reservas: this.reservas
    };
  }

  static fromObject(obj) {
    if (!obj) {
      throw new Error("Objeto de cliente inválido");
    }

    const endereco =
      obj.endereco instanceof Endereco
        ? obj.endereco
        : Endereco.fromObject(obj.endereco);

    const reservas = Array.isArray(obj.reservas) ? obj.reservas : [];

    return new Cliente(
      obj.id,
      obj.nome,
      obj.documento,
      obj.telefone,
      obj.email,
      endereco,
      reservas
    );
  }
}
