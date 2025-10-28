import React, { useState } from "react";
import axios from "axios";
import "./Registrar.css";

export default function Registrar() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", formData);

      alert(response.data.message || "Usuário registrado com sucesso!");
      setFormData({ nome: "", email: "", senha: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao registrar usuário!");
    }
  };

  return (
    <div className="register-container">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
