import React, { useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import HomeButton from "../Buttons/HomeButton";
import GraficoButton from "../Buttons/GraficoButton";
import TabelaButton from "../Buttons/TabelaButton";
import SairButton from "../Buttons/SairButton";

const Header: React.FC = () => {
  const location = useLocation();
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const getActiveLabel = () => {
    switch (location.pathname) {
      case "/home-page":
        return "Home";
      case "/grafico-page":
        return "Gráfico";
      case "/table-page":
        return "Tabela";
      default:
        return "";
    }
  };

  const labelToShow = hoverLabel || getActiveLabel();

  return (
    <header className="header">
      <nav className="navContainer">
        <div className="logoContainer">
          <img src="/img/headerlogo.png" alt="Logo" className="logo" />
        </div>

        {/* TEXTO AO LADO DOS BOTÕES */}
        <div className="activeLabel">{labelToShow}</div>

        <ul className="navListLeft">
          <li
            className={isActive("/home-page") ? "active" : ""}
            onMouseEnter={() => setHoverLabel("Home")}
            onMouseLeave={() => setHoverLabel(null)}
          >
            <Link to="/home-page">
              <HomeButton />
            </Link>
          </li>
          <li
            className={isActive("/grafico-page") ? "active" : ""}
            onMouseEnter={() => setHoverLabel("Gráfico")}
            onMouseLeave={() => setHoverLabel(null)}
          >
            <Link to="/grafico-page">
              <GraficoButton />
            </Link>
          </li>
          <li
            className={isActive("/table-page") ? "active" : ""}
            onMouseEnter={() => setHoverLabel("Tabela")}
            onMouseLeave={() => setHoverLabel(null)}
          >
            <Link to="/table-page">
              <TabelaButton />
            </Link>
          </li>
        </ul>

        <ul className="navListRight">
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">
              <SairButton />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;