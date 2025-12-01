"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarEspaco, listarEspacos } from "../../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalEspacoUpdate({ open, onClose, dados, setEspacos, enderecos }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    tipo: "",
    capacidade: "",
    preco: "",
    enderecoId: "",
  });

  // Preenche o formulário quando os dados do espaco mudarem
  useEffect(() => {
    if (dados) {
      setForm({
        id: dados.id ?? "",
        nome: dados.nome ?? "",
        tipo: dados.tipo ?? "",
        capacidade: dados.capacidade ?? "",
        preco: dados.preco ?? "",
        enderecoId: dados.enderecoId ?? "",
      });
    }
  }, [dados]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();


    console.log ("FORMS: ", form);
    const formData = new FormData(e.target);
    await atualizarEspaco(form.id, formData);


    if (setEspacos) {
      const atualizada = await listarEspacos();
      setEspacos(atualizada);
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
            id="modal-atualizar-espaco"
            className="mb-4 text-xl font-semibold text-gray-800"
          >
            Atualizar espaco
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome do espaço */}
            <div>
              <p
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome do espaço
              </p>
              <input
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                required
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Salão Principal, Chácara Verde"
              />
            </div>

            {/* Tipo do espaço */}
            <div>
              <p
                htmlFor="tipo"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de espaço
              </p>
              <input
                id="tipo"
                name="tipo"
                type="text"
                value={form.tipo}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Salão de festas, Chácara, Quadra esportiva"
              />
            </div>

            {/* Capacidade */}
            <div>
              <p
                htmlFor="capacidade"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Capacidade (pessoas)
              </p>
              <input
                id="capacidade"
                name="capacidade"
                type="number"
                value={form.capacidade}
                onChange={handleChange}
                min="0"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: 100"
              />
            </div>

            {/* Preço por hora / diária */}
            <div>
              <p
                htmlFor="preco"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Preço base (ex.: diária ou hora)
              </p>
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                value={form.preco}
                onChange={handleChange}
                step="0.01"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: 500.00"
              />
            </div>



            <div>
              <p
                htmlFor="endereco"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Endereco
              </p>
              <select
                id="enderecoId"
                name="enderecoId"
                required
                value={form.enderecoId}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
               focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                <option value="">Selecione um endereço...</option>

                {enderecos.map((end) => (
                  <option key={end.id} value={end.id}>
                    {end.rua}, {end.numero} — {end.cidade}/{end.estado}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                       hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
            >
              Atualizar espaço
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
