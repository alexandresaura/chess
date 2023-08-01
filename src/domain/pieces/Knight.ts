import { Color, Piece, PieceType } from './Piece';
import { Board } from '../Board';
import { Position } from '../Position';

export class Knight extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Knight);
  }

  public getValidMoves(board: Board, position: Position): Position[] {
    const moves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ] as const;

    const validMoves = moves.reduce((acc: Position[], move) => {
      const newPosition = this.getMove(board, position, move);
      if (!newPosition) return acc;

      return [...acc, newPosition];
    }, []);

    return validMoves;
  }

  public toString(): string {
    return this.color === Color.WHITE ? '♘' : '♞';
  }
}
