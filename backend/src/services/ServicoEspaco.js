import Espaco from "../entities/Espaco.js";
import RepositorioEspaco from "../repositories/RepositorioEspaco.js";

export default class ServicoEspaco {

    constructor() {
        this.repositorio = new RepositorioEspaco();
        this.countId = 0;
    }
    
    async criarEspaco (dadosEspaco) {

        const { capacidade, preco, tipo, endereco } = dadosEspaco;

        const novoEspaco = new Espaco(
            this.countId,
            capacidade,
            preco,
            tipo,
            endereco
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
        const espacoExistente = await this.repositorio.buscarPorId(id);
        if (!espacoExistente) {
        return null;
        }

        // Atualiza somente os campos enviados
        if (dadosAtualizados.capacidade !== undefined) {
        espacoExistente.setCapacidade(dadosAtualizados.capacidade);
        }
        if (dadosAtualizados.preco !== undefined) {
        espacoExistente.setPreco(dadosAtualizados.preco);
        }
        if (dadosAtualizados.tipo !== undefined) {
        espacoExistente.setTipo(dadosAtualizados.tipo);
        }
        if (dadosAtualizados.endereco !== undefined) {
        espacoExistente.setEndereco(dadosAtualizados.endereco);
        }

        await this.repositorio.atualizarEspaco(espacoExistente);
        return espacoExistente;
    }

    removerEspaco (id) {

        return this.repositorio.deletarEspaco(id);
    }

    verificarDisponibilidade(espaco) {

        // Algo :)

    }

    async listarEspacos() {
        return this.repositorio.listarEspacos(); // ajuste o nome se no repositório for outro
    }
}