import { useState } from "react";
import { login } from "../services/loginService";
import CadastroForm from "../components/CadastroForm/CadastroForm";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);
      localStorage.setItem("@Auth:token", response.token);
      navigate("/home-page");
      
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  const handleCadastroConcluido = () => {
    setMostrarCadastro(false); // volta para login
  };

  return (
    <div className="login-container">
      {mostrarCadastro ? (
        <CadastroForm onCadastroConcluido={handleCadastroConcluido} />
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-logo-container">
            <img src="/img/Logo.jpg" alt="Logo" className="login-logo" />
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

          <p className="login-cadastro-link">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => setMostrarCadastro(true)}
            >
              Cadastre-se
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
