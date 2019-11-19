import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const getBoardgames = async cb => {
  const response = await fetch('/api/boardgame');
  const data = await response.json();
  cb(data);
};

const BoardgamePreview = ({ bgData }) => {
  return (
    <div className="flex pt-4 pb-4 mt-2 mb-2 cursor-pointer hover:bg-gray-100 hover:shadow-xl hover:border-8 hover:rounded-sm hover:border-gray-400">
      <div className="bg-thumbnail flex-none ml-6 mr-6">
        <img
          className="object-contain object-center h-full w-full"
          src={bgData.thumbnail}
          alt="bg thumbnail"
        />
      </div>
      <div className="ml-4 mr-4">
        <p>
          <span className="text-xl">{bgData.title}</span>&nbsp;
          <span className="text-gray-500">{bgData.yearpublished}</span>
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    getBoardgames(setBoardgames);
  }, []);

  return (
    <div>
      {boardgames.map(boardgame => (
        <Link key={boardgame.bggId} to={`/boardgame/${boardgame.bggId}`}>
          <BoardgamePreview bgData={boardgame} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
