"use client";

import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import Header from "../components/Header.js";
import { criarEspaco, listarEnderecos, listarEspacos } from "../lib/api.js";
import ModalEspacoUpdate from "./components/ModalEspacoUpdate.js";

export default function CadastroEspacoPage() {
  const [openModal, setOpenModal] = useState(false);
  const [espacos, setEspacos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [dadosEspaco, setDadosEspaco] = useState([]);

  // Carregar endereços ao abrir a página
  useEffect(() => {
    async function carregar() {
      const dados = await listarEspacos();
      if (dados) setEspacos(dados);

      const end = await listarEnderecos();
      if (end) setEnderecos(end);
    }
    carregar();
  }, []);

  // Enviar o formulário
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Envia os dados incluindo a imagem
    const dados = Object.fromEntries(formData.entries());
    const imagem = formData.get("imagem"); // Captura o arquivo de imagem

    // O backend vai receber o arquivo de imagem e o restante dos dados
    const response = await fetch("http://localhost:3000/espacos", {
      method: "POST",
      body: formData,  // FormData inclui o arquivo de imagem
    });

    if (response.ok) {
      const atualizada = await listarEspacos();
      setEspacos(atualizada);
      e.target.reset();
    } else {
      console.error("Erro ao cadastrar espaço");
    }
  }

  async function removerEspaco(id) {
    try {
      await fetch(`http://localhost:3000/espacos/${id}`, {
        method: "DELETE",
      });

      // Atualiza a lista no front removendo a reserva deletada
      setEspaco((prev) => prev.filter((r) => r.id !== id));

    } catch (err) {
      console.error("Erro ao deletar espaco", err);
    }
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
            {/* Imagem do espaço */}
            <div>
              <label
                htmlFor="imagem"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Imagem do espaço
              </label>
              <input
                id="imagem"
                name="imagem"
                type="file"
                accept="image/*"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
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

        <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8 h-[680px] overflow-y-auto">

          <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Lista de Espaços
          </h1>

          {espacos.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum espaço cadastrado.</p>
          ) : (
            <ul className="space-y-3">
              {espacos.map((item, idx) => (
                <div
                  key={idx}
                  className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                >
                  {item.imagemURL && (
                    <Image
                      src={`http://localhost:3000${item.imagemURL}`} // O caminho da imagem
                      alt={item.nome}  // Descrição da imagem
                      width={300}  // Tamanho da imagem (ajuste conforme necessário)
                      height={200}  // Tamanho da imagem (ajuste conforme necessário)
                      className="rounded-lg mb-4" // Classe para estilizar a imagem
                    />
                  )}
                  {/* Botão de deletar */}
                  <button
                    onClick={() => removerEspaco(item.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <ClearIcon fontSize="medium" />
                  </button>
                  {/* Atualizar */}
                  <button
                    onClick={() => { setOpenModal(true); setDadosEspaco(item) }}
                    className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                  >
                    <SyncAltIcon fontSize="medium" />
                  </button>
                  <li key={idx} className="rounded-md p-3 bg-orange-50 text-gray-800">
                    <p><strong>Nome:</strong> {item.nome}</p>
                    <p><strong>Tipo:</strong> {item.tipo}</p>
                    <p><strong>Capacidade:</strong> {item.capacidade}</p>
                    <p><strong>Endereco:</strong> {item.endereco}</p>
                    <p><strong>Preço:</strong> {item.preco}</p>
                  </li>
                </div>
              ))}
            </ul>
          )}

        </div>
      </div>
      <ModalEspacoUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        dados={dadosEspaco}
        setReservas={setEspacos}
        enderecos={enderecos}
      />
    </>
  );
}
