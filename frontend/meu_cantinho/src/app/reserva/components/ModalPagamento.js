"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { listarReservas } from "../../lib/api.js";

export default function ModalPagamento({ open, onClose, dados, setReservas }) {
    const [form, setForm] = useState({
        id_reserva: "",
        valorPago: ""
    });

    // Preenche o formulário quando os dados do cliente mudarem
    useEffect(() => {
        if (dados) {
            setForm({
                id_reserva: dados.id || "",
                valorPago: "",
            });
        }
    }, [dados]);


    async function handleSubmit(e) {
        e.preventDefault();
        if (form.valorPago <= 0) {
            alert("Por favor, insira um valor válido para o pagamento.");
            return;
        }


        await atualizarReserva(form);

        if (setReservas) {
            const atualizada = await listarReservas();
            setReservas(atualizada);
        }

        onClose();
    }

    return (
        <Modal
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
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-lg p-6 pb-16 rounded-lg bg-[#fff7e6] shadow-lg">
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
                        Insira o valor desejável para efetuar o pagamento.
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p
                                htmlFor="preco"
                                className="text-black block text-sm font-medium text-gray-700 mb-1"
                            >
                                Valor total ou um sinal...
                            </p>
                            <input
                                id="valorPago"
                                name="valorPago"
                                type="number"
                                min="0"
                                step="0.01"
                                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                placeholder="Ex.: 500.00"
                            />

                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                                hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                        >
                            Efetuar pagamento
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
