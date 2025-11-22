import Espaco from "entities/Espaco.js";
import RepositorioEspaco from "repositories/RepositorioEspaco.js";

export default class ServicoEspaco {

    constructor() {
        this.repositorio = new RepositorioEspaco();
    }
    
    async criarEspaco (dadosEspaco) {

        const { capacidade, preco, tipo, endereco } = dadosEspaco;

        const novoId = await this.repositorio.proximoId();

        const novoEspaco = new Espaco(
            novoId,
            capacidade,
            preco,
            tipo,
            endereco
        );

        await this.repositorio.insertEspaco(novoEspaco);
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

        await this.repositorio.updateEspaco(espacoExistente);
        return espacoExistente;
    }
    removerEspaco (id) {

        return this.repositorio.deleteEspaco(id);
    }

    buscarEspaco (space) {

        return this.repositorio.findEspaco(space);
    }

    verificarDisponibilidade(space) {

        // Algo :)

    }

    async listarEspacos() {
        return this.repositorio.getEspacos(); // ajuste o nome se no repositório for outro
    }




}