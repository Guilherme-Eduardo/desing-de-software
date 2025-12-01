"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header.js";

import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { criarReserva, listarClientes, listarEspacos, listarReservas, removerReserva } from "../lib/api.js";
import ModalReservaUpdate from "./components/ModalReservaUpdate.js";
import ModalPagamento from "./components/ModalPagamento.js";

export default function ReservaPage() {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [espacos, setEspacos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dadosReserva, setDadosReserva] = useState(null);
    const [openModalPagamento, setOpenModalPagamento] = useState(false);

    function datasInvalidas(inicio, fim) {
        const d1 = new Date(inicio);
        const d2 = new Date(fim);

        return d1 > d2;
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dados = Object.fromEntries(formData.entries());

        if (datasInvalidas(dados.inicio, dados.fim)) {
            alert("A data inicial não pode ser maior que a data final.");
            return;
        }

        const resposta = await criarReserva(dados);

        if (!resposta.ok && resposta.data?.erro === "Não há disponibilidade") {
            alert("Não há disponibilidade");
            return;
        }

        const reservas = await listarReservas();
        setReservas(reservas);
        e.target.reset();
    }



    useEffect(() => {
        async function carregar() {

            const reservas = await listarReservas();
            const clientes = await listarClientes();
            const espacos = await listarEspacos();

            if (reservas && clientes && espacos) {
                setReservas(reservas);
                setClientes(clientes);
                setEspacos(espacos);
            }
        }
        carregar();
    }, []);

    async function HandleRemoveReserva(id) {
        await removerReserva(id);
        setReservas((prev) => prev.filter(e => e.id !== id));
    }

    function formatarData(data) {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
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
                            <p
                                htmlFor="cliente"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                nome do cliente
                            </p>
                            <select
                                id="clienteId"
                                name="clienteId"
                                required
                                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.nome}
                                    </option>
                                ))}

                            </select>
                        </div>

                        {/* Espaço */}
                        <div>
                            <p
                                htmlFor="espaco"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Espaço
                            </p>
                            <select
                                id="espacoId"
                                name="espacoId"
                                required
                                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                            >
                                <option value="">Selecione um espaço</option>
                                {espacos.map((esp) => (
                                    <option key={esp.id} value={esp.id}>
                                        {esp.nome}
                                    </option>
                                ))}

                            </select>
                        </div>
                        {/* Fim da reserva */}
                        <div>
                            <p
                                htmlFor="inicio"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                inicio
                            </p>
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
                            <p
                                htmlFor="fim"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Fim
                            </p>
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
                            {reservas.map((item, idx) => {

                                const client = clientes.find(e => e.id == (item.clienteId ?? item.cliente));
                                const esp = espacos.find(e => e.id == (item.espacoId ?? item.espaco));

                                return (

                                    <div
                                        key={idx}
                                        className="relative border rounded-md p-3 shadow-sm bg-orange-50 text-gray-800"
                                    >
                                        <button
                                            onClick={() => HandleRemoveReserva(item.id)}
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                        >
                                            <ClearIcon fontSize="medium" />
                                        </button>
                                        <button
                                            onClick={() => { setOpenModal(true); setDadosReserva(item); }}
                                            className="absolute top-12 right-2 text-blue-600 hover:text-blue-800"
                                        >
                                            <SyncAltIcon fontSize="medium" />
                                        </button>
                                        <button
                                            onClick={() => { setOpenModalPagamento(true); setDadosReserva(item); }}
                                            className="absolute top-28 right-2 text-green-600 hover:text-green-800"
                                        >
                                            <AttachMoneyIcon fontSize="medium" />
                                        </button>
                                        {item.status === "confirmado" ? (
                                            <button
                                                type="button"
                                                className="absolute top-38 right-2 text-green-500"
                                            >
                                                <CheckIcon fontSize="medium" />
                                            </button>
                                        ) : item.status === "reservado" ? (
                                            <button
                                                type="button"
                                                className="absolute top-38 right-2 text-yellow-500"
                                            >
                                                <WorkHistoryIcon fontSize="medium" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="absolute top-38 right-2 text-yellow-500"
                                            >
                                                <WarningIcon fontSize="medium" />
                                            </button>
                                        )}



                                        {client && esp && (
                                            <div className="flex flex-col">
                                                <p className="py-0.5">
                                                    <span className="font-medium">Nome do Cliente: </span>
                                                    {client.nome}
                                                </p>
                                                <p className="py-0.5">
                                                    <span className="font-medium">Nome do Espaço: </span>
                                                    {esp.nome}
                                                </p>
                                                <p className="py-0.5">
                                                    <span className="font-medium">Período Inicial: </span>
                                                    {formatarData(item.inicio)}
                                                </p>
                                                <p className="py-0.5">
                                                    <span className="font-medium">Período Final: </span>
                                                    {formatarData(item.fim)}
                                                </p>
                                                <p className="py-0.5">
                                                    <span className="font-medium">Valor a pagar: R$</span>
                                                    {esp.preco}.00
                                                </p>
                                                <p className="py-0.5">
                                                    <span className="font-medium">Status da Reserva: </span>
                                                    {item.status}
                                                </p>
                                            </div>

                                        )}

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <ModalReservaUpdate
                open={openModal}
                onClose={() => setOpenModal(false)}
                dados={dadosReserva}
                setReservas={setReservas}
                clientes={clientes}
                espacos={espacos}
            />
            <ModalPagamento
                open={openModalPagamento}
                onClose={() => setOpenModalPagamento(false)}
                dados={dadosReserva}
                setReservas={setReservas}
            />
        </>
    );
}