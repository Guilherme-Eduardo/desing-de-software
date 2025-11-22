import { readFile, writeFile } from "fs/promises";
import path from "path";
import Cliente from "../entities/Cliente.js";

/* Ler Arquivo de Dados de Cliente */
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

// Verifica se um já existe um cliente
async function findCliente(path, client) {

    const clients = await readJSON(path);

    return clients.find(item =>
        item.id === client.id &&
        item.nome === client.nome &&
        item.data_nascimento === client.data_nascimento &&
        item.cpf === client.cpf &&
        item.email === client.email &&
        item.telefone === client.telefone
    ) || null;
}

// Insere cliente já criado no arquivo
async function insertCliente(path, client) {

    const list = await readJSON (path);

    list.push(client);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um cliente
async function updateCliente(path, client) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == client.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Cliente de atualização.");
        return;
    }
    
    list[index] = client;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta cliente
async function deleteCliente(path, client) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != client.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


