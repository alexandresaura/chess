import { Color, Piece, PieceType } from './Piece';
import { Board } from '../Board';
import { Position } from '../Position';

export class King extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Bishop);
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
      const newPosition = this.getMove(board, position, move);
      if (!newPosition) return acc;

      return [...acc, newPosition];
    }, []);

    return validMoves;
  }

  public toString(): string {
    return this.color === Color.WHITE ? '♔' : '♚';
  }
}
