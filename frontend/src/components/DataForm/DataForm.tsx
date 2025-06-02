
import React from "react";

interface FormattedTimeProps {
  dateString: string;
}

const DataForm: React.FC<FormattedTimeProps> = ({ dateString }) => {
  const time = new Date(dateString).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <span>{time}</span>;
};

export default DataForm;
