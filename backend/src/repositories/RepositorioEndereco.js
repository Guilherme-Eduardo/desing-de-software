import { readFile, writeFile } from "fs/promises";
import path from "path";
import Endereco from "../entities/Endereco.js";

/* Ler Arquivo de Dados de Endereço */
async function readJSON(path) {
  
  try {
    const texto = await readFile(path, "utf-8");
    return JSON.parse(texto); // transforma texto em objeto/array
  } 
  
  // Se o arquivo não existir ou estiver vazio
  catch (err) {
    return [];
  }
}

// Verifica se um já existe um endereço
async function findEndereco (path, address) {

    const enderecos = await readJSON(path);

    return enderecos.find(item =>
        item.id === address.id &&
        item.rua === address.rua &&
        item.numero === address.numero &&
        item.bairro === address.bairro &&
        item.cidade === address.cidade &&
        item.estado === address.estado && 
        item.complemento === address.complemento
    ) || null;
}

// Insere endereço já criado no arquivo
async function insertEndereco (path, address) {

    const list = await readJSON (path);

    list.push(address);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um endereço
async function updateEndereco (path, address) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == address.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Endereço de atualização.");
        return;
    }
    
    list[index] = address;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta endereço
async function deleteEndereco (path, adress) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != adress.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


