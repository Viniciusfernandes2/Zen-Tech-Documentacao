import React from 'react';
import './header.css'; 

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="navList">
          <li><a href="/home-page">Home</a></li>
          <li><a href="/">Sair</a></li>
          <li><a href="/cadastro-page">Cadastro</a></li>
          {/*userRole === "adm" && <li><a href="/cadastro-page">Cadastro</a></li> 
          ---- APARECER SOMENTE PARA O ADM*/}
        </ul>
      </nav>
    </header>
  );
};

export default Header;