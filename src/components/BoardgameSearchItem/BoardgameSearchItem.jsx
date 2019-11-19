import React from 'react';
import { useHistory } from 'react-router-dom';
import './BoardgameSearchItem.css';

var decodeHTML = function(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

var reduceWords = (str, maxLength) => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

const BoardgameSearchItem = ({ bgData }) => {
  let history = useHistory();

  const handleClick = async () => {
    const response = await fetch('/api/boardgame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bgData)
    });
    console.log(response.json());
    history.push(`/boardgame/${bgData.bggId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="inline-flex pt-4 pb-4 mt-2 mb-2 cursor-pointer hover:bg-gray-100 hover:shadow-xl hover:border-8 hover:rounded-sm hover:border-gray-400"
    >
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
        <p className="text-xs">
          {reduceWords(decodeHTML(bgData.description), 450)}
        </p>
      </div>
    </div>
  );
};

export default BoardgameSearchItem;
