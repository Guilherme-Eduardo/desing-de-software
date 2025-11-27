"use client";

import Header from "../components/Header.js";
import { criarEndereco } from "../lib/api.js";

export default function CadastroEnderecoPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());
    console.log("Dados do endereço:", dados);

    await criarEndereco(dados);
  }

  return (
    <>    
      <Header />
      <div className="flex h-screen w-full items-center justify-center bg-[#fff7e6]">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Cadastro de Endereço
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rua */}
            <div>
              <label
                htmlFor="rua"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Rua
              </label>
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
              <label
                htmlFor="numero"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Número
              </label>
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
              <label
                htmlFor="bairro"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Bairro
              </label>
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
              <label
                htmlFor="cidade"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Cidade
              </label>
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
              <label
                htmlFor="estado"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Estado
              </label>
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
              <label
                htmlFor="complemento"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Complemento (opcional)
              </label>
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
      </div>
    </>
  );
}
