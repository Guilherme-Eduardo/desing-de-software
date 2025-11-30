import Espaco from "../entities/Espaco.js";
import RepositorioEspaco from "../repositories/RepositorioEspaco.js";

export default class ServicoEspaco {

    constructor() {
        this.repositorio = new RepositorioEspaco();
    }

    // Cria um novo espaço
    async criarEspaco(dadosEspaco, imagem) {

        const { nome, tipo, capacidade, preco, filialId, enderecoId } = dadosEspaco;
        const id = this.repositorio.proxID();

        const novoEspaco = new Espaco(
            id,
            nome,
            tipo,
            capacidade,
            preco,
            filialId,
            enderecoId,
            imagem ? `/uploads/${imagem.filename}` : null
        );

        if (await this.repositorio.buscarEspaco(novoEspaco)) {
            console.log("Espaço já criado")
            return null;
        }

        await this.repositorio.inserirEspaco(novoEspaco);
        return novoEspaco;
    }

    // Verifica se o ID corresponde a um espaço
    async verificaValidade(id) {
        const index = await this.repositorio.buscarPorId(id);
        if (index == -1)
            return false;

        return true;
    }


    // Atualiza os dados de um espaço
    async atualizarEspaco(id, dadosAtualizados, imagem) {
        id = Number(id);
        const existente = await this.repositorio.buscarPorId(id);
        if (!existente) {
            return null;
        }

        const obj = Espaco.fromObject(id, existente);

        if (dadosAtualizados.nome !== undefined) {
            obj.setNome(dadosAtualizados.nome);
        }

        if (dadosAtualizados.tipo !== undefined) {
            obj.setTipo(dadosAtualizados.tipo);
        }

        if (dadosAtualizados.capacidade !== undefined) {
            obj.setCapacidade(dadosAtualizados.capacidade);
        }

        if (dadosAtualizados.preco !== undefined) {
            obj.setPreco(dadosAtualizados.preco);
        }

        if (dadosAtualizados.filialId !== undefined) {
            obj.setFilialId(dadosAtualizados.filialId);
        }

        if (dadosAtualizados.enderecoId !== undefined) {
            obj.setEnderecoId(dadosAtualizados.enderecoId);
        }

        if (imagem) {
            obj.setImagemURL(`/uploads/${imagem.filename}`);
        }

        await this.repositorio.atualizarEspaco(obj);
        return obj;
    }

    // Remove um espaço cadastrado
    async removerEspaco(id) {

        return this.repositorio.deletarEspaco(id);
    }

    // Retorna uma lista de contendo os espaços cadastrados
    async listarEspacos() {
        return this.repositorio.listarEspacos(); 
    }

    // Retorna o o preço total do espaço apartir do seu ID
    async getTotal(id) {

        const obj = await this.repositorio.buscarPorId(id);
        if (!obj)
            return null;

        const espaco = new Espaco(obj.id, obj.nome, obj.tipo, obj.capacidade, obj.preco, obj.filialID)

        return espaco.getPreco();
    }
}