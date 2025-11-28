// src/repositories/RepositorioFilial.js
import { readFile, writeFile } from "fs/promises";

export default class RepositorioFilial {

  constructor () {
    this.path = "./db/filial_db.json";
  }  

  /* Lê arquivo JSON (lista de filiais) */
  async lerJSON() {
  try {
    const texto = await readFile(this.path, "utf-8");
    return JSON.parse(texto);
  } catch (err) {
    // Se o arquivo não existir ou estiver vazio, retornamos lista vazia
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
    const encontrado = lista.find((item) => item.id === id);

    return encontrado ? encontrado : null;
  }

  /* Cria uma nova filial */
  async inserirFilial (filial) {
    
    const lista = await this.lerJSON();

    lista.push(filial);

    await this.salvarJSON(lista);
  }

  /* Atualiza uma filial existente */
  async atualizarFilial(filial) {
    const lista = await this.lerJSON();

    const index = lista.findIndex((item) => item.id === id);
    if (index === -1) {
      return false; // quem chamar decide se lança erro 404
    }

    lista[index] = filial;

    await this.salvarJSON(lista);

    return true;
  }

  /* Remove uma filial */
  async removerFilial(id) {
    const lista_1 = await this.lerJSON();
    if (lista_1.length == 0) 
      return false;

    const lista_2 = lista_1.filter((item) => item.id !== id);

    if (lista_1.length === lista_2.length) {
      // nada foi removido
      return false;
    }

    await this.salvarJSON(lista_2);
    return true;
  }
}