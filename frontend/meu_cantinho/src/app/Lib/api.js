const API_BASE_URL = "http://localhost:3002";

async function handleResponse(res) {
  if (!res.ok) {
    let text = "";
    try {
      text = await res.text();
    } catch {
      // ignora
    }
    throw new Error(
      `Erro na API: ${res.status} ${res.statusText} - ${text}`
    );
  }
  // Algumas rotas 204 (no content) não têm corpo
  if (res.status === 204) {
    return null;
  }
  return res.json();
}

/* ===================== RESERVAS ===================== */

export async function listarReservas() {
  const res = await fetch(`${API_BASE_URL}/reservas`);
  return handleResponse(res);
}

export async function obterReserva(id) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`);
  return handleResponse(res);
}

export async function criarReserva(dados) {
  const res = await fetch(`${API_BASE_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function atualizarReserva(id, dados) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function removerReserva(id) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

/* ===================== ESPAÇOS ===================== */

export async function listarEspacos() {
  const res = await fetch(`${API_BASE_URL}/espacos`);
  return handleResponse(res);
}

export async function obterEspaco(id) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`);
  return handleResponse(res);
}

export async function criarEspaco(dados) {
  const res = await fetch(`${API_BASE_URL}/espacos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function atualizarEspaco(id, dados) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function removerEspaco(id) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

/* ===================== PAGAMENTOS ===================== */

export async function listarPagamentos() {
  const res = await fetch(`${API_BASE_URL}/pagamentos`);
  return handleResponse(res);
}

export async function obterPagamento(id) {
  const res = await fetch(`${API_BASE_URL}/pagamentos/${id}`);
  return handleResponse(res);
}

export async function criarPagamento(dados) {
  const res = await fetch(`${API_BASE_URL}/pagamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function atualizarPagamento(id, dados) {
  const res = await fetch(`${API_BASE_URL}/pagamentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function removerPagamento(id) {
  const res = await fetch(`${API_BASE_URL}/pagamentos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

/* ===================== CLIENTES ===================== */

export async function listarClientes() {
  const res = await fetch(`${API_BASE_URL}/clientes`);
  return handleResponse(res);
}

export async function obterCliente(id) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`);
  return handleResponse(res);
}

export async function criarCliente(dados) {
  const res = await fetch(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function atualizarCliente(id, dados) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function removerCliente(id) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

/* ===================== PROPRIETÁRIOS ===================== */

export async function listarProprietarios() {
  const res = await fetch(`${API_BASE_URL}/proprietarios`);
  return handleResponse(res);
}

export async function obterProprietario(id) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`);
  return handleResponse(res);
}

export async function criarProprietario(dados) {
  const res = await fetch(`${API_BASE_URL}/proprietarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function atualizarProprietario(id, dados) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return handleResponse(res);
}

export async function removerProprietario(id) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
