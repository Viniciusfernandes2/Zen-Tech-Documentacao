import { useState } from "react";
import { login as loginService } from "../../services/loginService";
import CadastroForm from "../CadastroForm/CadastroForm";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ajuste o caminho

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const navigate = useNavigate();
  const { login, entrarComoVisitante } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginService(email, password);
      login(response.token, response.name);
      navigate("/home-page");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      {mostrarCadastro ? (
        <CadastroForm onCadastroConcluido={() => setMostrarCadastro(false)} />
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

          <button
            type="button"
            className="visitante-button"
            onClick={() => {
              entrarComoVisitante(); // atualiza o contexto para visitante
              navigate("/home-page");
            }}
          >
            Entrar como visitante
          </button>

          <p className="login-cadastro-link">
            Não tem uma conta?{" "}
            <button type="button" onClick={() => setMostrarCadastro(true)}>
              Cadastre-se
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
