import { Square } from "./Square";
import { Rook } from "./Rook";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Queen } from "./Queen";
import { King } from "./King";
import { Pawn } from "./Pawn";
import { columns,  Position } from "./Position";

export class Board {
  private _squares: Square[][] = [];

  constructor() {
    columns.forEach((_column, index) => {
      this._squares[index] = [];
    });
    this.reset();
  }

  public getSquare(position: Position): Square {
    return this._squares[position.x][position.y];
  }

  public getValidMovesAndCaptures(position: Position): Position[] {
    const square = this.getSquare(position);
    if (!square.piece) return [];

    const validMoves = square.piece.validMoves(this, position);
    const validCapturesMoves = square.piece.validCaptureMoves(this, position);

    const validMovesAndCaptures = new Set([...validMoves, ...validCapturesMoves]);

    return Array.from(validMovesAndCaptures);
  }

  public movePiece(from: Position, to: Position) {
    const fromSquare = this.getSquare(from);
    const toSquare = this.getSquare(to);

    if (!fromSquare.piece) throw new Error('No piece to move');

    let validMoves: Position[] = [];

    if (toSquare.piece) {
      validMoves = fromSquare.piece.validCaptureMoves(this, from);
    } else {
      validMoves = fromSquare.piece.validMoves(this, from);
    }

    if (validMoves.includes(to)) {
      toSquare.piece = fromSquare.piece;
      fromSquare.piece = null;
      toSquare.piece.hasMoved = true;
    }
  }

  public reset() {
    const whiteLeftRookPosition = Position.fromHumanPosition('a1');
    const whiteLeftKnightPosition = Position.fromHumanPosition('b1');
    const whiteLeftBishopPosition = Position.fromHumanPosition('c1');
    const whiteQueenPosition = Position.fromHumanPosition('d1');
    const whiteKingPosition = Position.fromHumanPosition('e1');
    const whiteRightBishopPosition = Position.fromHumanPosition('f1');
    const whiteRightKnightPosition = Position.fromHumanPosition('g1');
    const whiteRightRookPosition = Position.fromHumanPosition('h1');

    this._squares[whiteLeftRookPosition.x][whiteLeftRookPosition.y] = new Square(whiteLeftRookPosition, new Rook('white'));
    this._squares[whiteLeftKnightPosition.x][whiteLeftKnightPosition.y] = new Square(whiteLeftKnightPosition, new Knight('white'));
    this._squares[whiteLeftBishopPosition.x][whiteLeftBishopPosition.y] = new Square(whiteLeftBishopPosition, new Bishop('white'));
    this._squares[whiteQueenPosition.x][whiteQueenPosition.y] = new Square(whiteQueenPosition, new Queen('white'));
    this._squares[whiteKingPosition.x][whiteKingPosition.y] = new Square(whiteKingPosition, new King('white'));
    this._squares[whiteRightBishopPosition.x][whiteRightBishopPosition.y] = new Square(whiteRightBishopPosition, new Bishop('white'));
    this._squares[whiteRightKnightPosition.x][whiteRightKnightPosition.y] = new Square(whiteRightKnightPosition, new Knight('white'));
    this._squares[whiteRightRookPosition.x][whiteRightRookPosition.y] = new Square(whiteRightRookPosition, new Rook('white'));

    const blackLeftRookPosition = Position.fromHumanPosition('a8');
    const blackLeftKnightPosition = Position.fromHumanPosition('b8');
    const blackLeftBishopPosition = Position.fromHumanPosition('c8');
    const blackQueenPosition = Position.fromHumanPosition('d8');
    const blackKingPosition = Position.fromHumanPosition('e8');
    const blackRightBishopPosition = Position.fromHumanPosition('f8');
    const blackRightKnightPosition = Position.fromHumanPosition('g8');
    const blackRightRookPosition = Position.fromHumanPosition('h8');

    this._squares[blackLeftRookPosition.x][blackLeftRookPosition.y] = new Square(blackLeftRookPosition, new Rook('black'));
    this._squares[blackLeftKnightPosition.x][blackLeftKnightPosition.y] = new Square(blackLeftKnightPosition, new Knight('black'));
    this._squares[blackLeftBishopPosition.x][blackLeftBishopPosition.y] = new Square(blackLeftBishopPosition, new Bishop('black'));
    this._squares[blackQueenPosition.x][blackQueenPosition.y] = new Square(blackQueenPosition, new Queen('black'));
    this._squares[blackKingPosition.x][blackKingPosition.y] = new Square(blackKingPosition, new King('black'));
    this._squares[blackRightBishopPosition.x][blackRightBishopPosition.y] = new Square(blackRightBishopPosition, new Bishop('black'));
    this._squares[blackRightKnightPosition.x][blackRightKnightPosition.y] = new Square(blackRightKnightPosition, new Knight('black'));
    this._squares[blackRightRookPosition.x][blackRightRookPosition.y] = new Square(blackRightRookPosition, new Rook('black'));

    columns.forEach((column) => {
      const whitePawnPosition = Position.fromHumanPosition(`${column}2`);
      this._squares[whitePawnPosition.x][whitePawnPosition.y] = new Square(whitePawnPosition, new Pawn('white'));

      const blackPawnPosition = Position.fromHumanPosition(`${column}7`);
      this._squares[blackPawnPosition.x][blackPawnPosition.y] = new Square(blackPawnPosition, new Pawn('black'));

      const emptyColumn3Position = Position.fromHumanPosition(`${column}3`);
      this._squares[emptyColumn3Position.x][emptyColumn3Position.y] = new Square(emptyColumn3Position);

      const emptyColumn4Position = Position.fromHumanPosition(`${column}4`);
      this._squares[emptyColumn4Position.x][emptyColumn4Position.y] = new Square(emptyColumn4Position);

      const emptyColumn5Position = Position.fromHumanPosition(`${column}5`);
      this._squares[emptyColumn5Position.x][emptyColumn5Position.y] = new Square(emptyColumn5Position);

      const emptyColumn6Position = Position.fromHumanPosition(`${column}6`);
      this._squares[emptyColumn6Position.x][emptyColumn6Position.y] = new Square(emptyColumn6Position);
    });
  }
};
