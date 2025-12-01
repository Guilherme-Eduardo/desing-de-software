import { readFile, writeFile } from "fs/promises";

export default class RepositorioFilial {

  constructor() {
    this.path = "./db/filial_db.json";
  }

  async proxID() {
    const list = await this.lerJSON();
    return list.length;
  }

  /* Lê arquivo JSON (lista de filiais) */
  async lerJSON() {
    try {
      const texto = await readFile(this.path, "utf-8");
      return JSON.parse(texto);
    } catch (err) {
      return [];
    }
  }

  /* Escreve arquivo JSON */
  async salvarJSON(lista) {
    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }

  /* Retorna todas as filiais */
  async listarFiliais() {
    return await this.lerJSON();
  }

  /* Busca uma filial pelo id */
  async buscarPorId(id) {
    const lista = await this.lerJSON();

    const encontrado = lista.find(item => item.id == id);

    return encontrado || null;
  }

  async buscarFilial(filial) {
    const lista = await this.lerJSON();

    const ind = lista.find(item =>
      item.nome === filial.nome &&
      item.cnpj === filial.cnpj
    );

    if (ind == undefined)
      return false;

    return true;
  }

  /* Cria uma nova filial */
  async inserirFilial(filial) {

    const lista = await this.lerJSON();

    lista.push(filial);

    await this.salvarJSON(lista);

    return true;
  }

  /* Atualiza uma filial existente */
  async atualizarFilial(filial) {
    const lista = await this.lerJSON();

    const id = filial.id;

    const index = lista.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("ERRO! Não foi encontrado filial de atualização.");
      return null;
    }

    lista[index] = filial;

    await this.salvarJSON(lista);

    return filial;
  }

  /* Remove uma filial */
  async removerFilial(id) {
    const lista_1 = await this.lerJSON();
    if (lista_1.length == 0)
      return false;

    const lista_2 = lista_1.filter(item => item.id !== id);

    if (lista_1.length === lista_2.length) {
      return false;
    }

    await this.salvarJSON(lista_2);
    return true;
  }
}