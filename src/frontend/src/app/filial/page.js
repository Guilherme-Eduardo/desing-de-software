"use client";

import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import Header from "../components/Header.js";
import ModalFilialUpdate from "./components/ModalFilialUpdate.js";
import { criarFilial, listarEnderecos, listarFiliais, removerFilial } from "../lib/api.js";


export default function CadastroFilialPage() {
  const [filiais, setFiliais] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dadosFilial, setDadosFilial] = useState(null);
  const [enderecos, setEnderecos] = useState([]);

  /* Carrega as informações de filiais para o front*/ 
  useEffect(() => {
    async function carregar() {
      const dados = await listarFiliais();
      const end = await listarEnderecos();
      if (dados) setFiliais(dados);
      if (end) setEnderecos(end);
    }
    carregar();
  }, []);

  /* Envia uma requisicao para criar uma filial*/
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());

    await criarFilial(dados);

    const atualizada = await listarFiliais();
    setFiliais(atualizada);

    e.target.reset();
  }

  /* Remove uma filial e mantem os dados atualizados no front*/
  async function handleRemoveFilial(id) {
    try {
      await removerFilial(id);
      const atualizada = await listarFiliais();
      setFiliais(atualizada);
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

            <div>
              <p htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Razão Social
              </p>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Gui & Helo Comércio e Locação de espaços LTDA"
              />
            </div>

            <div>
              <p htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                Documento (CNPJ)
              </p>
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

        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Lista de filiais
          </h1>

          {filiais.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhuma filial cadastrada.</p>
          ) : (
            <div className="space-y-3">
              {filiais.map((item) => {
                const enderecoFilial = enderecos.find(e => e.id == item.enderecoId);

                return (
                  <div
                    key={item.id}
                    className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                  >
                    <button
                      onClick={() => handleRemoveFilial(item.id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      <ClearIcon fontSize="medium" />
                    </button>

                    <button
                      onClick={() => { setOpenModal(true); setDadosFilial(item); }}
                      className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                    >
                      <SyncAltIcon fontSize="medium" />
                    </button>

                    <p className="py-0.5"><span className="font-medium">Razão Social:</span> {item.nome}</p>
                    <p className="py-0.5"><span className="font-medium">CNPJ:</span> {item.cnpj}</p>

                    {enderecoFilial && (
                      <>
                        <p className="py-0.5"><span className="font-medium">Endereço:</span> {enderecoFilial.rua}, {enderecoFilial.numero}</p>
                        <p className="py-0.5"><span className="font-medium">Cidade:</span> {enderecoFilial.cidade}/{enderecoFilial.estado}</p>
                      </>
                    )}

                  </div>
                );
              })}

            </div>
          )}
        </div>
      </div>
      <ModalFilialUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        dados={dadosFilial}
        setFiliais={setFiliais}
        enderecos={enderecos}
      />
    </>
  );
}