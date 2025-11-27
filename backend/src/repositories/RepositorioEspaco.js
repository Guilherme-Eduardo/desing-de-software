import { readFile, writeFile } from "fs/promises";

export default class RepositorioEspaco {

  constructor () {
    this.path = "./db/espaco_db.json";
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
    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }


  async buscarEspaco(espaco) {
    
    const lista = await this.lerJSON();

    const ind = lista.find(item =>
      item.capacidade === espaco.capacidade &&
      item.preco === espaco.preco &&
      item.tipo === espaco.tipo &&
      item.endereco.rua === espaco.endereco.rua &&
      item.endereco.numero === espaco.endereco.numero &&
      item.endereco.bairro === espaco.endereco.bairro &&
      item.endereco.cidade === espaco.endereco.cidade &&
      item.endereco.estado === espaco.endereco.estado &&
      item.endereco.cep === espaco.endereco.cep
    );

    if (ind == undefined)
      return false;

    return true;
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
    if (lista_1.length == 0) 
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
