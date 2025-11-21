export default class Endereco {


    count_id = 0;

  /**
   * Representa um endereço de uma filial, proprietário ou espaço.
   *
   * @param {Object} params
   * @param {string} params.rua
   * @param {number} params.numero
   * @param {string} params.bairro
   * @param {string} params.cidade
   * @param {string} params.estado
   * @param {string} [params.complemento]
   */

  constructor({ rua, numero, bairro, cidade, estado, complemento = "" }) {
    
    this.id = count_id;
    count_id++;

    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.complemento = complemento;
  }


  /* Cria um Endereco a partir de um objeto “cru” (por exemplo, vindo de JSON). */
  static fromObject(obj) {

    if (!obj) {
      throw new Error("Objeto de endereço inválido");
    }

    if (!obj.complemento)
        obj.complemento = "";

    return new Endereco({
      id: obj.id,
      rua: obj.rua,
      numero: obj.numero,
      bairro: obj.bairro,
      cidade: obj.cidade,
      estado: obj.estado,
      complemento: obj.complemento
    });
  }

  /* Retorna um JSON. */
  toJSON() {

    return {
      id: this.id,
      rua: this.rua,
      numero: this.numero,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      complemento: this.complemento
    };

  }
}