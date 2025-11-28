// src/Controller/SistemaController.js
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
  } catch (error) {
    console.log("Erro ao retornar reservas => [GET /reservas]", error);
    next(error);
  }
}


/* Cria uma nova reserva no sistema */
export async function criarReserva(req, res, next) {
  try {
    const { inicio, fim, espacoID, clienteID} = req.body;

    // Verificar se cliente existe
    const existeCliente = servicoCliente.verificaValidade (clienteID);
    if (!existeCliente)
      return res.status(404).json({ erro: "Cliente não encontrado" })

    // VErificar se espaço existe
    const existeEspaco = servicoEspaco.verificaValidade (espacoID);
    if (!existeEspaco)
      return res.status(404).json({ erro: "Espaço não encontrado" })

    const total = await servicoEspaco.getTotal(espacoID);

    // Verificar se espaço está disponível
    const disponivel = servicoReserva.verificaDisponibilidade (espacoID, inicio, fim);
    if (!disponivel)
        return res.status(404).json({ erro: "Não há disponibilidade" })

    const novaReserva = await servicoReserva.criarReserva(req.body, total);
    res.status(201).json(novaReserva);
  } catch (error) {
    next(error);
  }
}

/* Atualiza uma determinada reserva do sistema */
export async function atualizarReserva(req, res, next) {
  try {
    const { id } = req.params;
    const reservaAtualizada = await servicoReserva.atualizarReserva(id, req.body);

    if (!reservaAtualizada) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.json(reservaAtualizada);
  } catch (error) {
    next(error);
  }
}


// export async function pagarReserva (req, res, next) {

//   try {
//     const { reservaID, valor_pago } = req.body;

//     const pagamentoID = servicoReserva.getPagamentoID(reservaID);

//     const statusPagamento = servicoPagamento.processarPagamento(pagamentoID, valor_pago);

//     if (statusPagamento == StatusPagamento.PENDENTE)
//       return false;

//     if (statusPagamento == StatusPagamento.SINAL) {
//       servicoReserva.atualizarStatus(StatusReserva.RESERVADO);
//     }

//     if (statusPagamento == StatusPagamento.APROVADO) { 
//       servicoReserva.atualizarStatus(StatusReserva.CONFIRMADO);
//     }

//     return true;

//   }
//   catch (next) {
//     throw new Error ("Não foi possível atualizar o status do pagamento.");
//   }
// }


/* Remove do sistema uma determinada reserva */
export async function removerReserva(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await servicoReserva.removerReserva(id);

    if (!deleted) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}



