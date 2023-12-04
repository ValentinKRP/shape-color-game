import React from 'react'

import { GameElementInterface } from '../models/GameElementInterface';

interface GameElementProps {
  element: GameElementInterface;
  handleClick: () => void;
}

const GameElementComponent: React.FC<GameElementProps> = ({ element, handleClick }) => {

  let elementStyle = '';
  if (element.color === 'green') {
    elementStyle = 'green-element';
  } else if (element.color === 'red') {
    elementStyle = 'red-element';
  }

  return (
    <div className={elementStyle} onClick={handleClick}>
      <p>{element.type}</p>
      <p>{element.id}</p>
    </div>
  );
};

export default GameElementComponent;
