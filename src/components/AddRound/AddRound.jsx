import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AddRound.css';

const getBoardgames = async cb => {
  const response = await fetch('/api/boardgame');
  const data = await response.json();
  cb(data);
};

const AddRound = () => {
  const history = useHistory();
  const [boardgames, setBoardgames] = useState([]);
  const [selectGameId, setSelectedGameId] = useState(null);
  const [finalScores, setFinalScores] = useState([
    [null, null],
    [null, null]
  ]);

  useEffect(() => {
    getBoardgames(boardgames => {
      setBoardgames(boardgames);
      if (boardgames.length > 0) {
        setSelectedGameId(boardgames[0].bggId);
      }
    });
  }, []);

  const handleNameChange = (e, i) => {
    const { value } = e.target;
    const newPlayerScore = finalScores[i].slice();
    newPlayerScore[0] = value;
    const newFinalScores = finalScores.slice();
    newFinalScores[i] = newPlayerScore;
    setFinalScores(newFinalScores);
  };

  const handleScoreChange = (e, i) => {
    const { value } = e.target;
    const newPlayerScore = finalScores[i].slice();
    newPlayerScore[1] = value;
    const newFinalScores = finalScores.slice();
    newFinalScores[i] = newPlayerScore;
    setFinalScores(newFinalScores);
  };

  const handleAddPlayerClick = () => {
    const newFinalScores = finalScores.slice();
    newFinalScores.push([null, null]);
    setFinalScores(newFinalScores);
  };

  const submitRound = async () => {
    const url = `/api/boardgame/${selectGameId}/round`;
    const data = finalScores.reduce((accum, tuple) => {
      accum[tuple[0]] = parseInt(tuple[1]);
      return accum;
    }, {});
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response.json());
    history.push(`/boardgame/${selectGameId}`);
  };

  return (
    <div>
      <p>Select your boardgame:</p>
      <select onChange={e => setSelectedGameId(parseInt(e.target.value))}>
        {boardgames.map(boardgame => (
          <option key={boardgame.bggId} value={boardgame.bggId}>
            {boardgame.title}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {finalScores.map((player, i) => (
            <tr key={i}>
              <td>
                <input
                  className="border-2 border-gray-500"
                  type="text"
                  onChange={e => handleNameChange(e, i)}
                />
              </td>
              <td>
                <input
                  className="border-2 border-gray-500"
                  type="number"
                  onChange={e => handleScoreChange(e, i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={submitRound}
        className="border border-teal-400 rounded-sm font-semibold px-4 m-1 bg-teal-400 text-white"
      >
        SUBMIT
      </button>
      <button
        onClick={handleAddPlayerClick}
        className="border border-gray-500 rounded-sm font-semibold px-4 m-1 text-gray-500"
      >
        ADD PLAYER
      </button>
    </div>
  );
};

export default AddRound;
