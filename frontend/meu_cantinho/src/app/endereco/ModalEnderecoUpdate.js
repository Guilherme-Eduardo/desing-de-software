"use client";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";
import { atualizarEndereco, listarEnderecos } from "../lib/api.js";
import { useEffect, useState } from "react";

export default function ModalEnderecoUpdate({ open, onClose, dados, setEndereco }) {
    const [form, setForm] = useState({
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
    });

    // Preenche o formulário quando os dados do cliente mudarem
    useEffect(() => {
        if (dados) {
            setForm({
                rua: dados.rua || "",
                numero: dados.numero || "",
                bairro: dados.bairro || "",
                cidade: dados.cidade || "",
                estado: dados.estado || "",
                complemento: dados.complemento || "",
            });
        }
    }, [dados]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await atualizarEndereco(form);

        if (setEndereco) {
            const atualizada = await listarEnderecos();
            setEndereco(atualizada);
        }

        onClose();
    }

    return (
        <Modal
            aria-labelledby="modal-atualizar-endereco"
            aria-describedby="modal-atualizar-endereco-descricao"
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
                        id="modal-atualizar-endereco"
                        className="mb-4 text-xl font-semibold text-gray-800"
                    >
                        Atualizar endereço
                    </h2>

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
                                value={form.rua}
                                onChange={handleChange}
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
                                value={form.numero}
                                onChange={handleChange}
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
                                value={form.bairro}
                                onChange={handleChange}
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
                                value={form.cidade}
                                onChange={handleChange}
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
                                value={form.estado}
                                onChange={handleChange}
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
                                value={form.complemento}
                                onChange={handleChange}
                                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                placeholder="Ex.: Apto 201, Bloco B"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm
                hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                        >
                            Atualizar cliente
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
