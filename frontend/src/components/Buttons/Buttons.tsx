import React, { useState, ReactElement } from 'react';
import './Buttons.css';

interface ButtonProps {
  Icon: ReactElement;
  label: string;
  isActive?: boolean; // adicionamos isso
}

const Button = ({ Icon, label, isActive = false }: ButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`buttonContainer ${isActive ? "active" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="imageWrapper">
        {Icon}
      </div>
    </div>
  );
};

export default Button;

