import ServicoProprietario from "../services/ServicoProprietario.js";

const servicoProprietario = new ServicoProprietario();

/* Lista todos os proprietários */
export async function listarProprietarios(req, res, next) {
  try {
    const proprietarios = await servicoProprietario.listarProprietarios();
    res.json(proprietarios);
  } catch (err) {
    next(err);
  }
}

/* Busca um proprietário pelo id */
export async function obterProprietario(req, res, next) {
  try {
    const { id } = req.params;
    const proprietario = await servicoProprietario.buscarProprietario(Number(id));
    res.json(proprietario);
  } catch (err) {
    next(err);
  }
}

/* Cria um novo proprietário */
export async function criarProprietario(req, res, next) {
  try {
    if (req.body.id) req.body.id = Number(req.body.id);

    const proprietarioCriado = await servicoProprietario.criarProprietario(
      req.body
    );
    res.status(201).json(proprietarioCriado);
  } catch (err) {
    next(err);
  }
}

/* Atualiza um proprietário existente */
export async function atualizarProprietario(req, res, next) {
  try {
    const { id } = req.params;

    if (req.body.id) req.body.id = Number(req.body.id);

    const proprietarioAtualizado =
      await servicoProprietario.atualizarProprietario(Number(id), req.body);

    res.json(proprietarioAtualizado);
  } catch (err) {
    next(err);
  }
}

/* Remove um proprietário */
export async function removerProprietario(req, res, next) {
  try {
    const { id } = req.params;

    await servicoProprietario.removerProprietario(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
