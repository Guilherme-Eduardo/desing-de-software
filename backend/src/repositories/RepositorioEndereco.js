import { readFile, writeFile } from "fs/promises";

export default class RepositorioEndereco {

  constructor() {
    this.path = "./db/endereco_db.json";
  }

   async proxID () {
    return this.lerJSON().length;
  }

  /* Ler Arquivo de Dados de Endereço */
  async lerJSON() {
    
    try {
      const texto = await readFile(this.path, "utf-8");
      return JSON.parse(texto); // transforma texto em objeto/array
    } 
    
    // Se o arquivo não existir ou estiver vazio
    catch (err) {
      return [];
    }
  }

  async salvarJSON (lista) {
    await writeFile(this.path, JSON.stringify(lista, null, 2));
  }


  async buscarPorId (id) {

    const lista = await this.lerJSON();

    const endereco = lista.find(item => item.id == id);
    
    return endereco;
  }


  async buscarEndereco (endereco) {

    const lista = await this.lerJSON();

    const ind = lista.find(item => item.rua === endereco.rua & 
                                   item.numero === endereco.numero &
                                   item.bairro === endereco.bairro &
                                   item.cidade === endereco.cidade &
                                   item.estado === endereco.estado &
                                   item.complemento === endereco.complemento
    )

    if (ind == undefined)
      return false;

    return true;
  }

  // Insere endereço já criado no arquivo
  async inserirEndereco (endereco) {

    const lista = await this.lerJSON ();

    lista.push(endereco);

    await this.salvarJSON(lista);
  }


  // Atualiza um endereço
  async atualizarEndereco (endereco) {

    const lista = await this.lerJSON ();

    const index = lista.findIndex(item => item.id == endereco.id);
    if (index == -1) {
      console.log ("ERRO! Não foi encontrado o Endereço de atualização.");
      return null;
    }
      
    lista[index] = endereco;
      
    await this.salvarJSON(lista);

    return endereco;
  }

  // Deleta endereço
  async deletarEndereco (id) {

    const lista_1 = await this.lerJSON ();
    if (lista_1.length == 0) 
        return false;

    const lista_2 = lista_1.filter(item => item.id != id);
    if (lista_1.length == lista_2.length)
      return false;

    await this.salvarJSON(lista_2);
    return true;
  }

  async listarEnderecos () {
      return await this.lerJSON();
  }
  
}