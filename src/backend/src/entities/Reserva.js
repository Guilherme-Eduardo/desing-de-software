// Reserva.js
export default class Reserva {
  
  constructor(id, inicio, fim, espaco, cliente, status, pagamento) {
    this.id = Number(id);
    this.inicio = inicio;
    this.fim = fim;
    this.espaco = espaco;
    this.cliente = cliente;
    this.status = status;
    this.pagamento = pagamento;
  }

  getPagamento() {
    return this.pagamento;
  }

  getPagamentoId() {
    return this.pagamento?.id;
  }

  setInicio(inicio) { this.inicio = inicio; }
  setFim(fim) { this.fim = fim; }
  setEspaco(espaco) { this.espaco = espaco; }
  setCliente(cliente) { this.cliente = cliente; }
  setStatus(status) { this.status = status; }
  setPagamento(pagamento) { this.pagamento = pagamento; }

  static fromObject(id, obj) {
    if (!obj) return null;

    return new Reserva(
      id,
      obj.inicio,
      obj.fim,
      obj.espaco ?? obj.espacoId,
      obj.cliente ?? obj.clienteId,
      obj.status,
      obj.pagamento
    );
  }

  toJSON() {
    return {
      id: this.id,
      inicio: this.inicio,
      fim: this.fim,
      espaco: this.espaco,
      cliente: this.cliente,
      status: this.status,
      pagamento: this.pagamento
    };
  }
}
