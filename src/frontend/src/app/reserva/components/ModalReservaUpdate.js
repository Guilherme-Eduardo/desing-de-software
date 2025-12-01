"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarReserva, listarReservas } from "../../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalReservaUpdate({
  open,
  onClose,
  dados,
  setReservas,
  espacos,
  clientes,
}) {
  const [form, setForm] = useState({
    id: "",
    clienteId: "",
    espacoId: "",
    inicio: "",
    fim: "",
  });

  /* Carrega os dados para o forms */
  useEffect(() => {
    if (!dados) return;

    setForm({
      id: dados.id ?? "",
      clienteId: dados.clienteId ?? dados.cliente ?? "",
      espacoId: dados.espacoId ?? dados.espaco ?? "",
      inicio: dados.inicio ? dados.inicio.slice(0, 10) : "",
      fim: dados.fim ? dados.fim.slice(0, 10) : "",
    });
  }, [dados]);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* Envia uma requisicao para atualizar a reserva */
  async function handleSubmit(e) {
    e.preventDefault();

    await atualizarReserva(form.id, form);

    if (setReservas) {
      const atualizada = await listarReservas();
      setReservas(atualizada);
    }

    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-lg p-6 pb-16 rounded-lg bg-[#fff7e6] shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <ClearIcon />
          </button>

          <h2
            id="modal-atualizar-reserva"
            className="mb-4 text-xl font-semibold text-gray-800"
          >
            Atualizar Reserva
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p
                htmlFor="clienteId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cliente
              </p>
              <select
                id="clienteId"
                name="clienteId"
                required
                value={form.clienteId}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                <option value="">Selecione um cliente</option>
                {clientes?.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p
                htmlFor="espacoId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Espaço
              </p>
              <select
                id="espacoId"
                name="espacoId"
                required
                value={form.espacoId}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                <option value="">Selecione um espaço</option>
                {espacos?.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p
                htmlFor="inicio"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Início
              </p>
              <input
                id="inicio"
                name="inicio"
                type="date"
                required
                value={form.inicio}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <div>
              <p
                htmlFor="fim"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fim
              </p>
              <input
                id="fim"
                name="fim"
                type="date"
                required
                value={form.fim}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
            >
              Atualizar Reserva
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
