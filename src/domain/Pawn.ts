import { Board } from "./Board";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {

  private doubleMove(board: Board, position: Position): Position | null {
    const move = this.color === "white" ? [0, 2] as const : [0, -2] as const;

    return this.getMove(board, position, move, false);
  };

  private defaultMove(board: Board, position: Position): Position | null {
    const move = this.color === "white" ? [0, 1] as const : [0, -1] as const;

    return this.getMove(board, position, move, false);
  }

  public validMoves(board: Board, position: Position): Position[] {
    const validMoves: Position[] = [];

    const defaultMove = this.defaultMove(board, position);
    if (!defaultMove) return validMoves;

    validMoves.push(defaultMove);
    if (this.hasMoved) return validMoves;

    const doubleMove = this.doubleMove(board, position);
    if (!doubleMove) return validMoves;

    validMoves.push(doubleMove);
    return validMoves;
  }

  public validCaptureMoves(board: Board, position: Position): Position[] {
    const captureMoves: [number, number][] = this.color === "white" ? [[1, 1], [-1, 1]] : [[-1, -1], [1, -1]];

    const validCaptureMoves = captureMoves.reduce((acc: Position[], captureMove) => {
      const newPosition = this.getMove(board, position, captureMove);
      if (!newPosition) return acc;

      const square = board.getSquare(newPosition);
      if (!square.isOccupiedByEnemy(this.color)) return acc;

      return [...acc, newPosition];
    }, []);

    return validCaptureMoves;
  }
};
