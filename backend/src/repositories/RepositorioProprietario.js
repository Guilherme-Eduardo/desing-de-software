import { readFile, writeFile } from "fs/promises";
import path from "path";
import Proprietario from "../entities/Proprietario.js";

// Ler Arquivo de Dados de Proprietário 
async function readJSON(path) {
  
  try {
    const texto = await readFile(path, "utf-8");
    return JSON.parse(texto); 
  } 
  
  // Se o arquivo não existir ou estiver vazio
  catch (err) {
    return [];
  }
}

// Verifica se um já existe um proprietário
async function findProprietario (path, owner) {

    const clients = await readJSON(path);

    return clients.find(item =>
        item.id === owner.id &&
        item.nome === owner.nome &&
        item.data_nascimento === owner.data_nascimento &&
        item.cpf === owner.cpf.cpf &&
        item.email === owner.email &&
        item.telefone === owner.telefone
    ) || null;
}

// Insere proprietário já criado no arquivo
async function insertProprietario (path, owner) {

    const list = await readJSON (path);

    list.push(owner);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um cliente
async function updateProprietario (path, owner) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == owner.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Cliente de atualização.");
        return;
    }
    
    list[index] = client;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta cliente
async function deleteProprietario (path, owner) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != owner.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


