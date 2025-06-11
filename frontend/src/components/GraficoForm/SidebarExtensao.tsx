import React from "react";
import "./Dashboard.css";

type SidebarExtensaoProps = {
  onClose: () => void;
  isOpen: boolean;
};

const SidebarExtensao: React.FC<SidebarExtensaoProps> = ({ onClose, isOpen }) => {
  return (
    <aside className={`sidebar-extensao ${isOpen ? 'open' : ''}`}>
      <div>
        <h3>Extensão</h3>
        <p>Conteúdo da extensão aqui!</p>
      </div>
    </aside>
  );
};

export default SidebarExtensao; 