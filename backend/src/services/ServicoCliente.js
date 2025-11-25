// src/services/ServicoCliente.js
import RespositorioCliente from "./repositories/RespositorioCliente.js";
import Cliente from "../entities/Cliente.js";

export default class ServicoCliente {
  constructor() {
    this.repositorio = new RespositorioCliente();
  }

  /**
   * Retorna a lista de todos os clientes cadastrados.
   */
  async listarClientes() {
    const clientes = await this.repositorio.listarTodos();
    return clientes;
  }

  /*
   * Busca um cliente pelo ID.
   */
  async obterClientePorId(id) {
    const cliente = await this.repositorio.buscarPorId(id);

    if (!cliente) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return cliente;
  }

  /**
   * Cria um novo cliente.
   */
  async criaCliente(dadosCliente) {
    const cliente = Cliente.fromObject(dadosCliente);

    const clienteCriado = await this.repositorio.inserirCliente(cliente);
    return clienteCriado;
  }

  /**
   * Atualiza um cliente existente.
   */
  async atualizaCliente(id, dadosCliente) {
    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    const clienteAtualizado = Cliente.fromObject({
      ...existente,
      ...dadosCliente,
      id // garante que o id não seja trocado
    });

    const salvo = await this.repositorio.atualizar(clienteAtualizado);
    return salvo;
  }

  /**
   * Remove um cliente do sistema.
   */
  async removeCliente(id) {
    const removido = await this.repositorio.deletarCliente(id);

    if (!removido) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return true;
  }
}
