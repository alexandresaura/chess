import { BoardPosition, Position } from './domain/Position';
import { Board } from './domain/Board';
import readline from 'readline/promises';

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getValidPosition = async (message: string): Promise<Position> => {
  while (true) {
    const input = (await prompt.question(message)) as BoardPosition;
    try {
      const position = Position.fromHumanPosition(input);
      return position;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      continue;
    }
  }
};

const playGame = async () => {
  const board = new Board();

  while (true) {
    console.log(board.toString());

    const fromPosition = await getValidPosition('Enter a position: ');

    const validMoves = board.getValidMovesAndCaptures(fromPosition).join(', ');
    console.log(`Valid moves: ${validMoves}`);

    const toPosition = await getValidPosition('Enter a position: ');

    board.movePiece(fromPosition, toPosition);
  }
};

playGame().catch((error) => {
  console.error(error);
  process.exit(1);
});
