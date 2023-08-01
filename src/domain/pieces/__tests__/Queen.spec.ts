import { Board } from '../../Board';
import { Position } from '../../Position';
import { Pawn } from '../Pawn';
import { Color } from '../Piece';
import { Queen } from '../Queen';

describe('Queen', () => {
  describe('getValidMoves', () => {
    it('should return all valid moves for a queen in the center of an empty board', () => {
      const board = new Board();
      board.emptyBoard();
      const queen = new Queen(Color.WHITE);

      const validMoves = queen.getValidMoves(board, Position.fromHumanPosition('d4'));
      const validMovesPositions = validMoves.map((move) => move.toString());

      expect(validMovesPositions).toEqual(
        // prettier-ignore
        expect.arrayContaining([
          'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', // Diagonal moves
          'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', // Vertical moves
          'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', // Horizontal moves
        ]),
      );
    });

    it('should return only valid moves for a queen blocked by other pieces', () => {
      const board = new Board();
      board.emptyBoard();
      const queen = new Queen(Color.WHITE);

      board.addPiece(Position.fromHumanPosition('e5'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('e4'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('e3'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('d3'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('c3'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('c4'), new Pawn(Color.WHITE));
      board.addPiece(Position.fromHumanPosition('c5'), new Pawn(Color.WHITE));

      const validMoves = queen.getValidMoves(board, Position.fromHumanPosition('d4'));
      const validMovesPositions = validMoves.map((move) => move.toString());

      expect(validMovesPositions).toEqual(
        expect.arrayContaining(['d5', 'd6', 'd7', 'd8']), // Only vertical moves
      );

      expect(validMovesPositions).not.toEqual(
        // prettier-ignore
        expect.arrayContaining([
          'a1', 'e5', 'g7', 'h8', 'e3', 'c3', 'c5', 'h1', // Invalid moves
        ]),
      );
    });
  });
});
