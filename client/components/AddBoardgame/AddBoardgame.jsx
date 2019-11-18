import React, { useState } from 'react';
import './AddBoardgame.css';

const AddBoardgame = () => {
  const [boardgames, setBoardgames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchBoardgame = async title => {
    const response = await fetch(`/api/bgg/search?query=${title}`);
    const boardgames = await response.json();
    setBoardgames(boardgames);
  };

  return (
    <div>
      <div>
        <input type="text" onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={() => searchBoardgame(searchTerm)}>Search</button>
      </div>
      <div>
        {boardgames.map(boardgame => (
          <p key={boardgame.id}>{boardgame.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AddBoardgame;
