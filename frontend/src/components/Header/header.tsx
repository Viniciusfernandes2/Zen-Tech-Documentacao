import React from "react";
import "./header.css";
import Button from "../Buttons/Buttons";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation(); // Obtém a localização atual

  // Função para verificar se o link é o da página ativa
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <nav className="navContainer">
        <ul className="navListLeft">
          <li className={isActive("/home-page") ? "active" : ""}>
            <Link to="/home-page">
              <Button src="/img/home.png" alt="Home" label="Home" />
            </Link>
          </li>
          <li className={isActive("/sobre-page") ? "active" : ""}>
            <Link to="/sobre-page">
              <Button src="/img/sobre.png" alt="Sobre" label="Sobre" />
            </Link>
          </li>
          <li className={isActive("/grafico-page") ? "active" : ""}>
            <Link to="/grafico-page">
              <Button src="/img/grafico.png" alt="Gráfico" label="Gráfico" />
            </Link>
          </li>
          <li className={isActive("/table-page") ? "active" : ""}>
            <Link to="/table-page">
              <Button src="/img/tabela.png" alt="Tabela" label="Tabela" />
            </Link>
          </li>
        </ul>

        {/* Grupo da direita (botão "Sair") */}
        <ul className="navListRight">
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">
              <Button src="/img/sair.png" alt="Sair" label="Sair" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
