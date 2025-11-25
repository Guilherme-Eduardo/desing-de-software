import { readFile, writeFile } from "fs/promises";

export default class RepositorioEspaco {

  constructor () {
    this.path = "../db/espaco_db.json";
  }

  /* Ler Arquivo de Dados de Espaço */
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
    await writeFile(path, JSON.stringify(lista, null, 2));
  }


  // Insere espaco já criado no arquivo
  async inserirEspaco (espaco) {
    
      const lista = await this.lerJSON ();

      lista.push(espaco);
      
      this.salvarJSON(lista);
}


  // Atualiza um Espaço
  async atualizarEspaco (espaco) {
    
    const lista = await this.lerJSON ();

    const index = list.findIndex(item => item.id == oldSpace.id);
    if (index == -1) {
      console.log ("ERRO! Não foi encontrado o Espaço de atualização.");
      return false;
    }
      
    lista[index] = espaco;

    await this.salvarJSON(lista);
  }

  // Deleta Espaço  
  async deletarEspaco (espaco) {

    const lista_1 = await this.lerJSON ();
    if (lista_1 == [])
      return false;

    const lista_2 = lista_1.filter(item => item.id != espaco.id);
    if (lista_1.length == lista_2.length)
      return false;

    await this.salvarJSON(lista_2);

    return true;
  }
  
  async listarEspacos () {
    return await this.lerJSON();
  }
}
