"use client";

import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Header from "../components/Header.js";
import { criarEspaco, listarEnderecos, listarEspacos } from "../lib/api.js";
import ModalEspacoUpdate from "./components/ModalEspacoUpdate.js";
import Image from "next/image";



export default function CadastroEspacoPage() {
  const [openModal, setOpenModal] = useState(false);
  const [espacos, setEspacos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [dadosEspaco, setDadosEspaco] = useState([]);

  
  /* Pega os dados do backend */
  useEffect(() => {
    async function carregar() {
      const dados = await listarEspacos();
      if (dados) setEspacos(dados);

      const end = await listarEnderecos();
      if (end) setEnderecos(end);
    }
    carregar();
  }, []);

  /* Envia a requisição para o backend*/
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    await criarEspaco(formData);

    const atualizada = await listarEspacos();
    setEspacos(atualizada);

    e.target.reset();
  }


 /* Função responsavel por remover os espacos e mante-los atualizados na listagem*/
  async function removerEspaco(id) {
    try {
      await fetch(`http://localhost:3000/espacos/${id}`, {
        method: "DELETE",
      });

      setEspacos((prev) => prev.filter((r) => r.id !== id));

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

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Nome</p>
              <input
                name="nome"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Ex.: Major Antônio Couto Pereira"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Tipo</p>
              <input
                name="tipo"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Ex.: Estádio"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Capacidade</p>
              <input
                name="capacidade"
                type="number"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Ex.: 45000"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Preço</p>
              <input
                name="preco"
                type="number"
                step="0.01"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Ex.: R$90.000"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Endereço</p>
              <select
                name="enderecoId"
                required
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Selecione um endereço.</option>
                {enderecos.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.rua}, {e.numero} — {e.cidade}/{e.estado}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Imagem</p>
              <input
                name="imagem"
                type="file"
                accept="image/*"
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
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
              {espacos.map((item) => {
                const enderecoFilial = enderecos.find(e => e.id == item.enderecoId);

                return (
                  <div
                    key={item.id}
                    className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                  >
                    {item.imagemURL && (
                      <Image
                        src={`http://localhost:3000${item.imagemURL}`}
                        alt={item.nome}
                        width={300}
                        height={200}
                        className="rounded-lg mb-4"
                      />
                    )}

                    <button
                      onClick={() => removerEspaco(item.id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      <ClearIcon fontSize="medium" />
                    </button>

                    <button
                      onClick={() => { setOpenModal(true); setDadosEspaco(item); }}
                      className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                    >
                      <SyncAltIcon fontSize="medium" />
                    </button>

                    <li className="rounded-md p-3 bg-orange-50 text-gray-800">
                      <div className="flex flex-col">
                        <p className="py-0.5">
                          <span className="font-medium">Nome: </span>
                          {item.nome}
                        </p>
                        <p className="py-0.5">
                          <span className="font-medium">Tipo: </span>
                          {item.tipo}
                        </p>
                        <p className="py-0.5">
                          <span className="font-medium">Capacidade: </span>
                          {item.capacidade}
                        </p>
                        <p className="py-0.5">
                          <span className="font-medium">Preço: R$</span>
                          {item.preco}.00
                        </p>

                        {enderecoFilial && (
                          <>
                            <p className="py-0.5">
                              <span className="font-medium">Endereço: </span>
                              {enderecoFilial.rua}, {enderecoFilial.numero}
                            </p>
                            <p className="py-0.5">
                              <span className="font-medium">Cidade: </span>
                              {enderecoFilial.cidade}/{enderecoFilial.estado}
                            </p>
                          </>
                        )}
                      </div>
                    </li>

                  </div>
                );
              })}

            </ul>
          )}

        </div>
      </div>
      <ModalEspacoUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        dados={dadosEspaco}
        setEspacos={setEspacos}
        enderecos={enderecos}
      />
    </>
  );
}
