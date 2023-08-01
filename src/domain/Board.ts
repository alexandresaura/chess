import { Square } from './Square';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';
import { Pawn } from './pieces/Pawn';
import { columns, machinePosition, Position } from './Position';
import { Color, Piece } from './pieces/Piece';

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

    const validMoves = square.piece.getValidMoves(this, position);
    const validCapturesMoves = square.piece.getValidCaptureMoves(this, position);

    const validMovesAndCaptures = new Set([...validMoves, ...validCapturesMoves]);

    return Array.from(validMovesAndCaptures);
  }

  public movePiece(from: Position, to: Position) {
    const fromSquare = this.getSquare(from);
    const toSquare = this.getSquare(to);

    if (!fromSquare.piece) throw new Error('No piece to move');

    let validMoves: Position[] = [];

    if (toSquare.piece) {
      validMoves = fromSquare.piece.getValidCaptureMoves(this, from);
    } else {
      validMoves = fromSquare.piece.getValidMoves(this, from);
    }

    if (!validMoves.includes(to)) throw new Error('Move is not valid');

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;
    toSquare.piece.hasMoved = true;

    this.lastMove = [fromSquare, toSquare];
  }

  public reset() {
    this.emptyBoard();

    this.addPiece(Position.fromHumanPosition('a1'), new Rook(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('b1'), new Knight(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('c1'), new Bishop(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('d1'), new Queen(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('e1'), new King(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('f1'), new Bishop(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('g1'), new Knight(Color.WHITE));
    this.addPiece(Position.fromHumanPosition('h1'), new Rook(Color.WHITE));

    this.addPiece(Position.fromHumanPosition('a8'), new Rook(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('b8'), new Knight(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('c8'), new Bishop(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('d8'), new Queen(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('e8'), new King(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('f8'), new Bishop(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('g8'), new Knight(Color.BLACK));
    this.addPiece(Position.fromHumanPosition('h8'), new Rook(Color.BLACK));

    columns.forEach((column) => {
      this.addPiece(Position.fromHumanPosition(`${column}2`), new Pawn(Color.WHITE));
      this.addPiece(Position.fromHumanPosition(`${column}7`), new Pawn(Color.BLACK));
    });
  }

  public emptyBoard() {
    machinePosition.forEach((y) => {
      machinePosition.forEach((x) => {
        this.squares[x][y] = new Square(Position.fromMachinePosition(x, y));
      });
    });
  }

  public addPiece(position: Position, piece: Piece) {
    this.squares[position.x][position.y].piece = piece;
  }

  public removePiece(position: Position) {
    this.squares[position.x][position.y].piece = null;
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
