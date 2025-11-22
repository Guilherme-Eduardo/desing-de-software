import { readFile, writeFile } from "fs/promises";
import path from "path";
import Pagamento from "../entities/Pagamento.js";

/* Ler Arquivo de Dados de Pagamento */
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

// Verifica se um já existe um pagamento
async function findPagamento(path, payment) {

    const reservas = await readJSON(path);

    return reservas.find(item =>
        item.valor_pago === payment.valor_pago &&
        item.total === payment.total &&
        item.status === item.status
    ) || null;
}

// Insere pagamento já criado no arquivo
async function insertPagamento(path, payment) {

    const list = await readJSON (path);

    list.push(payment);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um pagamento
async function updatePagamento(path, payment) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == payment.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Pagamento de atualização.");
        return;
    }
    
    list[index] = payment;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta pagamento
async function deletePagamento(path, payment) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != payment.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


