"use client";

import { criarEspaco } from "../lib/api";

export default function CadastroEspacoPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());
    console.log("Dados do espaço:", dados);

    await criarEspaco(dados);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#fff7e6]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
        <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
          Cadastro de Espaço
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome do espaço */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do espaço
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: Salão Principal, Chácara Verde"
            />
          </div>

          {/* Tipo do espaço */}
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de espaço
            </label>
            <input
              id="tipo"
              name="tipo"
              type="text"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: Salão de festas, Chácara, Quadra esportiva"
            />
          </div>

          {/* Capacidade */}
          <div>
            <label
              htmlFor="capacidade"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Capacidade (pessoas)
            </label>
            <input
              id="capacidade"
              name="capacidade"
              type="number"
              min="0"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: 100"
            />
          </div>

          {/* Preço por hora / diária */}
          <div>
            <label
              htmlFor="preco"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preço base (ex.: diária ou hora)
            </label>
            <input
              id="preco"
              name="preco"
              type="number"
              min="0"
              step="0.01"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: 500.00"
            />
          </div>

          {/* Id da filial (opcional, se você estiver relacionando) */}
          <div>
            <label
              htmlFor="filialId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID da filial (opcional)
            </label>
            <input
              id="filialId"
              name="filialId"
              type="text"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: filial-01"
            />
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: Espaço amplo, cozinha equipada, estacionamento para 20 carros..."
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                       hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
          >
            Cadastrar espaço
          </button>
        </form>
      </div>
    </div>
  );
}
