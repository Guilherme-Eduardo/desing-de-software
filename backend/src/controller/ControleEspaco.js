import ServicoEspaco from "../services/ServicoEspaco.js";

const servicoEspaco = new ServicoEspaco();


/* Retorna todos os espaços cadastrados */
export async function listarEspacos(req, res, next) {
  try {
    const espacos = await servicoEspaco.listarEspacos();
    res.json(espacos);
  } catch (error) {
    next(error);
  }
}


/* Insere um novo espaço no sistema */
export async function criarEspaco(req, res, next) {
  try {
    const novoEspaco = await servicoEspaco.criarEspaco(req.body);
    res.status(201).json(novoEspaco);
  } catch (error) {
    next(error);
  }
}


/* Atualiza as informações de um determinado espaço */
export async function atualizarEspaco(req, res, next) {
  try {
    const { id } = req.params;
    const espacoAtualizado = await servicoEspaco.atualizarEspaco(id, req.body);

    if (!espacoAtualizado) {
      return res.status(404).json({ erro: "Espaço não encontrado" });
    }

    res.json(espacoAtualizado);
  } catch (error) {
    next(error);
  }
}


/* Remove um espaço */
export async function removerEspaco(req, res, next) {
  try {
    const { id } = req.params;
    const removed = await servicoEspaco.removerEspaco(id);

    if (!removed) {
      return res.status(404).json({ erro: "Espaço não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}