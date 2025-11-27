"use client";

import { useState } from "react";

export default function EntrarPage() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      // Aqui você chamaria sua API de autenticação
      // por exemplo: await login(form.email, form.senha);
      console.log("Tentando entrar com:", form);

      // redirecionar depois que tiver autenticação de verdade
      // router.push("/dashboard");
    } catch (err) {
      setErro("Falha ao entrar. Verifique seus dados.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7e6]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-orange-100">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Seu Cantinho
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Faça login para gerenciar reservas, clientes e espaços.
          </p>

          {erro && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="text-black block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                value={form.senha}
                onChange={handleChange}
                className="text-black block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            Ainda não tem acesso? Fale com o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
