import Espaco from "entities/Espaco.js";
import RepositorioEspaco from "repositories/RepositorioEspaco.js";

export default class ServicoEspaco {

    constructor () {
        
        this.repositorio = new RepositorioEspaco();
        this.id = 0;
    }


    criarEspaco (capacidade, preco, tipo, endereco) {

        const novo =  new Espaco (this.id, capacidade, preco ,tipo, endereco);
        this.id++;

        this.repositorio.insertEspaco(novo);

        return novo;
    }

    atualizarEspaco (oldSpace, newSpace) {

        this.repositorio.updateEspaco(oldSpace, newSpace);
    }

    removerEspaco (space) {

        this.repositorio.deleteEspaco(space);
    }

    buscarEspaco (space) {

        return this.repositorio.findEspaco(space);
    }

    verificarDisponibilidade(space) {

        // Algo :)

    }




}