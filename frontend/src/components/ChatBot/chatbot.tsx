import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css'; // estilização separada (opcional)

const Chatbot: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newLog = [...chatLog, `🧑 Você: ${prompt}`];
    setChatLog(newLog);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        prompt,
        model: 'llama3', // troque pelo modelo que você estiver usando
        stream: false,
      });

      setChatLog([...newLog, `🤖 Ollama: ${response.data.response}`]);
    } catch (err) {
      setChatLog([...newLog, '❌ Erro ao se comunicar com o Ollama']);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {chatLog.map((msg, index) => (
          <div key={index} className="chatbot-message">
            {msg}
          </div>
        ))}
        {isLoading && <div className="chatbot-message">⏳ Pensando...</div>}
      </div>

      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chatbot;