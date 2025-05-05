import { tableColinas } from "../../services/tableService";
import Table from "../TableFrom/table";

export default function TableReserv() {
  return (
    <Table
      fetchData={tableColinas}
      title="Dados Meteorológicos - Estação Reservatório"
    />
  );
}