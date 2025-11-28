import Espaco from "../entities/Espaco.js";
import RepositorioEspaco from "../repositories/RepositorioEspaco.js";

export default class ServicoEspaco {

    constructor() {
        this.repositorio = new RepositorioEspaco();
        this.countId = 0;
    }
    
    async criarEspaco (dadosEspaco) {

        const { nome, tipo, capacidade, preco, filialID, descricao } = dadosEspaco;

        const novoEspaco = new Espaco(
            this.countId,
            nome,
            tipo,
            capacidade,
            preco,
            filialID,
            descricao
        );

        if (await this.repositorio.buscarEspaco(novoEspaco)) {
            console.log("Espaço já criado")
            return null;
        }

        this.countId++;

        await this.repositorio.inserirEspaco(novoEspaco);
        return novoEspaco;
    }
        

    async atualizarEspaco(id, dadosAtualizados) {
        const existente = await this.repositorio.buscarPorId(id);
        if (!existente) {
        return null;
        }

        const obj = Espaco.fromObject(id, existente);

        // Atualiza somente os campos enviados
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
        if (dadosAtualizados.filialID !== undefined) {
        obj.setFilialID(dadosAtualizados.filialID);
        }
        if (dadosAtualizados.descricao !== undefined) {
        obj.setDescricao(dadosAtualizados.descricao);
        }
        // if (dadosAtualizados.endereco !== undefined) {
        // obj.setEndereco(dadosAtualizados.endereco);
        // }

        await this.repositorio.atualizarEspaco(obj);
        return obj;
    }

    removerEspaco (id) {

        return this.repositorio.deletarEspaco(id);
    }

    async listarEspacos() {
        return this.repositorio.listarEspacos(); // ajuste o nome se no repositório for outro
    }
}