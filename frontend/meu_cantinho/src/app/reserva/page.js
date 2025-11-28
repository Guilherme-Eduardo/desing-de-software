"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header.js";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import { criarReserva, listarReservas, removerReserva } from "../lib/api.js";
import ModalReservaUpdate from "./components/ModalReservaUpdate.js";

export default function ReservaPage() {
    const [reservas, setReservas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dadosReserva, setDadosReserva] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dados = Object.fromEntries(formData.entries());
        console.log("Dados da reserva:", dados);

        await criarReserva(dados);

        const atualizada = await listarReservas();
        setReservas (atualizada);
        e.target.reset();
    }

    useEffect(() => {
        async function carregar() {
            const dados = await listarReservas();
            if (dados) setReservas(dados);
        }
        carregar();
    }, []);

    async function HandleRemoveReserva(id) {
        await removerReserva(id);
        setReservas((prev) => prev.filter(e => e.id !== id));
    }



    return (
        <>
            <Header />

            <div className="flex flex-row gap-8 w-full min-h-screen items-start justify-center bg-[#fff7e6] p-10">
                <div className="w-full max-w-md h-[600px] bg-white shadow-lg rounded-xl border border-orange-200 p-8">
                    <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
                        Gostaria de fazer uma reserva?
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome do cliente */}
                        <div>
                            <label
                                htmlFor="cliente"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                nome do cliente
                            </label>
                            <input
                                id="cliente"
                                name="cliente"
                                type="text"
                                required
                                className=" text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                placeholder="Ex.: João da Silva"
                            />
                        </div>

                        {/* Espaço */}
                        <div>
                            <label
                                htmlFor="espaco"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Espaço
                            </label>
                            <input
                                id="espaco"
                                name="espaco"
                                type="text"
                                required
                                className="text-black  block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                placeholder="Ex.: Salão Principal"
                            />
                        </div>

                        {/* Início da reserva */}
                        <div>
                            <label
                                htmlFor="inicio"
                                className="text-black block text-sm font-medium text-gray-700 mb-1"
                            >
                                Início
                            </label>
                            <input
                                id="inicio"
                                name="inicio"
                                type="date"
                                required
                                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                            />
                        </div>

                        {/* Fim da reserva */}
                        <div>
                            <label
                                htmlFor="fim"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Fim
                            </label>
                            <input
                                id="fim"
                                name="fim"
                                type="date"
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
                            Fazer reserva
                        </button>
                    </form>
                </div>
                <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8  h-[600px] overflow-y-auto">
                    <h1 className="z-10 sticky text-2xl text-gray-700 font-semibold text-center mb-6">
                        Lista de Reservas
                    </h1>

                    {reservas.length === 0 ? (
                        <p className="text-gray-600 text-center">Nenhum reserva cadastrado.</p>
                    ) : (
                        <div className="space-y-3">
                            {reservas.map((item, idx) => (

                                <div
                                    key={idx}
                                    className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                                >
                                    {/* Botão de deletar */}
                                    <button
                                        onClick={() => HandleRemoveReserva(item.id)}
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                    >
                                        <ClearIcon fontSize="medium" />
                                    </button>
                                    {/* Atualizar */}
                                    <button
                                        onClick={() => { setOpenModal(true); setDadosReserva(item); }}
                                        className="absolute top-10 right-2 text-blue-600 hover:text-blue-800"
                                    >
                                        <SyncAltIcon fontSize="medium" />
                                    </button>
                                    <p><strong>cliente:</strong> {item.cliente}</p>
                                    <p><strong>espaco:</strong> {item.espaco}</p>
                                    <p><strong>inicio:</strong> {item.inicio}</p>
                                    <p><strong>fim:</strong> {item.fim}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ModalReservaUpdate
                open={openModal}
                onClose={() => setOpenModal(false)}
                dados={dadosReserva}
                setReservas={setReservas}
            />
        </>
    );
}
