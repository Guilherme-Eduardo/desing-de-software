import ServicoFilial from "../services/ServicoFilial.js";
import ServicoEndereco from "../services/ServicoEndereco.js";

const servicoFilial = new ServicoFilial();
const servicoEndereco = new ServicoEndereco();

/* Retorna uma lista com todos os filiais */
export async function listarFiliais(req, res, next) {
  try {
    const filiais = await servicoFilial.listarFiliais();
    res.json(filiais);
  } catch (error) {
    next(error);
  }
}

/* Retorna um Filial pelo ID */
export async function obterFilial(req, res, next) {
  try {
    const { id } = req.params;
    const Filial = await servicoFilial.obterFilialPorId(Number(id));
    res.json(Filial);
  } catch (error) {
    next(error);
  }
}

/* Cria um novo Filial */
export async function criarFilial(req, res, next) {

  try {
    const { enderecoId } = req.body;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.enderecoId) req.body.enderecoId = Number(req.body.enderecoId);

    const endereco = await servicoEndereco.buscarPorId(Number(enderecoId));
    if (!endereco) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }

    const filial = await servicoFilial.criaFilial({
      nome: req.body.nome,
      cnpj: req.body.cnpj,
      enderecoId: Number(enderecoId)
    });

    res.status(201).json(filial);

  } catch (error) {
    console.error("Erro em criarFilial controller:", error);
    next(error);
  }
}

/* Atualiza Filial */
export async function atualizarFilial(req, res, next) {
  try {
    const { id } = req.params;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.enderecoId) req.body.enderecoId = Number(req.body.enderecoId);

    if (req.body.enderecoId) {
      const existe = await servicoEndereco.buscarPorId(Number(req.body.enderecoId));
      if (!existe) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }
    }

    const filialAtualizada = await servicoFilial.atualizaFilial(Number(id), req.body);

    if (!filialAtualizada) {
      return res.status(404).json({ error: "Filial não encontrada" });
    }

    res.json(filialAtualizada);

  } catch (error) {
    next(error);
  }
}

/* Deleta um Filial */
export async function removerFilial(req, res, next) {
  try {
    const { id } = req.params;
    await servicoFilial.removeFilial(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
