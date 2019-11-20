import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const RoundLink = ({ createdAt, _id, bggId }) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const playDate = new Date(createdAt);
  const dateString = playDate.toLocaleString('en-US', dateOptions);

  return <Link to={`/boardgame/${bggId}/round/${_id}`}>{dateString}</Link>;
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

  const leaderBoard = calculateLeaderBoard(boardgame);

  const roundsList = !boardgame.rounds ? null : (
    <div className="m-2">
      <p className="font-semibold">Rounds Played</p>
      <ul>
        {boardgame.rounds.map((round, i) => (
          <li key={round._id}>
            <RoundLink
              bggId={boardgame.bggId}
              createdAt={round.createdAt}
              _id={round._id}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <p className="text-4xl">{boardgame.title}</p>
      <div className="m-2">
        <p className="font-semibold">Leaderboard</p>
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
      {roundsList}
    </div>
  );
};

export default Boardgame;
