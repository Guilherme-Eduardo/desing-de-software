import { readFile, writeFile } from "fs/promises";

export default class RepositorioReserva {

  constructor() {
    this.path = "./db/reservas_db.json";
  }

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

    catch (err) {
      return [];
    }
  }

  async salvarJSON(lista) {

    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }

  async buscarPorId(id) {
    const reservas = await this.lerJSON();
    const idNum = Number(id);

    const reserva = reservas.find((item) => Number(item.id) === idNum);
    return reserva || null;
  }

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

  async inserirReserva(reserva) {

    const list = await this.lerJSON();

    list.push(reserva);

    await this.salvarJSON(list);
  }


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

  async listarReservas() {

    return await this.lerJSON();

  }

}