import { Color, Piece, PieceType } from './Piece';
import { Board } from '../Board';
import { Position } from '../Position';

export class Queen extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Knight);
  }

  public validMoves(board: Board, position: Position): Position[] {
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ] as const;

    const validMoves = moves.reduce((acc: Position[], move) => {
      let actualPosition = position;
      while (true) {
        const newPosition = this.getMove(board, actualPosition, move);

        if (!newPosition) break;
        acc.push(newPosition);

        const square = board.getSquare(newPosition);
        if (square.isOccupiedByEnemy(this.color)) break;

        actualPosition = newPosition;
      }

      return acc;
    }, []);

    return validMoves;
  }

  public toString(): string {
    return this.color === Color.WHITE ? '♕' : '♛';
  }
}
