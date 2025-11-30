import { readFile, writeFile } from "fs/promises";

export default class RepositorioPagamento {

  constructor () {
    this.path = "./db/pagamentos_db.json";
  }  
  
  // Retorna o tamanho da lista
   async proxID () {
    const list = await this.lerJSON();
    return list.length;
  }

  /* Ler Arquivo de Dados de Pagamento */
  async lerJSON() {
    
    try {
      const texto = await readFile(this.path, "utf-8");
      return JSON.parse(texto); 
    }  
  
    // Se o arquivo não existir ou estiver vazio
    catch (err) {
      return [];
    }
  }

  // Salva uma lista como um arquivo
  async salvarJSON (lista) {

    await writeFile(this.path, JSON.stringify (lista, null, 2));
  }

  // Realiza uma busca por um pagamento através do seu ID
  async buscarPorId(id) {
    const lista = await this.lerJSON();
    const encontrado = lista.find((item) => item.id === id);

    return encontrado ? encontrado : null;
  }

  // Insere pagamento já criado no arquivo
  async inserirPagamento(pagamento) {

      const lista = await this.lerJSON ();

      lista.push(pagamento);

      await this.salvarJSON(lista);
  }


  // Atualiza um pagamento
  async atualizarPagamento(pagamento) {

      const lista = await this.lerJSON ();

      const index = lista.findIndex(item => item.id == pagamento.id);
      if (index == -1) {
          console.log ("ERRO! Não foi encontrado o Pagamento de atualização.");
          return false;
      }
      
      lista[index] = {
        id: pagamento.id,
        total: pagamento.total,
        valor_pago: pagamento.valor_pago, 
        status: pagamento.status
      };

      await this.salvarJSON(lista);

      return true;
  }

    // Deleta pagamento
  async deletarPagamento(pagamento) {

      const lista_1 = await this.lerJSON ();
      if (lista_1.length == 0) {
        console.log ("ERRO! Não há pagamento para ser deletado");
        return false;
      }

      const lista_2 = lista_1.filter(item => item.id != pagamento.id);
      
      if (lista_1.length === lista_2.length) {
        return false;
      }

      await this.salvarJSON(lista_2);

      return true;
  }

  // Retorna uma lista de Pagamentos
  async listarPagamentos () {

    const lista =  await this.lerJSON();

    return lista;
  }
}