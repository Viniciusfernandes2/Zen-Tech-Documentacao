import React from "react";
import "./SobreCard.css";

const SobreFormTable: React.FC = () => {
  return (
    <div className="sobre-container">
      <main className="sobre-main">
        <div className="sobre-card">
          <div className="logo-titulo">
            <h1>Não consegue ver o botão "Baixar CSV"?</h1>
          </div>

          <p>
            O download do arquivo CSV está disponível apenas para
            <strong> usuários cadastrados e logados</strong> no sistema.<br /><br />
            Se você estiver acessando como <strong>visitante</strong>,
            essa funcionalidade ficará indisponível.<br /><br />
            Para habilitar o download:<br />
            • Faça seu <strong>cadastro gratuito</strong>;<br />
            • Efetue o <strong>login</strong> com sua conta.<br /><br />
            Após o login, o botão <strong>"Exportar CSV"</strong> será ativado para você.
          </p>
        </div>

        <div className="sobre-img">
          <img src="img/SobreTable.png" alt="Ilustração sobre o uso da tabela" />
        </div>
      </main>
    </div>
  );
};

export default SobreFormTable;