import React, { useState } from 'react';
import BoardgameSearchItem from '../BoardgameSearchItem/BoardgameSearchItem.jsx';
import './AddBoardgame.css';

const AddBoardgame = () => {
  const [boardgames, setBoardgames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchBoardgame = async title => {
    const response = await fetch(`/api/bgg/search?query=${title}`);
    const boardgames = await response.json();
    console.log(boardgames);
    setBoardgames(boardgames);
  };

  return (
    <div>
      <div>
        <input
          className="border"
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className="border border-teal-400 rounded-sm font-semibold px-4 m-1 bg-teal-400 text-white"
          onClick={() => searchBoardgame(searchTerm)}
        >
          SEARCH
        </button>
      </div>
      <div>
        {boardgames.map(boardgame => (
          <div key={boardgame.bggId}>
            {<BoardgameSearchItem bgData={boardgame} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBoardgame;
