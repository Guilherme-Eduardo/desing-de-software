"use client";

import { useEffect, useState } from "react";

import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ClearIcon from '@mui/icons-material/Clear';   // <-- FALTAVA ISSO !!!

import Header from "../components/Header.js";
import { criarEndereco, listarEnderecos, removerEndereco } from "../lib/api.js";
import ModalEnderecoUpdate from "./components/ModalEnderecoUpdate.js";


export default function CadastroEnderecoPage() {
  const [enderecos, setEnderecos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState(null);

  // Carregar endereços ao abrir a página
  useEffect(() => {
    async function carregar() {
      const dados = await listarEnderecos();
      if (dados) setEnderecos(dados);
    }
    carregar();
  }, []);

  // Enviar o formulário
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());

    await criarEndereco(dados);              // cria o endereço

    const atualizada = await listarEnderecos(); // recarrega a lista
    setEnderecos(atualizada);

    e.target.reset(); // limpa o formulário
  }

  async function handleRemoveEndereco(id) {
    await removerEndereco(id);
    setEnderecos((prev) => prev.filter(e => e.id !== id));
  }



  return (
    <>
      <Header />
      <div className="flex h-screen w-full items-start justify-center bg-[#fff7e6] gap-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Cadastro de Endereço
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rua */}
            <div>
              <p
                htmlFor="rua"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Rua
              </p>
              <input
                id="rua"
                name="rua"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Rua das Flores"
              />
            </div>

            {/* Número */}
            <div>
              <p
                htmlFor="numero"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Número
              </p>
              <input
                id="numero"
                name="numero"
                type="number"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: 123"
              />
            </div>

            {/* Bairro */}
            <div>
              <p
                htmlFor="bairro"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Bairro
              </p>
              <input
                id="bairro"
                name="bairro"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Centro"
              />
            </div>

            {/* Cidade */}
            <div>
              <p
                htmlFor="cidade"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Cidade
              </p>
              <input
                id="cidade"
                name="cidade"
                type="text"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Curitiba"
              />
            </div>

            {/* Estado */}
            <div>
              <p
                htmlFor="estado"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Estado
              </p>
              <input
                id="estado"
                name="estado"
                type="text"
                maxLength={2}
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: PR"
              />
            </div>

            {/* Complemento (opcional) */}
            <div>
              <p
                htmlFor="complemento"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Complemento (opcional)
              </p>
              <input
                id="complemento"
                name="complemento"
                type="text"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Ex.: Apto 201, Bloco B"
              />
            </div>

            <button
              type="submit"
              className="text-black mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                        hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
            >
              Cadastrar endereço
            </button>
          </form>
        </div>

        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8 h-[640px] overflow-y-auto">

          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Lista de Endereços
          </h1>

          {enderecos.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum endereço cadastrado.</p>
          ) : (
            <ul className="space-y-3">
              {enderecos.map((item) => (
                <div key={item.id} className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800">
                  {/* Botão de deletar */}
                  <button
                    onClick={() => handleRemoveEndereco(item.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <ClearIcon fontSize="medium" />
                  </button>
                  {/* Atualizar */}
                  <button
                    onClick={() => { setOpenModal(true); setDadosEndereco(item); }}
                    className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                  >
                    <SyncAltIcon fontSize="medium" />
                  </button>
                  <div className="flex flex-col">
                    <p className="py-0.5">
                      <span className="font-medium">Rua: </span>
                      {item.rua}
                    </p>
                    <p className="py-0.5">
                      <span className="font-medium">Número: </span>
                      {item.numero}
                    </p>
                    <p className="py-0.5">
                      <span className="font-medium">Bairro: </span>
                      {item.bairro}
                    </p>
                    <p className="py-0.5">
                      <span className="font-medium">Cidade: </span>
                      {item.cidade}
                    </p>
                    <p className="py-0.5">
                      <span className="font-medium">Estado: </span>
                      {item.estado}
                    </p>

                    {item.complemento && (
                      <p className="py-0.5">
                        <span className="font-medium">Complemento: </span>
                        {item.complemento}
                      </p>
                    )}
                  </div>

                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ModalEnderecoUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        dados={dadosEndereco}
        setEnderecos={setEnderecos}
      />
    </>
  );
}
