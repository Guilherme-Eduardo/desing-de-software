"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarReserva, listarReservas } from "../../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalReservaUpdate({ open, onClose, dados, setReservas }) {
    const [form, setForm] = useState({
        cliente: "",
        espaco: "",
        inicio: "",
        fim: "",
    });

    // Preenche o formulário quando os dados do cliente mudarem
    useEffect(() => {
        if (dados) {
            setForm({
                cliente: dados.cliente || "",
                espaco: dados.espaco || "",
                inicio: dados.inicio || "",
                fim: dados.fim || "",
            });
        }
    }, [dados]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await atualizarReserva(form);

        if (setReservas) {
            const atualizada = await listarReservas();
            setReservas(atualizada);
        }

        onClose();
    }

    return (
        <Modal
            aria-pledby="modal-atualizar-reserva"
            aria-describedby="modal-atualizar-reserva-descricao"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            {/* Wrapper para centralizar na tela */}
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-lg p-6 pb-16 rounded-lg bg-[#fff7e6] shadow-lg">
                    {/* Botão X no canto superior direito */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                    >
                        <ClearIcon />
                    </button>

                    <h2
                        id="modal-atualizar-cliente"
                        className="mb-4 text-xl font-semibold text-gray-800"
                    >
                        Atualizar Reserva
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome do cliente */}
                        <div>
                            <p
                                htmlFor="cliente"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                nome do cliente
                            </p>
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
                            <p
                                htmlFor="espaco"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Espaço
                            </p>
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
                            <p
                                htmlFor="inicio"
                                className="text-black block text-sm font-medium text-gray-700 mb-1"
                            >
                                Início
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
                            Atualizar Reserva
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
