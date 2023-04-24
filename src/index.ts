import { Position } from './domain/Position';
import { Board } from './domain/Board';
const prompt = require('prompt-sync')({sigint: true});

const board = new Board();

while (true) {
  const humanPosition = prompt('Enter a position: ');
  const position = Position.fromHumanPosition(humanPosition);

  board.getValidMovesAndCaptures(position).forEach((move) => {
    console.log(move.toString());
  });

  const humanPosition2 = prompt('Enter a position: ');
  const position2 = Position.fromHumanPosition(humanPosition2);

  board.movePiece(position, position2);
}
