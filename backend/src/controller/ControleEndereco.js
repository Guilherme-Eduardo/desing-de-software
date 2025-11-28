import ServicoEndereco from "../services/ServicoEndereco.js";

const servicoEndereco = new ServicoEndereco ();


export async function criarEndereco (req, res, next) {
  try {
    const criado = await servicoEndereco.criarEndereco(req.body);
    res.status(201).json(criado);
  } catch (err) {
    next(err);
  }
}

export async function listarEnderecos(req, res, next) {
  try {
    const enderecos = await servicoEndereco.listarEnderecos();
    res.json(enderecos);
  } catch (err) {
    next(err);
  }
}
/* Deleta um cliente */
export async function removerEndereco(req, res, next) {
  try {
    const { id } = req.params;
    await servicoEndereco.removerEndereco(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/* Atualiza cliente */
export async function atualizarEndereco(req, res, next) {
  try {
    const { id } = req.params;
    const endereco = await servicoEndereco.atualizarEndereco(id, req.body);
    res.json(endereco);
  } catch (error) {
    next(error);
  }
}