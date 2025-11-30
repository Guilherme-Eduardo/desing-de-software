export default class Cliente {
  
  constructor(
    id,
    nome,
    cpf,
    telefone,
    email,
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
  }


  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
      email: this.email,
    };
  }

  static fromObject(id, obj) {
    if (!obj) {
      throw new Error("Objeto de cliente inválido");
    }

    return new Cliente(
      id,
      obj.nome,
      obj.cpf,
      obj.telefone,
      obj.email,
    );
  }
}
