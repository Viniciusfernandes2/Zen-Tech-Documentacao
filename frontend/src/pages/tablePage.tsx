import React, { useState } from "react";
import Header from "../components/Header/header";
import TableColinas from "../components/TableFrom/tableColina";
import TableReserv from "../components/TableFrom/tableReserv";
import "../styles/tablePage.css";  

const TablePage = () => {
  const [showColinas, setShowColinas] = useState(false);
  const [showReserv, setShowReserv] = useState(false);

  return (
    <>
      <Header />
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={showColinas}
            onChange={(e) => setShowColinas(e.target.checked)}
          />
          Exibir Colinas
        </label>
        <label>
          <input
            type="checkbox"
            checked={showReserv}
            onChange={(e) => setShowReserv(e.target.checked)}
          />
          Exibir Reservatório
        </label>
      </div>
      <div className="table-container">
      {showColinas && <TableColinas />}
    </div>
    <div className="table-container">
      {showReserv && <TableReserv />}
    </div>
    </>
  );
};

export default TablePage;