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
        const existente = await this.repositorio.buscarPorId(id);
        if (!existente) {
        return null;
        }

        const obj = Endereco.fromObject(id, existente);

        // Atualiza somente os campos enviados
        if (dadosAtualizados.rua !== undefined) {
        obj.setRua(dadosAtualizados.rua);
        }
        if (dadosAtualizados.numero !== undefined) {
        obj.setNumero(dadosAtualizados.numero);
        }
        if (dadosAtualizados.bairro !== undefined) {
        obj.setBairro(dadosAtualizados.bairro);
        }
        if (dadosAtualizados.cidade !== undefined) {
        obj.setCidade(dadosAtualizados.cidade);
        }
        if (dadosAtualizados.estado !== undefined) {
        obj.setEstado(dadosAtualizados.estado);
        }
        if (dadosAtualizados.complemento !== undefined) {
        obj.setComplemento(dadosAtualizados.complemento);
        }

        await this.repositorio.atualizarEndereco(obj);
        return obj;
    }

    removerEndereco (id) {

        return this.repositorio.deletarEndereco(id);
    }

    async listarEnderecos() {
        return this.repositorio.listarEnderecos(); 
    }
}