import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories', repo => {
      setRepositories(repo);
    })

  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Teste 001",
      techs: ["01", "02"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);
      const repos = repositories.filter( r => r.id !== id);
      setRepositories(repos);
  }

  return (
    <div>
        <ul data-testid="repository-list">
          {repositories.map(r => (
            <li key={r.id}>
              {r.title}
              <button onClick={() => handleRemoveRepository(r.id)}>Remover</button>
            </li>
          ))}
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
