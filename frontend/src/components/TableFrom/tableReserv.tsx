import { tableReserv } from "../../services/tableService";
import Table from "../TableFrom/table";

export default function TableReserv() {
  return (
    <Table
      fetchData={tableReserv}
      title="Dados Meteorológicos - Estação Reservatório"
    />
  );
}