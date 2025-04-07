import React, { useState } from "react";
import { registerUser } from "../services/registerService";
import Header from "../components/Header/header";
import "../styles/CadastroPage.css";

const CadastroPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    numero: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário criado:", response);
      setFormData({ name: "", email: "", password: "", numero: "", role: "" });
    } catch (error: any) {
      alert(error.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <>
      <Header />
      <div className="cadastro-container">
        <h1>Cadastro de Usuário</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
};

export default CadastroPage;