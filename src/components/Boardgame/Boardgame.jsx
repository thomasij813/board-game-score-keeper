import React from 'react';
import { useParams } from 'react-router-dom';
import './Boardgame.css';

const Boardgame = () => {
  const { id } = useParams();
  return <h1>Boardgame {id}</h1>;
};

export default Boardgame;
