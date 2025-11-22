export default class Periodo {

    constructor (inicio, fim) {

        this.inicio = inicio;
        this.fim = fim;
    }

    getInicio () {return this.inicio; }

    getFim() { return this.fim; }

    setInicio (inicio) { this.inicio = inicio; }

    setFim(fim) { this.fim = fim; }

    duration() {
        return rhis.fim - this.inicio;
    }

    fromObject (obj) {

        if (!obj)
            return new Error ("Obejto Periodo não encontrado.")

        return new Periodo (
            inicio = this.inicio,
            fim = this.fim
        )
    }

    toJSON() {

        return {
            inicio: this.inicio,
            fim: this.fim
        }
    }

}