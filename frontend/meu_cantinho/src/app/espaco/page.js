"use client";

import { useEffect, useState } from "react";

import Header from "../components/Header.js";
import { criarEspaco, listarEspacos } from "../lib/api.js";

export default function CadastroEspacoPage() {
  const [espacos, setEspacos] = useState([]);

  // Carregar endereços ao abrir a página
  useEffect(() => {
    async function carregar() {
      const dados = await listarEspacos();
      if (dados) setEspacos(dados);
    }
    carregar();
  }, []);

  // Enviar o formulário
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());

    await criarEspaco(dados);              // cria o endereço

    const atualizada = await listarEspacos(); // recarrega a lista
    setEspacos(atualizada);

    e.target.reset(); // limpa o formulário
  }

  return (
    <>
      <Header />

    <div className="flex h-screen w-full items-start justify-center bg-[#fff7e6] gap-12">
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
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: Salão Principal, Chácara Verde"
            />
          </div>

          {/* Tipo do espaço */}
          <div>
            <label
              htmlFor="tipo"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de espaço
            </label>
            <input
              id="tipo"
              name="tipo"
              type="text"
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: Salão de festas, Chácara, Quadra esportiva"
            />
          </div>

          {/* Capacidade */}
          <div>
            <label
              htmlFor="capacidade"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              Capacidade (pessoas)
            </label>
            <input
              id="capacidade"
              name="capacidade"
              type="number"
              min="0"
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: 100"
            />
          </div>

          {/* Preço por hora / diária */}
          <div>
            <label
              htmlFor="preco"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              Preço base (ex.: diária ou hora)
            </label>
            <input
              id="preco"
              name="preco"
              type="number"
              min="0"
              step="0.01"
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: 500.00"
            />
          </div>

          {/* Id da filial (opcional, se você estiver relacionando) */}
          <div>
            <label
              htmlFor="filialId"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              ID da filial (opcional)
            </label>
            <input
              id="filialId"
              name="filialId"
              type="text"
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Ex.: filial-01"
            />
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="descricao"
              className="text-black block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={3}
              className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
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

       <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">

          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Lista de Espaços
          </h1>

          {espacos.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum espaço cadastrado.</p>
          ) : (
            <ul className="space-y-3">
              {espacos.map((item, idx) => (
                <li key={idx} className="border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800">
                  <p><strong>Cpacidade:</strong> {item.capacidade}</p>
                  <p><strong>Preço:</strong> {item.preco}</p>
                  <p><strong>Tipo:</strong> {item.tipo}</p>
                  <p><strong>Endereço:</strong> {item.endereco.rua}</p>
                </li>
              ))}
            </ul>
          )}

        </div>

    </div>
  </>
  );
}
