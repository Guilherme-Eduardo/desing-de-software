// src/Controller/SistemaController.js
import ServicoFilial from "../services/ServicoFilial.js";

const servicoFilial = new ServicoFilial();

/* Retorna uma lista com todos os filiais */
export async function listarFiliais(req, res, next) {
  try {
    const filiais = await servicoFilial.listarFiliais();
    res.json(filiais);
  } catch (error) {
    next(error);
  }
}

/* Retorna um Filialpelo ID */
export async function obterFilial(req, res, next) {
  try {
    const { id } = req.params;
    const Filial = await servicoFilial.obterFilialPorId(id);
    res.json(Filial);
  } catch (error) {
    next(error);
  }
}


/* Cria um novo Filial*/
export async function criarFilial(req, res, next) {
  console.log("POST /filiais recebido — body:", req.body);
  try {
    const Filial= await servicoFilial.criaFilial(req.body);
    console.log("Filial criado com sucesso:", cliente);
    res.status(201).json(cliente);
  } catch (error) {
    console.error("Erro em criarFilial controller:", error);
    next(error);
  }
}



/* Atualiza Filial*/
export async function atualizarFilial(req, res, next) {
  try {
    const { id } = req.params;
    const Filial = await servicoFilial.atualizaFilial(id, req.body);
    res.json(Filial);
  } catch (error) {
    next(error);
  }
}


/* Deleta um Filial*/
export async function removerFilial(req, res, next) {
  try {
    const { id } = req.params;
    await servicoFilial.removeFilial(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
