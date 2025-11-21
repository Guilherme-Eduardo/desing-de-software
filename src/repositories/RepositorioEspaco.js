import { readFile, writeFile } from "fs/promises";
import path from "path";
import Espaco from "../entities/Espaco.js";

/* Ler Arquivo de Dados de Espaço */
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

// Verifica se um já existe um espaço
async function findEspaco(path, space) {

    const reservas = await readJSON(path);

    return reservas.find(item =>
        item.id === space.id &&
        item.capacidade === space.capacidade &&
        item.preco === space.preco &&
        item.tipo === space.tipo
    ) || null;
}

// Insere espaco já criado no arquivo
async function insertEspaco (path, space) {

    const list = await readJSON (path);

    list.push(space);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um Espaço
async function updateEspaco (path, space) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == space.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Espaço de atualização.");
        return;
    }
    
    list[index] = space;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta Espaço
async function deleteEspaco (path, space) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != space.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


