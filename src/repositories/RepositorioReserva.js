import { readFile, writeFile } from "fs/promises";
import path from "path";
import Reserva from "../entities/Reserva.js";

/* Ler Arquivo de Dados de Reserva */
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

// Verifica se um já existe uma reserva
async function findReserva (path, reservation) {

    const reservas = await readJSON(path);

    return reservas.find(item =>
        item.id === reservation.id &&
        item.data_reserva === reservation.data_reserva &&
        item.status === item.status
    ) || null;
}

// Insere reserva já criado no arquivo
async function insertReserva (path, reservation) {

    const list = await readJSON (path);

    list.push(reservation);

    await writeFile(path, JSON.stringify(list, null, 2));
}


// Atualiza um reserva
async function updateReserva (path, reservation) {

    const list = await readJSON (path);

    const index = list.findIndex(item => item.id == reservation.id);
    if (index == -1) {
        console.log ("ERRO! Não foi encontrado o Reserva de atualização.");
        return;
    }
    
    list[index] = reservation;

    await writeFile(path, JSON.stringify(list, null, 2));
}

// Deleta reserva
async function deleteReserva (path, reservation) {

    const listOld = await readJSON (path);

    const listNew = listOld.filter(item => item.id != reservation.id);
    
    await writeFile(path, JSON.stringify(listNew, null, 2));
}


