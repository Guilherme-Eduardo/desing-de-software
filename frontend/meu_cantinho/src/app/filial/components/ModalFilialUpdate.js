"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarFilial, listarFiliais } from "../../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalFilialUpdate({ open, onClose, dados, setFiliais, enderecos }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    cnpj: "",
    enderecoId: "",
  });

  // Preenche os campos ao abrir o modal
  useEffect(() => {
    if (dados) {
      setForm({
        id: dados.id ?? "",
        nome: dados.nome ?? "",
        cnpj: dados.cnpj ?? "",
        enderecoId: dados.enderecoId ?? "",
      });
    }
  }, [dados]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("ENVIANDO UPDATE:", form);
    console.log("ID que estou mandando para atualizarFilial:", form.id);

    await atualizarFilial(form.id, form);

    if (setFiliais) {
      const lista = await listarFiliais();
      setFiliais(lista);
    }

    onClose();
  }

  return (
    <Modal
      aria-pledby="modal-atualizar-filial"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
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

          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Atualizar Filial
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ID OCULTO */}
            <input type="hidden" name="id" value={form.id} />

            {/* Nome */}
            <div>
              <p htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Razão Social
              </p>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* CNPJ */}
            <div>
              <p htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ
              </p>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                required
                value={form.cnpj}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            {/* Endereço */}
            <div>
              <p htmlFor="enderecoId" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </p>
              <div
                id="enderecoId"
                name="enderecoId"
                required
                value={form.enderecoId}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <p value="">Selecione um endereço...</p>

                {enderecos.map((end) => (
                  <p key={end.id} value={end.id}>
                    {end.rua}, {end.numero} — {end.cidade}/{end.estado}
                  </p>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
              hover:bg-orange-600 focus:ring-2 focus:ring-orange-400"
            >
              Atualizar filial
            </button>

          </form>
        </div>
      </div>
    </Modal>
  );
}
