import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginService";
import "../styles/LoginPage.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpa mensagens de erro anteriores

    try {
      const response = await login(email, password);
      localStorage.setItem("@Auth:token", response.token); // Salva o token no localStorage
      localStorage.setItem("@Auth:role", response.role); // Salva a role no localStorage (se existir)

      // Redireciona com base na role
      if (response.role === "adm") {
        navigate("/adm-home-page");
      } else {
        navigate("/home-page");
      }
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-logo-container">
          <img
            src="/img/Logo.jpg" 
            alt="Logo"
            className="login-logo"
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}