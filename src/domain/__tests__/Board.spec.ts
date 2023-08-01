import { Board } from '../Board';
import { Position } from '../Position';
import { PieceType } from '../pieces/Piece';

describe('Board', () => {
  describe('getValidMovesAndCaptures', () => {
    it('should return the correct valid moves for a piece', () => {
      const board = new Board();
      const validMoves = board.getValidMovesAndCaptures(Position.fromHumanPosition('e2'));
      expect(validMoves).toContain(Position.fromHumanPosition('e3'));
      expect(validMoves).toContain(Position.fromHumanPosition('e4'));
    });
  });

  describe('movePiece', () => {
    it('should move a piece to a valid square', () => {
      const board = new Board();
      board.movePiece(Position.fromHumanPosition('e2'), Position.fromHumanPosition('e4'));
      expect(board.getSquare(Position.fromHumanPosition('e4')).piece?.type).toBe(PieceType.Pawn);
      expect(board.getSquare(Position.fromHumanPosition('e2')).piece).toBeNull();
    });

    it('should throw an error if there is no piece to move', () => {
      const board = new Board();
      expect(() => board.movePiece(Position.fromHumanPosition('e3'), Position.fromHumanPosition('e4'))).toThrow();
    });

    it('should throw an error if the move is not valid', () => {
      const board = new Board();
      expect(() => board.movePiece(Position.fromHumanPosition('e2'), Position.fromHumanPosition('e5'))).toThrow();
    });
  });
});
