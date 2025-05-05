import React from "react";
import "./header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="navList">
          <li className="home-button">
            <a href="/home-page" className="nav-link">
              {" "}
              Home
            </a>
          </li>
          <li className="sobre-button">
            <a href="/Sobre-page" className="nav-link">
              {" "}
              Sobre
            </a>
          </li>

<<<<<<< HEAD
          <li className="table-button">
            <a href="/table-page" className="nav-link"> Tabelas
            </a>
          </li>

          <li className="sobre-button">
            <a href="/Sobre-page" className="nav-link"> Sobre
=======
          <li className="graficos-button">
            <a href="/grafico-page" className="nav-link">
              {" "}
              Gráficos
            </a>
          </li>

          <li className="table-button">
            <a href="/table-page" className="nav-link">
              {" "}
              table
>>>>>>> d45d7d67bf4c9bc92863c556329ef8bc106c0f62
            </a>
          </li>

          <li className="sair-button">
            <a href="/" className="nav-link">
              {" "}
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
