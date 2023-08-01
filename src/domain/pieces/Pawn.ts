import { Board } from '../Board';
import { Color, Piece, PieceType } from './Piece';
import { Position } from '../Position';

export class Pawn extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Pawn);
  }

  private doubleMove(board: Board, position: Position): Position | null {
    const move = this.color === Color.WHITE ? ([0, 2] as const) : ([0, -2] as const);

    return this.getMove(board, position, move, false);
  }

  private defaultMove(board: Board, position: Position): Position | null {
    const move = this.color === Color.WHITE ? ([0, 1] as const) : ([0, -1] as const);

    return this.getMove(board, position, move, false);
  }

  public getValidMoves(board: Board, position: Position): Position[] {
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

  private getEnPassantCaptures = (board: Board, position: Position, captureMoves: [number, number][]): Position[] => {
    const [fromSquare, toSquare] = board.getLastMove();

    const hasFromSquareAndToSquare = fromSquare && toSquare;
    if (!hasFromSquareAndToSquare) return [];

    const hasMovedTwoSquares = Math.abs(fromSquare.position.y - toSquare.position.y) === 2;

    if (!(toSquare.piece instanceof Pawn && hasMovedTwoSquares)) return [];

    const validEnPassantCaptureMoves = captureMoves.reduce((acc: Position[], [x, y]) => {
      const newPosition = this.getMove(board, position, [x, 0]);
      if (!newPosition) return acc;

      if (newPosition !== toSquare.position) return acc;

      const enPassantPosition = this.getMove(board, position, [x, y]);
      if (!enPassantPosition) return acc;

      return [...acc, enPassantPosition];
    }, []);

    return validEnPassantCaptureMoves;
  };

  public getValidCaptureMoves(board: Board, position: Position): Position[] {
    const captureMoves: [number, number][] =
      this.color === Color.WHITE
        ? [
            [1, 1],
            [-1, 1],
          ]
        : [
            [-1, -1],
            [1, -1],
          ];

    const validCaptureMoves = captureMoves.reduce((acc: Position[], captureMove) => {
      const newPosition = this.getMove(board, position, captureMove);
      if (!newPosition) return acc;

      const square = board.getSquare(newPosition);
      if (!square.isOccupiedByEnemy(this.color)) return acc;

      return [...acc, newPosition];
    }, []);

    const enPassantCaptures = this.getEnPassantCaptures(board, position, captureMoves);

    return [...validCaptureMoves, ...enPassantCaptures];
  }

  public toString(): string {
    return this.color === Color.WHITE ? '♙' : '♟';
  }
}
