"use client";

import { criarCliente } from "../lib/api";

export default function CadastroClientePage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());
    console.log("Dados do cliente:", dados);
    await criarCliente(dados);

  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#fff7e6]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
        <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
          Cadastro de Cliente
        </h1>

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
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: 123.456.789-00"
            />
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="telefone"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="text"
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: (41) 99999-9999"
            />
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="email"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
            Cadastrar cliente
          </button>
        </form>
      </div>
    </div>
  );
}
