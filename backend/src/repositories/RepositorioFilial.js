import { readFile, writeFile } from "fs/promises";

export default class RepositorioFilial {

  constructor() {
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

  console.log(">>> buscarPorId(id) recebendo:", id);
  console.log(">>> lista lida:", lista);

  const encontrado = lista.find(item => item.id == id);

  console.log(">>> resultado encontrado:", encontrado);

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
  }

  /* Atualiza uma filial existente */
  // RepositorioFilial.js
async atualizarFilial(filial) {
  const lista = await this.lerJSON();

  // id da filial que chegou para atualizar
  const id = filial.id;  // pode ser string ou número

  console.log(">>> atualizarFilial: id recebido:", id);
  console.log(">>> atualizarFilial: lista atual:", lista);

  // comparação "frouxa" pra aceitar '0' e 0
  const index = lista.findIndex((item) => item.id == id);

  console.log(">>> atualizarFilial: index encontrado:", index);

  if (index === -1) {
    console.log("ERRO! Não foi encontrado filial de atualização.");
    return null;
  }

  // sobrescreve a posição com o objeto novo
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
      // nada foi removido
      return false;
    }

    await this.salvarJSON(lista_2);
    return true;
  }
}