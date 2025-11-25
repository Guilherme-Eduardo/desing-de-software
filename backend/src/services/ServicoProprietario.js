// src/services/ServicoProprietario.js

import RepositorioProprietario from "../repositories/RepositorioProprietario.js";
import Proprietario from "../entities/Proprietario.js";

export default class ServicoProprietario {
  constructor() {
    this.repositorio = new RepositorioProprietario();
  }

  /**
   * Retorna todos os proprietários cadastrados.
   */
  async listarProprietarios() {
    return await this.repositorio.listarProprietarios();
  }

  /**
   * Busca um proprietário pelo ID.
   * Lança erro 404 se não encontrar.
   */
  async buscarProprietario(id) {
    const proprietario = await this.repositorio.buscarPorId(id);

    if (!proprietario) {
      const erro = new Error("Proprietário não encontrado");
      erro.status = 404;
      throw erro;
    }

    return proprietario;
  }

  /**
   * Cria um novo proprietário.
   * `dados` vem do body da requisição.
   */
  async criarProprietario(dados) {
    const proprietario = Proprietario.fromObject(dados);
    const criado = await this.repositorio.inserirProprietario(proprietario);
    return criado;
  }

  /**
   * Atualiza um proprietário existente.
   */
  async atualizarProprietario(id, dados) {
    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      const erro = new Error("Proprietário não encontrado");
      erro.status = 404;
      throw erro;
    }

    const proprietarioAtualizado = Proprietario.fromObject({
      ...existente.toJSON ? existente.toJSON() : existente,
      ...dados,
      id // garante que o id não mude
    });

    const salvo = await this.repositorio.atualizarProprietario(proprietarioAtualizado);
    return salvo;
  }

  /**
   * Remove um proprietário do sistema.
   */
  async removerProprietario(id) {
    const removido = await this.repositorio.deletarProprietario(id);

    if (!removido) {
      const erro = new Error("Proprietário não encontrado");
      erro.status = 404;
      throw erro;
    }

    return true;
  }
}
