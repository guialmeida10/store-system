// Dashboard.jsx
import React, { useState, useEffect } from "react";
// Importa as funções de API do arquivo vizinho
import {
  buscarProdutos,
  adicionarProduto,
  editarProduto,
  excluirProduto,
  logoutUser
} from "../login/API"; // Assumindo que este é o caminho correto

import "./Dashboard.css"; // Certifique-se de que este arquivo CSS existe

// Função auxiliar para buscar o token em ambos os storages
const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "" });
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Pega o token usando a função que verifica os dois lugares
  const token = getAuthToken();

  // Hook para carregar produtos e checar token
  useEffect(() => {
    // 1. Redireciona para login se não houver token
    if (!token) {
      // Se não houver token, interrompe a renderização e redireciona
      window.location.href = "/";
      return;
    }

    // Função assíncrona para carregar os produtos
    const carregarProdutos = async () => {
      setLoading(true);
      try {
        const lista = await buscarProdutos();
        setProdutos(lista);
        setErro(null); // Limpa erros anteriores em caso de sucesso
      } catch (e) {
        console.error("Erro ao carregar produtos:", e);
        // Em um ambiente real, um erro 401 aqui pode significar que o token expirou
        setErro("Erro ao carregar produtos. Sua sessão pode ter expirado.");
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [token]);

  // Adicionar ou editar produto
  const handleSalvar = async () => {
    const nome = novoProduto.nome.trim();
    // Garante que o preço é tratado como número flutuante
    const preco = parseFloat(novoProduto.preco);

    if (!nome || isNaN(preco) || preco <= 0) {
      alert("Preencha todos os campos corretamente com um preço válido!");
      return;
    }

    try {
      let res;
      if (editando !== null) {
        const id = produtos[editando].id;
        res = await editarProduto(id, nome, preco);

        if (res.success) {
          // Atualiza a lista com o item editado
          setProdutos(produtos.map(p => p.id === id ? { ...p, nome, preco } : p));
          setEditando(null);
        }
      } else {
        res = await adicionarProduto(nome, preco);

        if (res.success) {
          // Adiciona o novo produto (com o ID retornado pela API)
          setProdutos([...produtos, { id: res.id, nome, preco }]);
        }
      }

      if (!res.success) alert(res.message);
      setNovoProduto({ nome: "", preco: "" }); // Limpa o formulário
    } catch (e) {
      console.error("Erro ao salvar produto:", e);
      alert("Erro ao salvar produto!");
    }
  };

  const handleEditar = index => {
    // Coloca os dados do produto selecionado no formulário
    setNovoProduto({ nome: produtos[index].nome, preco: produtos[index].preco });
    setEditando(index);
  };

  const handleExcluir = async index => {
    const produtoParaExcluir = produtos[index];
    if (!window.confirm(`Tem certeza que deseja excluir "${produtoParaExcluir.nome}"?`)) return;

    try {
      const res = await excluirProduto(produtoParaExcluir.id);
      if (res.success) {
        // Remove o produto da lista (filtrando pelo índice)
        setProdutos(produtos.filter((_, i) => i !== index));
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.error("Erro ao excluir produto:", e);
      alert("Erro ao excluir produto!");
    }
  };

  // Calcula o valor total, garantindo que o preço seja tratado como número
  const valorTotal = produtos.reduce((total, p) => total + Number(p.preco) || 0, 0).toFixed(2);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/"; // Redireciona para o login
  };

  // Se o token foi removido no useEffect e o redirecionamento está ocorrendo
  // (ou se a verificação inicial falhar), retorna null para não renderizar nada.
  if (!token) return null;

  // Renderização principal do Dashboard
  return (
    <div className="parent">
      <button className="logout" onClick={handleLogout}>Sair</button>

      {/* Se houver um erro, mostre-o fora da área de produtos */}
      {erro && <p className="erro-global">{erro}</p>}

      <div className="div1">
        <h2>{editando !== null ? "Editar Produto" : "Novo Produto"}</h2>
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          // O valor de um input type="number" é uma string, por isso usamos toString()
          value={novoProduto.preco.toString()}
          onChange={e => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <button onClick={handleSalvar}>
          {editando !== null ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
        {editando !== null && (
          <button onClick={() => {
              setEditando(null);
              setNovoProduto({ nome: "", preco: "" });
          }}>
            Cancelar Edição
          </button>
        )}
      </div>

      <div className="div2">
        <h2>Lista de Produtos</h2>
        {loading ? (
          <p>Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul>
            {produtos.map((p, index) => (
              // Garantimos que 'p.id' é a chave (key)
              <li key={p.id || index}>
                <span>
                  <strong>{p.nome}</strong> — R$ {Number(p.preco || 0).toFixed(2)} {/* ⬅️ CORREÇÃO! Garante que o preço é um número. */}
                </span>
                <div className="botoes">
                  <button onClick={() => handleEditar(index)}>✏️ Editar</button>
                  <button onClick={() => handleExcluir(index)}>🗑️ Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="div3">
        <h2>Resumo</h2>
        <p>Total de produtos: {produtos.length}</p>
        <p>Valor total: R$ {valorTotal}</p>
      </div>
    </div>
  );
}

export default Dashboard;