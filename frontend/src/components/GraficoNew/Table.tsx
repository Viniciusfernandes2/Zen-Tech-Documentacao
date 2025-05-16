import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface TableInterface {
  id: number;
  temp: string;
  hum: string;
  bar: string;
  cab_temp: string;
  bat_volts: string;
  uv_level: string;
  wind_peak: string;
  wind_rt: string;
  wind_avg: string;
  wind_dir_rt: string;
  wind_dir_avg: string;
  reading_time: string;
}

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #0077cc;
`;

const Th = styled.th`
  padding: 14px;
  color: white;
  border-bottom: 2px solid #005fa3;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f4f9ff;
  }
 
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.9rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: #005fa3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
`;

// Componente principal
const Tabela: React.FC = () => {
  const [data, setData] = useState<TableInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortConfig, setSortConfig] = useState<{ key: keyof TableInterface; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    axios.get<TableInterface[]>('http://localhost:3006/sensor')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Erro ao buscar dados:', err));
  }, []);

  const handleSort = (key: keyof TableInterface) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' }; // Começa do maior pro menor
    });
    setCurrentPage(1);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aVal = parseFloat(a[sortConfig.key] as string);
      const bVal = parseFloat(b[sortConfig.key] as string);

      const isNumeric = !isNaN(aVal) && !isNaN(bVal);
      const aFinal = isNumeric ? aVal : a[sortConfig.key];
      const bFinal = isNumeric ? bVal : b[sortConfig.key];

      if (aFinal < bFinal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aFinal > bFinal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const renderSortArrow = (key: keyof TableInterface) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('id')}>Id{renderSortArrow('id')}</Th>
            <Th onClick={() => handleSort('reading_time')}>Hora{renderSortArrow('reading_time')}</Th>
            <Th onClick={() => handleSort('temp')}>Temp (°C){renderSortArrow('temp')}</Th>
            <Th onClick={() => handleSort('hum')}>Umidade (%){renderSortArrow('hum')}</Th>
            <Th onClick={() => handleSort('bar')}>Pressão (hPa){renderSortArrow('bar')}</Th>
            <Th onClick={() => handleSort('bat_volts')}>Tensão (V){renderSortArrow('bat_volts')}</Th>
            <Th onClick={() => handleSort('uv_level')}>UV{renderSortArrow('uv_level')}</Th>
            <Th onClick={() => handleSort('wind_peak')}>Vento Pico{renderSortArrow('wind_peak')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{new Date(item.reading_time).toLocaleTimeString()}</Td>
              <Td>{item.temp}</Td>
              <Td>{item.hum}</Td>
              <Td>{item.bar}</Td>
              <Td>{item.bat_volts}</Td>
              <Td>{item.uv_level}</Td>
              <Td>{item.wind_peak}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination>
        <Button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
          Anterior
        </Button>
        <PageInfo>Página {currentPage} de {totalPages}</PageInfo>
        <Button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
          Próxima
        </Button>
      </Pagination>
    </Container>
  );
};

export default Tabela;
