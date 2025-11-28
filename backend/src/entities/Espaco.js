export default class Espaco {

    constructor (id, nome, tipo, capacidade, preco, filialID, descricao) {

        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.preco = preco;
        this.filialID = filialID;
        this.descricao = descricao;
        //this.endereco = endereco;
    }

    async getNome () { return this.nome; }
    async getTipo () { return this.tipo; }
    async getCapacidade () { return this.capacidade; }
    async getPreco () { return this.preco; }
    async getFilialID () { return this.filialID; }
    async getDescricao () { return this.descricao; }

    async setNome (nome) { this.nome = nome; }
    async setTipo (tipo) { this.tipo = tipo; }
    async setCapacidade (capacidade) { this.capacidade = capacidade; }
    async setPreco (preco) { this.preco = preco; }
    async setFilialID (filialID) {this.filialID = filialID; }
    async setDescricao (descricao) { this.descricao = descricao; }

    // Cria um obejto a partir de um objeto
    static fromObject(id, obj) {

        if (!obj) {
            throw new Error ("Objeto não encontrado.");
        }

        return new Espaco (id,
                           obj.nome,
                           obj.tipo,
                           obj.capacidade, 
                           obj.preco, 
                           obj.filialID,
                           obj.descricao )
                           //new Endereco(obj.endereco));
    }

    // Cria um JSON a partir de um Espaço
    toJSON() {

        return {
            id: this.id,
            nome : this.nome,
            tipo : this.tipo,
            capacidade: this.capacidade,
            preco: this.preco,
            filialID : this.filialID,
            descricao : this.descricao
           // endereco: this.endereco.toJSON(),
        }
    }

}