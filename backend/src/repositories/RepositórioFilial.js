// src/repositories/RepositorioFilial.js
import { readFile, writeFile } from "fs/promises";
import path from "path";
import Filial from "../entities/Filial.js";

/* Lê arquivo JSON (lista de filiais) */
async function readJSON(caminho) {
  try {
    const texto = await readFile(caminho, "utf-8");
    return JSON.parse(texto);
  } catch (err) {
    // Se o arquivo não existir ou estiver vazio, retornamos lista vazia
    return [];
  }
}

/* Escreve arquivo JSON */
async function writeJSON(caminho, dados) {
  await writeFile(caminho, JSON.stringify(dados, null, 2));
}

export default class RepositorioFilial {
  constructor() {
    // Ajuste o caminho conforme sua estrutura de pastas
    this.caminhoArquivo = path.resolve("db", "filiais.json");
  }

  /* Retorna todas as filiais */
  async listarTodas() {
    const lista = await readJSON(this.caminhoArquivo);
    // Converte cada item para entidade Filial
    return lista.map((item) => Filial.fromObject(item));
  }

  /* Busca uma filial pelo id */
  async buscarPorId(id) {
    const lista = await readJSON(this.caminhoArquivo);
    const encontrado = lista.find((item) => String(item.id) === String(id));
    return encontrado ? Filial.fromObject(encontrado) : null;
  }

  /* Cria uma nova filial */
  async criar(filialDados) {
    const lista = await readJSON(this.caminhoArquivo);

    const filial =
      filialDados instanceof Filial
        ? filialDados
        : Filial.fromObject(filialDados);

    const jaExiste = lista.some(
      (item) => String(item.id) === String(filial.id)
    );

    if (jaExiste) {
      const erro = new Error("Já existe uma filial com este id");
      erro.status = 409;
      throw erro;
    }

    lista.push(filial.toJSON());
    await writeJSON(this.caminhoArquivo, lista);

    return filial;
  }

  /* Atualiza uma filial existente */
  async atualizar(id, dadosAtualizados) {
    const lista = await readJSON(this.caminhoArquivo);

    const index = lista.findIndex((item) => String(item.id) === String(id));
    if (index === -1) {
      return null; // quem chamar decide se lança erro 404
    }

    const atual = lista[index];

    const filialAtualizada = Filial.fromObject({
      ...atual,
      ...dadosAtualizados,
      id // garante que o id não seja sobrescrito
    });

    lista[index] = filialAtualizada.toJSON();
    await writeJSON(this.caminhoArquivo, lista);

    return filialAtualizada;
  }

  /* Remove uma filial */
  async remover(id) {
    const lista = await readJSON(this.caminhoArquivo);
    const novaLista = lista.filter((item) => String(item.id) !== String(id));

    if (novaLista.length === lista.length) {
      // nada foi removido
      return false;
    }

    await writeJSON(this.caminhoArquivo, novaLista);
    return true;
  }
}
