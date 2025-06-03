import React from 'react';
import './DateFilter.css'; // Importando o CSS

interface DateFilterProps {
  dataEscolhida: string;
  onDataEscolhidaChange: (data: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dataEscolhida, onDataEscolhidaChange }) => {
  return (
    <div className="filtroData">
      <label>Escolha a Data:</label>
      <input 
        type="date" 
        value={dataEscolhida} 
        onChange={e => onDataEscolhidaChange(e.target.value)} 
      />
    </div>
  );
};

export default DateFilter;
