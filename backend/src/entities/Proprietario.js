// src/entities/Proprietario.js

/**
 * Representa um proprietário de espaços da rede.
 * Ele possui uma lista de espaços que administra.
 */
export default class Proprietario {
  /**
   * @param {string|number} id          Identificador único do proprietário
   * @param {string}        nome        Nome do proprietário
   * @param {string}        documento   Documento (CPF/CNPJ)
   * @param {string}        telefone    Telefone de contato
   * @param {string}        email       E-mail de contato
   * @param {Array<string|number>} [espacos] Lista de IDs de espaços administrados
   */
  constructor(id, nome, documento, telefone, email, espacos = []) {
    this.id = id;
    this.nome = nome;
    this.documento = documento;
    this.telefone = telefone;
    this.email = email;
    this.espacos = espacos; // normalmente lista de IDs de Espaco
  }

  /**
   * Cria um Proprietario a partir de um objeto “cru” (por exemplo, vindo de JSON).
   * Espera algo como:
   * {
   *   id,
   *   nome,
   *   documento,
   *   telefone,
   *   email,
   *   espacos: [ ... ]
   * }
   */
  static fromObject(obj) {
    if (!obj) {
      throw new Error("Objeto de proprietário inválido");
    }

    const espacos = Array.isArray(obj.espacos) ? obj.espacos : [];

    return new Proprietario(
      obj.id,
      obj.nome,
      obj.documento,
      obj.telefone,
      obj.email,
      espacos
    );
  }

  /**
   * Retorna uma representação JSON do proprietário.
   */
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      documento: this.documento,
      telefone: this.telefone,
      email: this.email,
      espacos: this.espacos
    };
  }

  /**
   * Adiciona um espaço à lista de espaços administrados.
   * Aqui, `idEspaco` pode ser o ID do espaço.
   */
  adicionarEspaco(idEspaco) {
    if (!this.espacos) {
      this.espacos = [];
    }
    this.espacos.push(idEspaco);
  }
}
