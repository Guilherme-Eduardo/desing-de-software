import { readFile, writeFile } from "fs/promises";

export default class RepositorioCliente {

  constructor() {
    this.path = "./db/cliente_db.json";
  }

  async proxID() {
    const list = await this.lerJSON();
    return list.length;
  }

  /* Ler Arquivo de Dados de Cliente */
  async lerJSON() {

    try {
      const texto = await readFile(this.path, "utf-8");
      return JSON.parse(texto);
    }

    catch (err) {
      return [];
    }
  }

  async salvarJSON(lista) {
    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }

  async buscarPorId(id) {

    const lista = await this.lerJSON();

    const index = lista.find(item => item.id == id);

    return index;
  }

  async buscarCliente(cliente) {

    const lista = await this.lerJSON();

    const ind = lista.find(item => item.nome === cliente.nome &&
      item.cpf === cliente.cpf &&
      item.data === cliente.data &&
      item.email === cliente.email &&
      item.telefone === cliente.telefone
    )

    if (ind == undefined)
      return false;

    return true;
  }

  async inserirCliente(cliente) {

    const lista = await this.lerJSON();

    lista.push(cliente);

    await this.salvarJSON(lista);

    return true;
  }


  async atualizarCliente(cliente) {

    const lista = await this.lerJSON();

    const index = lista.findIndex(item => item.id == cliente.id);
    if (index == -1) {
      console.log("ERRO! Não foi encontrado o Cliente de atualização.");
      return;
    }

    lista[index] = cliente;

    await this.salvarJSON(lista);

    return cliente;
  }

  async deletarCliente(id) {

    const lista_1 = await this.lerJSON();
    if (lista_1.length == 0)
      return false;

    const lista_2 = lista_1.filter(item => item.id != id);
    if (lista_1.length == lista_2.length)
      return false;

    await this.salvarJSON(lista_2);
    return true;
  }


  async listarClientes() {

    return await this.lerJSON();
  }
}