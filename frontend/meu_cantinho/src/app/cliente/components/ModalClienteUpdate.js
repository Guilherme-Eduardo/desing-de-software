"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarCliente, listarClientes } from "../../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalClienteUpdate({ open, onClose, dados, setClientes }) {
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    telefone: "",
    email: "",
  });

  // Preenche o formulário quando os dados do cliente mudarem
  useEffect(() => {
    if (dados) {
      setForm({
        nome: dados.nome || "",
        documento: dados.documento || "",
        telefone: dados.telefone || "",
        email: dados.email || "",
      });
    }
  }, [dados]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await atualizarCliente(form);

    if (setClientes) {
      const atualizada = await listarClientes();
      setClientes(atualizada);
    }

    onClose();
  }

  return (
    <Modal
      aria-labelledby="modal-atualizar-cliente"
      aria-describedby="modal-atualizar-cliente-descricao"
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
      {/* Wrapper para centralizar na tela */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-lg p-6 pb-16 rounded-lg bg-[#fff7e6] shadow-lg">
          {/* Botão X no canto superior direito */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <ClearIcon />
          </button>

          <h2
            id="modal-atualizar-cliente"
            className="mb-4 text-xl font-semibold text-gray-800"
          >
            Atualizar cliente
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: João da Silva"
              />
            </div>

            {/* Documento */}
            <div>
              <label
                htmlFor="documento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Documento (CPF ou RG)
              </label>
              <input
                id="documento"
                name="documento"
                type="text"
                required
                value={form.documento}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: 123.456.789-00"
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="text"
                value={form.telefone}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: (41) 99999-9999"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="cliente@exemplo.com"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
            >
              Atualizar cliente
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
