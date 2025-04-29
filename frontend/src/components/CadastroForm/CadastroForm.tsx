
import React, { useState } from "react";
import { registerUser } from "../../services/registerService";
import "./CadastroForm.css";

interface CadastroFormProps {
  onCadastroConcluido: () => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onCadastroConcluido }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Usuário cadastrado com sucesso!");
      setFormData({ name: "", email: "", password: ""});
      onCadastroConcluido(); // Chama a função para voltar ao login
    } catch (error: any) {
      alert(error.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-logo-container">
              <img src="/img/Logo.jpg" alt="Logo" className="cadastro-logo" />
            </div>
      <div className="cadastro-title-container">
      <h1>Cadastre-se:</h1>
        </div>      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" placeholder="Nome Completo" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="exemplo@gmail.com" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" placeholder="Ex:'1234'" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={onCadastroConcluido}>Cancelar</button>
      </form>
    </div>
  );
};

export default CadastroForm;
