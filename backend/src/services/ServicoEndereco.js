import Endereco from "../entities/Endereco.js";
import RepositorioEndereco from "../repositories/RepositorioEndereco.js"

export default class ServicoEndereco {

  constructor() {
    this.repositorio = new RepositorioEndereco();
  }

  // Cria um endereço
  async criarEndereco(dadosEndereco) {

    const { rua, numero, bairro, cidade, estado, complemento } = dadosEndereco;
    const id = await this.repositorio.proxID();

    const novoEndereco = new Endereco(
      id,
      rua, numero, bairro, cidade, estado, complemento);

    if (await this.repositorio.buscarEndereco(novoEndereco)) {
      console.log("Endereco já criado")
      return null;
    }

    await this.repositorio.inserirEndereco(novoEndereco);
    return novoEndereco;
  }

  // Atualiza os dados de um endereco aprtir do seu ID
  async atualizarEndereco(id, dadosAtualizados) {
    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      console.log("Endereço inexistente:", id);
      return null;
    }

    const obj = new Endereco(
      id,
      dadosAtualizados.rua ?? existente.rua,
      dadosAtualizados.numero ?? existente.numero,
      dadosAtualizados.bairro ?? existente.bairro,
      dadosAtualizados.cidade ?? existente.cidade,
      dadosAtualizados.estado ?? existente.estado,
      dadosAtualizados.complemento ?? existente.complemento
    );

    const atualizado = await this.repositorio.atualizarEndereco(obj);
    return atualizado;
  }

  // Remove um enedereço cadastrado através do seu ID
  removerEndereco(id) {
    return this.repositorio.deletarEndereco(id);
  }

  // Retorna uma lista contendo todos os endereços cadastrados
  async listarEnderecos() {
    return this.repositorio.listarEnderecos();
  }

  // Busca um endereço a partir do seu ID
  async buscarPorId(id) {
    const endereco = this.repositorio.buscarPorId(id);
    return endereco;
  }
}