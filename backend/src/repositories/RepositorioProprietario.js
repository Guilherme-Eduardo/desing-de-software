import { readFile, writeFile } from "fs/promises";

export default class RepositorioProprietario {

  constructor() {
    this.path = "../db/proprietário_db.json";
  }

  // Ler Arquivo de Dados de Proprietário 
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

  // Insere proprietário já criado no arquivo
  async inserirProprietario (proprietario) {
    
    const lista = await this.lerJSON ();

    lista.push(proprietario);

    await this.salvarJSON (lista);
  }

  // Busca um proprietário de mesmo id
  async buscarPorId(id) {

    const lista = await this.lerJSON();

    const index = lista.find(item => item.id == id);
    if (index == -1)
      return null;

    return lista[index]

  }


  // Atualiza um Proprietario
  async atualizarProprietario (proprietario) {

      const lista = await this.lerJSON ();

      const index = list.findIndex(item => item.id == proprietario.id);
      if (index == -1) {
          console.log ("ERRO! Não foi encontrado o Cliente de atualização.");
          return;
      }
      
      lista[index] = proprietario;

      await this.salvarJSON(lista);
  }

  // Deleta cliente
  async deletarProprietario (proprietario) {

      const lista_1 = await this.lerJSON ();
      if (lista_1 == []) {
        console.log ("ERRO! Não há proprietários para deletar.");
        return false;
      }

      const lista_2 = lista_1.filter(item => item.id != owner.id);
      
      if (lista_1.length === lista_2.length) {
        // nada foi removido
        return false;
      }

      await this.salvarJSON(lista_2);

      return true;
  }

  async listarProprietarios () {
    return await this.lerJSON();
  }
}