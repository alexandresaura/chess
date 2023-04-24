import { Color, Piece } from "./Piece";
import { Position } from "./Position";

export class Square {
  private _position: Position;
  private _piece: Piece | null = null;

  constructor(position: Position, piece: Piece | null = null) {
    this._position = position;
    this._piece = piece;
  }

  get position(): Position {
    return this._position;
  }

  get piece(): Piece | null {
    return this._piece;
  }

  set piece(piece: Piece | null) {
    this._piece = piece;
  }

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
