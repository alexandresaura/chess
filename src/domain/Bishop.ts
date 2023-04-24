import { Board } from "./Board";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Bishop extends Piece {
  public validMoves(board: Board, position: Position): Position[] {
    const moves = [
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
}
