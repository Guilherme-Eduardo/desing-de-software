import Endereco from "../entities/Endereco.js";
import RepositorioEndereco from "../repositories/RepositorioEndereco.js"

export default class ServicoEndereco {

    constructor() {
        this.repositorio = new RepositorioEndereco();
        this.countId = 0;
    }
    
    async criarEndereco (dadosEndereco) {

        const {rua, numero, bairro, cidade, estado, complemento } = dadosEndereco;

        const novoEndereco = new Endereco(
            this.countId,
            rua, numero, bairro, cidade, estado, complemento);

        if (await this.repositorio.buscarEndereco(novoEndereco)) {
            console.log("Endereco já criado")
            return null;
        }

        this.countId++;

        await this.repositorio.inserirEndereco(novoEndereco);
        return novoEndereco;
    }
        

  async atualizarEndereco(id, dadosAtualizados) {
    id = Number(id);

    const existente = await this.repositorio.buscarPorId(id);

    if (!existente) {
      console.log("Endereço inexistente:", id);
      return null;
    }

    // monta usando o id EXPLÍCITO, não usando fromObject incorreto
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

    removerEndereco (id) {

        return this.repositorio.deletarEndereco(id);
    }

    async listarEnderecos() {
        return this.repositorio.listarEnderecos(); 
    }

    async buscarPorId (id) {
        const endereco = this.repositorio.buscarPorId(id);
        return endereco;
    }
}