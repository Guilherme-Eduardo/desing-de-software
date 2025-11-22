"use client";


import { criarReserva } from "@/lib/api";

export default function ReservaPage() {

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dados = Object.fromEntries(formData.entries());
        console.log("Dados da reserva:", dados);

        await criarReserva(dados);
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#fff7e6]">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-orange-200 p-8">
                <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
                    Gostaria de fazer uma reserva?
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome do cliente */}
                    <div>
                        <label
                            htmlFor="nome"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nome do cliente
                        </label>
                        <input
                            id="nome"
                            name="nome"
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
                            type="datetime-local"
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
                            type="datetime-local"
                            required
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
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
        </div>
    );
}
