import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Round.css';

const getRound = async (bggId, roundId, cb) => {
  const response = await fetch(`/api/boardgame/${bggId}/round/${roundId}`);
  const data = await response.json();
  console.log(data);
  cb(data);
};

const Round = () => {
  const { bggId, roundId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getRound(bggId, roundId, setData);
  }, []);

  if (data.length === 0) {
    return null;
  }

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const playDate = new Date(data.createdAt);
  const dateString = playDate.toLocaleString('en-US', dateOptions);

  console.log(dateString);
  return (
    <div>
      <p>{dateString}</p>
      <table className="table-auto">
        <tbody>
          {Object.keys(data.finalScores).map((player, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{player}</td>
              <td className="border px-4 py-2">{data.finalScores[player]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Round;
