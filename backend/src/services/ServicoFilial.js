// src/services/ServicoFilial.js
import RespositorioFilial from "../repositories/RepositorioFilial.js"
import Filial from "../entities/Filial.js";

export default class ServicoFilial {
  constructor() {
    this.repositorio = new RespositorioFilial();
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
  async obterFilial(id) {
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

    dadosFilial.id = await this.repositorio.proxID();
    if (dadosFilial.enderecoId !== undefined)
      dadosFilial.enderecoId = Number(dadosFilial.enderecoId);

    const filial = Filial.fromObject(this.count_id, dadosFilial);
    
    if (await this.repositorio.buscarFilial(filial)) {
      console.log ("Filial já cadastrado.")
      return false;
    }
    
    const criado = await this.repositorio.inserirFilial(filial);
    return criado;
  }

  /**
   * Atualiza um filial existente.
   */
  async atualizaFilial(id, dadosFilial) {

    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      const erro = new Error("Filial não encontrado");
      erro.status = 404;
      throw erro;
    }

    if (dadosFilial.enderecoId !== undefined)
      dadosFilial.enderecoId = Number(dadosFilial.enderecoId);

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
    const removido = await this.repositorio.removerFilial(id);

    if (!removido) {
      const erro = new Error("Filial não encontrado");
      erro.status = 404;
      throw erro;
    }

    return true;
  }
}
