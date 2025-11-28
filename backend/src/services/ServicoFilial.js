// src/services/ServicoFilial.js
import RespositorioFilial from "../repositories/RepositorioFilial.js"
import Filial from "../entities/Filial.js";

export default class ServicoFilial {
  constructor() {
    this.repositorio = new RespositorioFilial();
    this.count_id = 0;
  }

  /**
   * Retorna a lista de todos os filiais cadastrados.
   */
  async listarFiliais () {
    const filiais = await this.repositorio.listarFiliais ();
    return filiais;
  }

  async verificaValidade (id) {
    const index = await this.repositorio.buscarPorId(id);
    if (index == -1)
      return false;

    return true;
  }

  /*
   * Busca um filial pelo ID.
   */
  async obterClientePorId(id) {
    const filial = await this.repositorio.buscarPorId(id);

    if (!filial) {
      const erro = new Error("Filial não encontrado");
      erro.status = 404;
      throw erro;
    }

    return filial;
  }

  /**
   * Cria um novo filial.
   */
  async criaFilial(dadosFilial) {
    const filial = Filial.fromObject(this.count_id, dadosFilial);
    
    if (await this.repositorio.buscaFilial(filial)) {
      console.log ("Filial já cadastrado.")
      return false;
    }

    this.count_id++;
    
    const criado = await this.repositorio.inserirFilial(filial);
    return criado;
  }

  /**
   * Atualiza um filial existente.
   */
  async atualizaFilial(id, dadosFilial) {
    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      const erro = new Error("Filial não encontrado");
      erro.status = 404;
      throw erro;
    }

    const filialAtualizado = Filial.fromObject(id, {
      ...existente,
      ...dadosFilial
    });

    const salvo = await this.repositorio.atualizarFilial(filialAtualizado);
    return salvo;
  }

  /**
   * Remove um filial do sistema.
   */
  async removeFilial(id) {
    const removido = await this.repositorio.deletarFilial(id);

    if (!removido) {
      const erro = new Error("Filial não encontrado");
      erro.status = 404;
      throw erro;
    }

    return true;
  }
}
