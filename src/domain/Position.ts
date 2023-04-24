export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const lines = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

type XHumanPosition = typeof columns[number];
type YHumanPosition = typeof lines[number];

const machinePosition = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export type MachinePosition = typeof machinePosition[number];

type BoardPosition = `${XHumanPosition}${YHumanPosition}`;

export type PositionMap = {
  [key in MachinePosition]: {
    [key in MachinePosition]: Position;
  };
};


export class Position {
  private static _positions = machinePosition.reduce((accColumn, column) => ({
    ...accColumn,
    [column]: machinePosition.reduce((accLine, line) => ({
      ...accLine,
      [line]: new Position(column, line),
    }), {}),
  }), {} as PositionMap);

  private _x: MachinePosition;
  private _y: MachinePosition;
  private static readonly _translatePosition = {
    x: {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7,
    },
    y: {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
    },
  } as const;

  private constructor(x: MachinePosition, y: MachinePosition) {
    this._x = x;
    this._y = y;
  }

  public static fromHumanPosition(boardPosition: BoardPosition): Position {
    const [xString, yString] = boardPosition.split('') as [XHumanPosition, YHumanPosition];

    const x = Position._translatePosition.x[xString];
    const y = Position._translatePosition.y[yString];

    if (!Position.isValidMachinePosition(x) || !Position.isValidMachinePosition(y)) throw new Error('Invalid position');

    return Position._positions[x][y];
  }

  public static fromMachinePosition(x: MachinePosition, y: MachinePosition): Position {
    if (!Position.isValidMachinePosition(x) || !Position.isValidMachinePosition(y)) throw new Error('Invalid position');

    return Position._positions[x][y];
  }

  public static isValidMachinePosition(position: number): boolean {
    return position >= 0 && position <= 7;
  }

  get x(): MachinePosition {
    return this._x;
  }

  get y(): MachinePosition {
    return this._y;
  }

  public toString(): BoardPosition {
    const xKeys = Object.keys(Position._translatePosition.x) as XHumanPosition[];
    const yKeys = Object.keys(Position._translatePosition.y) as YHumanPosition[];
    const x = xKeys.find((key) => Position._translatePosition.x[key as XHumanPosition] === this._x) as XHumanPosition;
    const y = yKeys.find((key) => Position._translatePosition.y[key as YHumanPosition] === this._y) as YHumanPosition;

    return `${x}${y}`;
  }
}
