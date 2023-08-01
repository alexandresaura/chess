import { Board } from '../Board';
import { MachinePosition, Position } from '../Position';

export enum Color {
  WHITE,
  BLACK,
}
export enum PieceType {
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King,
}

export abstract class Piece {
  constructor(
    public readonly color: Color,
    public readonly type: PieceType,
    public hasMoved = false,
  ) {}

  public abstract validMoves(board: Board, position: Position): Position[];

  public validCaptureMoves(board: Board, position: Position): Position[] {
    return this.validMoves(board, position);
  }

  protected getMove(
    board: Board,
    position: Position,
    move: Readonly<[number, number]>,
    canCapture = true,
  ): Position | null {
    const [dx, dy] = move;
    const x = position.x + dx;
    const y = position.y + dy;
    if (!Position.isValidMachinePosition(x) || !Position.isValidMachinePosition(y)) return null;

    const newPosition = Position.fromMachinePosition(x as MachinePosition, y as MachinePosition);
    const square = board.getSquare(newPosition);

    if (canCapture) {
      if (square.isOccupiedByAlly(this.color)) return null;
    } else {
      if (square.isOccupied()) return null;
    }

    return newPosition;
  }

  public abstract toString(): string;
}
