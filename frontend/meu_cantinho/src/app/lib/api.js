const API_BASE_URL = "http://localhost:3000";


export async function listarReservas() {
  const res = await fetch(`${API_BASE_URL}/reservas`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function obterReserva(id) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarReserva(dados) {
  const res = await fetch(`${API_BASE_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function atualizarReserva(id, dados) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function removerReserva(id) {
  const res = await fetch(`${API_BASE_URL}/reservas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}



export async function listarEspacos() {
  const res = await fetch(`${API_BASE_URL}/espacos`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function obterEspaco(id) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarEspaco(dados) {
  const res = await fetch(`${API_BASE_URL}/espacos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function atualizarEspaco(id, dados) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function removerEspaco(id) {
  const res = await fetch(`${API_BASE_URL}/espacos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}



export async function listarPagamentos() {
  const res = await fetch(`${API_BASE_URL}/pagamentos`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function obterPagamento(id) {
  const res = await fetch(`${API_BASE_URL}/pagamentos/${id}`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarPagamento(dados) {
  const res = await fetch(`${API_BASE_URL}/pagamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function removerPagamento(id) {
  const res = await fetch(`${API_BASE_URL}/pagamentos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}



export async function listarClientes() {
  const res = await fetch(`${API_BASE_URL}/clientes`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function obterCliente(id) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarCliente(dados) {
  const res = await fetch(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function atualizarCliente(id, dados) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar cliente");
  }

  return res.json();
}


export async function removerCliente(id) {
  const res = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}


export async function listarProprietarios() {
  const res = await fetch(`${API_BASE_URL}/proprietarios`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function obterProprietario(id) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarProprietario(dados) {
  const res = await fetch(`${API_BASE_URL}/proprietarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function atualizarProprietario(id, dados) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function removerProprietario(id) {
  const res = await fetch(`${API_BASE_URL}/proprietarios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function criarEndereco(dados) {
  const res = await fetch(`${API_BASE_URL}/enderecos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    const texto = await res.text();
    console.error("Erro da API:", texto);
    throw new Error(texto || "Erro desconhecido");
  }

  return res.json();
}

export async function listarEnderecos() {
  const res = await fetch(`${API_BASE_URL}/enderecos`);
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}


export async function atualizarEndereco(id, dados) {
  const res = await fetch(`${API_BASE_URL}/enderecos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}


export async function removerEndereco(id) {
  const res = await fetch(`${API_BASE_URL}/enderecos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}

export async function atualizarPagamento(id, dados) {
  const res = await fetch(`${API_BASE_URL}/pagamento/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error ("Erro");
  return res.json();
}