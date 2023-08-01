import { Color, Piece } from './pieces/Piece';
import { Position } from './Position';

export class Square {
  constructor(
    public readonly position: Position,
    public piece: Piece | null = null,
  ) {}

  public isOccupied(): boolean {
    return this.piece !== null;
  }

  public isOccupiedByAlly(color: Color): boolean {
    return this.isOccupied() && this.piece!.color === color;
  }

  public isOccupiedByEnemy(color: Color): boolean {
    return this.isOccupied() && this.piece!.color !== color;
  }
}
