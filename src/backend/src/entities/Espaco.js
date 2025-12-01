export default class Espaco {

    constructor(id, nome, tipo, capacidade, preco, filialId, enderecoId, imagemURL = null) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.preco = preco;
        this.filialId = filialId;
        this.enderecoId = enderecoId;
        this.imagemURL = imagemURL;
    }

    getNome() { return this.nome; }
    getTipo() { return this.tipo; }
    getCapacidade() { return this.capacidade; }
    getPreco() { return this.preco; }
    getFilialId() { return this.filialId; }
    getEnderecoId() { return this.enderecoId; }
    getImagemURL() { return this.imagemURL; } 

    setNome(nome) { this.nome = nome; }
    setTipo(tipo) { this.tipo = tipo; }
    setCapacidade(capacidade) { this.capacidade = capacidade; }
    setPreco(preco) { this.preco = preco; }
    setFilialId(filialId) { this.filialId = filialId; }
    setEnderecoId(enderecoId) { this.enderecoId = enderecoId; }
    setImagemURL(url) { this.imagemURL = url; }

    static fromObject(id, obj) {
        if (!obj) {
            throw new Error("Objeto de espaço inválido");
        }

        return new Espaco(
            Number(id),
            obj.nome,
            obj.tipo,
            obj.capacidade,
            obj.preco,
            obj.filialId,
            obj.enderecoId,
            obj.imagemURL || null
        );
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            tipo: this.tipo,
            capacidade: this.capacidade,
            preco: this.preco,
            filialId: this.filialId,
            enderecoId: this.enderecoId,
            imagemURL: this.imagemURL
        };
    }

}