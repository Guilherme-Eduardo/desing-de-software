import { readFile, writeFile } from "fs/promises";

export default class RepositorioReserva {

  constructor() {
    this.path = "./db/reservas_db.json";
  }

  // Retorna o tamanho da lista
  async proxID() {
    const list = await this.lerJSON();
    return list.length;
  }

  /* Ler Arquivo de Dados de Reserva */
  async lerJSON() {

    try {
      const texto = await readFile(this.path, "utf-8");
      return JSON.parse(texto);
    }

    // Se o arquivo não existir ou estiver vazio
    catch (err) {
      return [];
    }
  }

  // Salva uma lista como um JSON
  async salvarJSON(lista) {

    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }

  // Busca uma reserva de acordo com o ID passado por parâmetro
  async buscarPorId(id) {
    const reservas = await this.lerJSON();
    const idNum = Number(id);

    const reserva = reservas.find((item) => Number(item.id) === idNum);
    return reserva || null;
  }

  // Busca uma reserva na lista
  async buscarReserva(reserva) {

    const lista = await this.lerJSON();

    const ind = lista.find(item => item.inicio === reserva.inicio &&
      item.fim === reserva.fim &&
      item.espaco === reserva.espaco &&
      item.cliente === reserva.cliente &&
      item.status === reserva.status
    )

    if (ind == undefined)
      return false;

    return true;
  }

  // Insere reserva já criado no arquivo
  async inserirReserva(reserva) {

    const list = await this.lerJSON();

    list.push(reserva);

    await this.salvarJSON(list);
  }


  // Atualiza um reserva
  async atualizarReserva(reserva) {

    const lista = await this.lerJSON();

    const index = lista.findIndex(item => item.id == reserva.id);
    if (index == -1) {
      console.log("ERRO! Não foi encontrado o Reserva de atualização.");
      return;
    }

    lista[index] = reserva;

    await this.salvarJSON(lista);
  }

  // Deleta reserva
  async deletarReserva(id) {

    const lista_1 = await this.lerJSON();
    if (lista_1.length == 0) {
      console.log("ERRO! Não foi encontrado reservas para deletar.");
      return false;
    }

    const lista_2 = lista_1.filter(item => item.id != id);

    if (lista_1.length === lista_2.length) {
      return false;
    }

    await this.salvarJSON(lista_2);

    return true;
  }

  // Lista todas as reservas cadastradas
  async listarReservas() {

    return await this.lerJSON();

  }

}