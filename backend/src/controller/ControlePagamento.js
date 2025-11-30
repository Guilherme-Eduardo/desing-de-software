// src/Controller/SistemaController.js
import ServicoPagamento from "../services/ServicoPagamento.js";

const servicoPagamento = new ServicoPagamento();

/* Retorna uma lista de pagamentos */
export async function listarPagamentos(req, res, next) {
  try {
    const pagamentos = await servicoPagamento.listarPagamentos();
    res.json(pagamentos);
  } catch (err) {
    next(err);
  }
}

/* Registra um pagamento no sistema */
export async function criarPagamento(req, res, next) {
  try {
    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.reservaId) req.body.reservaId = Number(req.body.reservaId);

    const pagamento = await servicoPagamento.registrarPagamento(req.body);
    res.status(201).json(pagamento);
  } catch (err) {
    next(err);
  }
}

/* Atualiza um pagamento */
export async function atualizarPagamento(req, res, next) {
  try {
    const { id } = req.params;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.reservaId) req.body.reservaId = Number(req.body.reservaId);

    const pagamentoAtualizado = await servicoPagamento.processarPagamento(
      Number(id),
      req.body
    );

    if (!pagamentoAtualizado) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    res.json(pagamentoAtualizado);
  } catch (err) {
    next(err);
  }
}

/* Remove um pagamento */
export async function removerPagamento(req, res, next) {
  try {
    const { id } = req.params;

    const removido = await servicoPagamento.removerPagamento(Number(id));

    if (!removido) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
