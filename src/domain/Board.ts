import { Square } from './Square';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';
import { Pawn } from './pieces/Pawn';
import { columns, machinePosition, Position } from './Position';
import { Color } from './pieces/Piece';

export class Board {
  private squares: Square[][] = [];
  private lastMove: Square[] = [];

  constructor() {
    columns.forEach((_column, index) => {
      this.squares[index] = [];
    });
    this.reset();
  }

  public getLastMove(): Square[] {
    return this.lastMove;
  }

  public getSquare(position: Position): Square {
    return this.squares[position.x][position.y];
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

    if (!validMoves.includes(to)) throw new Error('Move is not valid');

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;
    toSquare.piece.hasMoved = true;

    this.lastMove = [fromSquare, toSquare];
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

    this.squares[whiteLeftRookPosition.x][whiteLeftRookPosition.y] = new Square(
      whiteLeftRookPosition,
      new Rook(Color.WHITE),
    );
    this.squares[whiteLeftKnightPosition.x][whiteLeftKnightPosition.y] = new Square(
      whiteLeftKnightPosition,
      new Knight(Color.WHITE),
    );
    this.squares[whiteLeftBishopPosition.x][whiteLeftBishopPosition.y] = new Square(
      whiteLeftBishopPosition,
      new Bishop(Color.WHITE),
    );
    this.squares[whiteQueenPosition.x][whiteQueenPosition.y] = new Square(whiteQueenPosition, new Queen(Color.WHITE));
    this.squares[whiteKingPosition.x][whiteKingPosition.y] = new Square(whiteKingPosition, new King(Color.WHITE));
    this.squares[whiteRightBishopPosition.x][whiteRightBishopPosition.y] = new Square(
      whiteRightBishopPosition,
      new Bishop(Color.WHITE),
    );
    this.squares[whiteRightKnightPosition.x][whiteRightKnightPosition.y] = new Square(
      whiteRightKnightPosition,
      new Knight(Color.WHITE),
    );
    this.squares[whiteRightRookPosition.x][whiteRightRookPosition.y] = new Square(
      whiteRightRookPosition,
      new Rook(Color.WHITE),
    );

    const blackLeftRookPosition = Position.fromHumanPosition('a8');
    const blackLeftKnightPosition = Position.fromHumanPosition('b8');
    const blackLeftBishopPosition = Position.fromHumanPosition('c8');
    const blackQueenPosition = Position.fromHumanPosition('d8');
    const blackKingPosition = Position.fromHumanPosition('e8');
    const blackRightBishopPosition = Position.fromHumanPosition('f8');
    const blackRightKnightPosition = Position.fromHumanPosition('g8');
    const blackRightRookPosition = Position.fromHumanPosition('h8');

    this.squares[blackLeftRookPosition.x][blackLeftRookPosition.y] = new Square(
      blackLeftRookPosition,
      new Rook(Color.BLACK),
    );
    this.squares[blackLeftKnightPosition.x][blackLeftKnightPosition.y] = new Square(
      blackLeftKnightPosition,
      new Knight(Color.BLACK),
    );
    this.squares[blackLeftBishopPosition.x][blackLeftBishopPosition.y] = new Square(
      blackLeftBishopPosition,
      new Bishop(Color.BLACK),
    );
    this.squares[blackQueenPosition.x][blackQueenPosition.y] = new Square(blackQueenPosition, new Queen(Color.BLACK));
    this.squares[blackKingPosition.x][blackKingPosition.y] = new Square(blackKingPosition, new King(Color.BLACK));
    this.squares[blackRightBishopPosition.x][blackRightBishopPosition.y] = new Square(
      blackRightBishopPosition,
      new Bishop(Color.BLACK),
    );
    this.squares[blackRightKnightPosition.x][blackRightKnightPosition.y] = new Square(
      blackRightKnightPosition,
      new Knight(Color.BLACK),
    );
    this.squares[blackRightRookPosition.x][blackRightRookPosition.y] = new Square(
      blackRightRookPosition,
      new Rook(Color.BLACK),
    );

    columns.forEach((column) => {
      const whitePawnPosition = Position.fromHumanPosition(`${column}2`);
      this.squares[whitePawnPosition.x][whitePawnPosition.y] = new Square(whitePawnPosition, new Pawn(Color.WHITE));

      const blackPawnPosition = Position.fromHumanPosition(`${column}7`);
      this.squares[blackPawnPosition.x][blackPawnPosition.y] = new Square(blackPawnPosition, new Pawn(Color.BLACK));

      const emptyColumn3Position = Position.fromHumanPosition(`${column}3`);
      this.squares[emptyColumn3Position.x][emptyColumn3Position.y] = new Square(emptyColumn3Position);

      const emptyColumn4Position = Position.fromHumanPosition(`${column}4`);
      this.squares[emptyColumn4Position.x][emptyColumn4Position.y] = new Square(emptyColumn4Position);

      const emptyColumn5Position = Position.fromHumanPosition(`${column}5`);
      this.squares[emptyColumn5Position.x][emptyColumn5Position.y] = new Square(emptyColumn5Position);

      const emptyColumn6Position = Position.fromHumanPosition(`${column}6`);
      this.squares[emptyColumn6Position.x][emptyColumn6Position.y] = new Square(emptyColumn6Position);
    });
  }

  public toString() {
    let board = '';

    machinePosition.forEach((y) => {
      board += `${Math.abs(y - 8)} `;
      machinePosition.forEach((x) => {
        const square = this.squares[x][Math.abs(y - 7)];
        board += square.piece?.toString() ? square.piece.toString() : ' ';
        board += ' ';
      });
      board += '\n';
    });

    board += '  a b c d e f g h\n';

    return board;
  }
}
