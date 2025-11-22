export default class Espaco {

    /**
     * 
     * @param {int} capacidade 
     * @param {double} preco 
     * @param {string} tipo 
     * @param {Endereco} endereco 
     */
    constructor (id, capacidade, preco, tipo, endereco) {

        this.id = id;
        this.capacidade = capacidade;
        this.preco = preco;
        this.tipo = tipo;
        this.endereco = endereco;
    }

    // Cria um obejto a partir de um objeto
    static fromObject(obj) {

        if (!obj) {
            throw new Error ("Objeto não encontrado.");
        }

        return new Espaco (obj.id,
                           obj.capacidade, 
                           obj.preco, 
                           obj.tipo, 
                           new Endereco(obj.endereco));
    }

    // Cria um JSON a partir de um Espaço
    toJSON() {

        return {
            id: this.id,
            capacidade: this.capacidade,
            preco: this.preco,
            tipo: this.tipo,
            endereco: this.endereco.toJSON(),
        }
    }

}