import { readFile, writeFile } from "fs/promises";

export default class RepositorioPagamento {

  constructor () {
    this.path = "./db/pagamentos_db.json";
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

  async salvarJSON (lista) {

    await writeFile(this.path, JSON.stringify (lista, null, 2));
  }

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

      const lista = await lerJSON ();

      const index = lista.findIndex(item => item.id == pagamento.id);
      if (index == -1) {
          console.log ("ERRO! Não foi encontrado o Pagamento de atualização.");
          return false;
      }
      
      lista[index] = pagamento;

      await this.salvarJSON(lista);
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
        // nada foi removido
        return false;
      }

      await this.salvarJSON(lista_2);

      return true;
  }

  async listarPagamentos () {

    const lista =  await this.lerJSON();

    return lista.map((item) => Filial.fromObject(item));
  }

}