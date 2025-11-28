// src/entities/Filial.js
export default class Filial {
  /**
   * Representa uma filial da rede, responsável por administrar reservas.
   *
   * @param {string|number} id           Identificador único da filial
   * @param {string}        nome         Nome da filial
   * @param {string}        cnpj         CNPJ da filial
   * @param {Endereco}      endereco     Endereço da filial
   */
  constructor(id, nome, cnpj, endereco) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.endereco = endereco;
  }

  /**
   * Cria uma Filial a partir de um objeto "cru" (por exemplo, vindo de JSON).
   * Espera algo como:
   * {
   *   id,
   *   nome,
   *   cnpj,
   *   endereco: { ... }
   * }
   */
  static fromObject(id, obj) {
    if (!obj) {
      throw new Error("Objeto de filial inválido");
    }

    const endereco =
      obj.endereco instanceof Endereco
        ? obj.endereco
        : Endereco.fromObject(obj.endereco);

    return new Filial(
      id,
      obj.nome,
      obj.cnpj,
      endereco
    );
  }

  /**
   * Retorna uma representação JSON da filial.
   */
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      cnpj: this.cnpj,
      endereco: this.endereco ? this.endereco.toJSON() : null
    };
  }
}
