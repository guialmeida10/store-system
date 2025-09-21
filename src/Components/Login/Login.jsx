import { FaUser, FaLock } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Enviando os dados: " + username + " - " + password);
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
            <input type="checkbox" />
            Lembrar-me
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>

        <div className="button">
          <button disabled={password.length === 0}>Entrar</button>
        </div>


        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Registre-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
