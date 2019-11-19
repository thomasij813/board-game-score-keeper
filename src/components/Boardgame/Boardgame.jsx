import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Boardgame.css';

const calculateLeaderBoard = boardgame => {
  if (!boardgame.rounds) {
    return [];
  }

  const leaderBoardAccum = {};

  boardgame.rounds.forEach(round => {
    const { finalScores } = round;
    for (let player in finalScores) {
      const score = finalScores[player];
      if (leaderBoardAccum[player]) {
        leaderBoardAccum[player] += score;
      } else {
        leaderBoardAccum[player] = score;
      }
    }
  });

  return Object.keys(leaderBoardAccum)
    .map(player => {
      return { name: player, score: leaderBoardAccum[player] };
    })
    .sort((a, b) => b.score - a.score);
};

const getBoardgame = async (id, cb) => {
  const response = await fetch(`/api/boardgame/${id}`);
  const data = await response.json();
  cb(data);
};

const Boardgame = () => {
  const { id } = useParams();
  const [boardgame, setBoardgame] = useState({});
  useEffect(() => {
    getBoardgame(id, setBoardgame);
  }, []);

  const rounds = boardgame.rounds ? (
    <p>Rounds Played: {boardgame.rounds.length}</p>
  ) : null;

  const leaderBoard = calculateLeaderBoard(boardgame);

  return (
    <div>
      <p className="text-4xl">{boardgame.title}</p>
      {rounds}
      <table className="table-auto">
        <tbody>
          {leaderBoard.map((player, i) => {
            return (
              <tr key={i}>
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Boardgame;
