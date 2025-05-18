import React from "react";
import { FaHome, FaChartBar, FaTable, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import "./header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="navList">
          <li className="home-button">
            <a href="/home-page" className="nav-link">
              <FaHome size={16} /> Home
            </a>
          </li>
          <li className="sobre-button">
            <a href="/Sobre-page" className="nav-link">
              <FaInfoCircle size={16} /> Sobre
            </a>
          </li>
          <li className="graficos-button">
            <a href="/grafico-page" className="nav-link">
              <FaChartBar size={16} /> Gráficos
            </a>
          </li>
          <li className="table-button">
            <a href="/table-page" className="nav-link">
              <FaTable size={16} /> Tabela
            </a>
          </li>
          <li className="sair-button">
            <a href="/" className="nav-link">
              <FaSignOutAlt size={16} /> Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
