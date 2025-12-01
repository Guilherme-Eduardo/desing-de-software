import Endereco from "./Endereco.js";

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
  constructor(id, nome, cnpj, enderecoId) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.enderecoId = Number(enderecoId);
  }


  static fromObject(id, obj) {
    if (!obj) throw new Error("Objeto de filial inválido");

    return new Filial(
      Number(id),
      obj.nome,
      obj.cnpj,
      obj.enderecoId
    );
  }


 
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      cnpj: this.cnpj,
      enderecoId: this.enderecoId
    };
  }
}
