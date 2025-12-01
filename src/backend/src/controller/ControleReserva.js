import ServicoReserva from "../services/ServicoReserva.js";
import ServicoCliente from "../services/ServicoCliente.js";
import ServicoEspaco from "../services/ServicoEspaco.js";

const servicoReserva = new ServicoReserva();
const servicoEspaco = new ServicoEspaco();
const servicoCliente = new ServicoCliente();

/* Retorna uma lista de reservas realizadas */
export async function listarReservas(req, res, next) {
  try {
    const reservas = await servicoReserva.listarReservas();
    res.json(reservas);
    console.log("Testando listar reservas: ", reservas);
  } catch (error) {
    console.log("Erro ao retornar reservas => [GET /reservas]", error);
    next(error);
  }
}

/* Cria uma nova reserva no sistema */
export async function criarReserva(req, res, next) {
  try {
    const { inicio, fim, espacoId, clienteId } = req.body;

    if (req.body.id) req.body.id = Number(req.body.id);
    if (req.body.espacoId) req.body.espacoId = Number(req.body.espacoId);
    if (req.body.clienteId) req.body.clienteId = Number(req.body.clienteId);

    const existeCliente = servicoCliente.verificaValidade(Number(clienteId));
    if (!existeCliente)
      return res.status(404).json({ erro: "Cliente não encontrado" });

    const existeEspaco = servicoEspaco.verificaValidade(Number(espacoId));
    if (!existeEspaco)
      return res.status(404).json({ erro: "Espaço não encontrado" });

    const total = await servicoEspaco.getTotal(Number(espacoId));

    const disponivel = await servicoReserva.verificarDisponibilidade(
      Number(espacoId),
      inicio,
      fim
    );

    if (!disponivel)
      return res.status(404).json({ erro: "Não há disponibilidade" });

    const novaReserva = await servicoReserva.criarReserva(req.body, total);
    res.status(201).json(novaReserva);
  } catch (error) {
    next(error);
  }
}

/* Atualiza uma determinada reserva do sistema */
export async function atualizarReserva(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (req.body.espacoId) req.body.espacoId = Number(req.body.espacoId);
    if (req.body.clienteId) req.body.clienteId = Number(req.body.clienteId);

    const reservaAtualizada = await servicoReserva.atualizarReserva(id, req.body);

    if (!reservaAtualizada) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    return res.json(reservaAtualizada);
  } catch (error) {
    console.error("Erro em atualizarReserva:", error);
    next(error);
  }
}


/* Remove do sistema uma determinada reserva */
export async function removerReserva(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await servicoReserva.removerReserva(Number(id));

    if (!deleted) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/* Realiza o pagamento de uma reserva, ou um sinal */
export async function pagarReserva(req, res, next) {

  try {
    const { id } = req.params;
    const { valor_pago } = req.body;

    const reservaId = Number(id);
    const valorNum = Number(valor_pago);

    const resultado = await servicoReserva.pagarReserva(
      reservaId,
      valorNum,
    );

    if (resultado.erro) {
      return res.status(resultado.statusCode || 400).json({
        erro: resultado.erro,
      });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao pagar reserva:", error);
    return next(error);
  }
}