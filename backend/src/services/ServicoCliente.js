// src/services/ServicoCliente.js
import RespositorioCliente from "../repositories/RepositorioCliente.js";
import Cliente from "../entities/Cliente.js";

export default class ServicoCliente {
  constructor() {
    this.repositorio = new RespositorioCliente();
  }

  /**
   * Retorna a lista de todos os clientes cadastrados.
   */
  async listarClientes() {
    const clientes = await this.repositorio.listarClientes();
    return clientes;
  }

  async verificaValidade (id) {
    const index = await this.repositorio.buscarPorId(id);
    if (index == -1)
      return false;

    return true;
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
    const cliente = Cliente.fromObject(this.repositorio.proxID(), dadosCliente);
    
    if (await this.repositorio.buscarCliente(cliente)) {
      console.log ("Cliente já cadastrado.")
      return false;
    }

    this.count_id++;
    
    const criado = await this.repositorio.inserirCliente(cliente);
    return criado;
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

    const clienteAtualizado = Cliente.fromObject(id, {
      ...existente,
      ...dadosCliente
    });

    const salvo = await this.repositorio.atualizarCliente(clienteAtualizado);
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
