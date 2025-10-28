import { FaUser, FaLock } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Importe a função de login da sua API
import { loginUser } from "./API.jsx"; 

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Estado para rastrear o checkbox
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  // Função para lidar com a mudança no checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Chama a função da API para autenticar o usuário
      const response = await loginUser(username, password);

      // Verifica se a resposta do servidor indica sucesso
      if (response.success && response.token) {
        
        //LÓGICA DO "LEMBRAR-ME" 
        const token = response.token; 
        const usuarioId = response.usuarioId;
        const nome = response.nome;

        // Decide onde salvar o token (localStorage se marcado, sessionStorage se desmarcado)
        const storage = rememberMe ? localStorage : sessionStorage;

        // Salva as credenciais no armazenamento escolhido
        storage.setItem("token", token);
        storage.setItem("usuarioId", usuarioId);
        storage.setItem("nome", nome);

        // Garante que o outro armazenamento está limpo para evitar conflitos de sessão
        const otherStorage = rememberMe ? sessionStorage : localStorage;
        otherStorage.removeItem("token");
        otherStorage.removeItem("usuarioId");
        otherStorage.removeItem("nome");
        // ----------------------------------------------------------------------

        // Se deu certo, navega para o dashboard
        navigate('/dashboard');
      } else {
        // Se não deu certo, exibe a mensagem de erro da API
        alert(response.message || "Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      // Se houver um erro na requisição (por exemplo, servidor offline)
      console.error("Erro na autenticação:", error);
      alert("Ocorreu um erro ao tentar entrar. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="container">
      {/* Aqui vai a animação */}
      <DotLottieReact
        src="https://lottie.host/bbf0cb47-75d8-4137-b553-7ed621eb58d5/GfR0goacHa.lottie"
        loop
        autoplay
      />

      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        
        <div className="recall-forget">
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={handleRememberMeChange}
            />
            Lembrar-me
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>

        <div className="button">
          <button type="submit" disabled={password.length === 0}>Entrar</button>
        </div>

        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;