// API.jsx (Versão Corrigida)
const API_URL = "http://localhost:3000";

// --- LOGIN / REGISTRO ---

// LOGIN
export const loginUser = async (email, senha, rememberMe) => { // ⬅️ Adicionei 'rememberMe' para ser usado na função
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (data.success && data.token) {
      // ⬅️ Lógica MUDADA: Não salva aqui, o Login.jsx fará isso com base no rememberMe
      // A função loginUser agora retorna os dados, e o Login.jsx decide onde salvar.
    }

    return data;
  } catch (e) {
    console.error("Erro de conexão:", e);
    return { success: false, message: "Erro de conexão com o servidor" };
  }
};

// REGISTRO (Sem alterações)
export const registerUser = async (nome, email, senha) => {
  // ... (código existente)
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    return await res.json();
  } catch (e) {
    console.error("Erro de conexão:", e);
    return { success: false, message: "Erro de conexão com o servidor" };
  }
};

// LOGOUT
export const logoutUser = () => {
  // ⬅️ MUDANÇA AQUI: Remove de AMBOS os storages para garantir limpeza
  localStorage.removeItem("token");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("nome");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("usuarioId");
  sessionStorage.removeItem("nome");
};


// --- PRODUTOS ---

// ⬅️ MUDANÇA CRUCIAL: Tenta localStorage, se não achar, tenta sessionStorage.
const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// BUSCAR PRODUTOS (Sem alterações internas)
export const buscarProdutos = async () => {
  const token = getToken();
  if (!token) return [];
  // ... (código fetch continua igual)
  try {
    const res = await fetch(`${API_URL}/produtos`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return data.success ? data.produtos : [];
  } catch (e) {
    console.error("Erro ao buscar produtos:", e);
    return [];
  }
};

// ADICIONAR PRODUTO (Sem alterações internas)
export const adicionarProduto = async (nome, preco) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
  // ... (código fetch continua igual)
  try {
    const res = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, preco }),
    });

    return await res.json();
  } catch (e) {
    console.error("Erro ao adicionar produto:", e);
    return { success: false, message: "Erro de conexão" };
  }
};

// EDITAR PRODUTO (Sem alterações internas)
export const editarProduto = async (id, nome, preco) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
  // ... (código fetch continua igual)
  try {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, preco }),
    });

    return await res.json();
  } catch (e) {
    console.error("Erro ao editar produto:", e);
    return { success: false, message: "Erro de conexão" };
  }
};

// EXCLUIR PRODUTO (Sem alterações internas)
export const excluirProduto = async (id) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
  // ... (código fetch continua igual)
  try {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await res.json();
  } catch (e) {
    console.error("Erro ao excluir produto:", e);
    return { success: false, message: "Erro de conexão" };
  }
};