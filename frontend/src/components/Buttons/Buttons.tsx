import React, { useState } from 'react';

const Button = ({ src, alt, label }: { src: string; alt: string; label: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} />
      {hovered && <div>{label}</div>}
    </div>
  );
};

export default Button;