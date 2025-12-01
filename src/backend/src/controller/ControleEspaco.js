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
    const dados = req.body;

    if (dados.enderecoId) dados.enderecoId = Number(dados.enderecoId);

    const imagem = req.file;
    const novoEspaco = await servicoEspaco.criarEspaco(dados, imagem);
    res.status(201).json(novoEspaco);
  } catch (error) {
    next(error);
  }
}

/* Atualiza as informações de um determinado espaço */
export async function atualizarEspaco(req, res, next) {
  try {
    const { id } = req.params;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.enderecoId) req.body.enderecoId = Number(req.body.enderecoId);

    const espacoAtualizado = await servicoEspaco.atualizarEspaco(Number(id), req.body);

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

    const removed = await servicoEspaco.removerEspaco(Number(id));

    if (!removed) {
      return res.status(404).json({ erro: "Espaço não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
