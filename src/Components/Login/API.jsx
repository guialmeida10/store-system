const API_URL = "http://localhost:3000";

// LOGIN
export const loginUser = async (email, senha, rememberMe) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (data.success && data.token) {
      // Armazena o token conforme a escolha do usuário
    }
    return data;
  } catch (e) {
    console.error("Erro de conexão:", e);
    return { success: false, message: "Erro de conexão com o servidor" };
  }
};

// REGISTRO
export const registerUser = async (nome, email, senha) => {
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
  localStorage.removeItem("token");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("nome");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("usuarioId");
  sessionStorage.removeItem("nome");
};


const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// BUSCAR PRODUTOS
export const buscarProdutos = async () => {
  const token = getToken();
  if (!token) return [];
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

// ADICIONAR PRODUTO
export const adicionarProduto = async (nome, preco) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
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

// EDITAR PRODUTO
export const editarProduto = async (id, nome, preco) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
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

// EXCLUIR PRODUTO
export const excluirProduto = async (id) => {
  const token = getToken();
  if (!token) return { success: false, message: "Não autenticado" };
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