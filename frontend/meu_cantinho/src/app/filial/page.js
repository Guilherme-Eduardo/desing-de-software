"use client";

import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import Header from "../components/Header.js";
import ModalFilialUpdate from "./components/ModalFilialUpdate.js";
import { criarFilial, listarEnderecos, listarFiliais } from "../lib/api.js";


export default function CadastroFilialPage() {
  const [filiais, setfiliais] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dadosFilial, setDadosFilial] = useState(null);
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const dados = await listarFiliais();
      const end = await listarEnderecos();
      if (dados) setfiliais(dados);
      if (end) setEnderecos(end);
    }
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());

    await criarFilial(dados);

    const atualizada = await listarFiliais();
    setfiliais(atualizada);

    e.target.reset();
  }

  async function handleRemoveFilial(id) {
    try {
      await removerCliente(id);
      const atualizada = await listarFiliais();
      setfiliais(atualizada);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <Header />

      <div className="flex flex-row gap-8 w-full min-h-screen items-start justify-center bg-[#fff7e6] p-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Cadastro de Filial
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nome */}
            <div>
              <label htmlFor="razao_social" className="block text-sm font-medium text-gray-700 mb-1">
                Razão Social
              </label>
              <input
                id="razao_social"
                name="razao_social"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Gui & Helo Comércio e Locação de espaços LTDA"
              />
            </div>

            {/* Documento */}
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                Documento (CNPJ)
              </label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: 123.456.789-00"
              />
            </div>
            <div>
              <label
                htmlFor="endereco"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Endereco
              </label>
              <select
                id="enderecoId"
                name="enderecoId"
                required
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
              Cadastrar filial
            </button>
          </form>
        </div>

        {/* --- LISTAGEM --- */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Lista de filiais
          </h1>

          {filiais.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhuma filial cadastrada.</p>
          ) : (
            <div className="space-y-3">
              {filiais.map((item) => (

                <div
                  key={item.id}
                  className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                >
                  {/* Botão de deletar */}
                  <button
                    onClick={() => handleRemoveCliente(item.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <ClearIcon fontSize="medium" />
                  </button>
                  {/* Atualizar */}
                  <button
                    onClick={() => { setOpenModal(true); setDadosFilial(item); }}
                    className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                  >
                    <SyncAltIcon fontSize="medium" />
                  </button>
                  <p><strong>Nome:</strong> {item.nome}</p>
                  <p><strong>Documento:</strong> {item.cpf}</p>
                  <p><strong>Telefone:</strong> {item.telefone}</p>
                  <p><strong>estado:</strong> {item.estado}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalFilialUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        dados={dadosFilial}
        setfiliais={setfiliais}
      />
    </>
  );
}