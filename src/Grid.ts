import GridBoard from "./GridBoard";
import Direction from "./Direction";
import { CoordinateConverter, CoordinateConvert } from "./interfaces";

class Grid<GridPiece = any, GridState = never> {
    public i: number;
    public x: number;
    public y: number;
    public board: GridBoard<GridPiece, GridState>;
    public piece?: GridPiece;
    public state!: GridState;

    constructor(x: number, y: number, board: GridBoard<GridPiece, GridState>) {
        this.i = y * board.width + x;
        this.x = x;
        this.y = y;
        this.board = board;
    }

    public getGridByRelativeCoordinate(dx: number, dy: number, convert?: CoordinateConvert): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(dx: number, dy: number, converter?: CoordinateConverter): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(direction: Direction, convert?: CoordinateConvert): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(direction: Direction, converter?: CoordinateConverter): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(dx: number | Direction, dy?: number | CoordinateConvert | CoordinateConverter, converter?: CoordinateConvert | CoordinateConverter): Grid<GridPiece, GridState> | null {
        if (typeof dy !== "number") {
            converter = dy;
            [dx, dy] = dx as Direction;
        }

        if (typeof dx !== "number") {
            [dx, dy] = dx;
        }

        if (converter) {
            if (typeof converter === "object") {
                [dx, dy] = converter.convertRelativeCoordinate(dx, dy);
            }
            else {
                [dx, dy] = converter(dx, dy);
            }
        }

        const x = this.x + dx;
        const y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }
}

interface Grid<GridPiece, GridState> {
    getGridTo: {
        (x: number, y: number): Grid<GridPiece, GridState> | null;
        (direction: Direction): Grid<GridPiece, GridState> | null;
    };
}

Grid.prototype.getGridTo = Grid.prototype.getGridByRelativeCoordinate;

export default Grid;
