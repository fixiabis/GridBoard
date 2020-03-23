import GridBoard from "./GridBoard";
import { Vector } from "./Direction";

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

    public getGridByRelativeCoordinate(dx: number, dy: number): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(direction: Vector): Grid<GridPiece, GridState> | null;
    public getGridByRelativeCoordinate(dx: number | Vector, dy?: number): Grid<GridPiece, GridState> | null {
        if (dy === undefined || typeof dx === "object") {
            return this.getGridByRelativeCoordinate(...dx as [number, number]);
        }

        const x = this.x + dx;
        const y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }
}

interface Grid<GridPiece, GridState> {
    getGridTo: {
        (x: number, y: number): Grid<GridPiece, GridState> | null;
        (direction: Vector): Grid<GridPiece, GridState> | null;
    };
}

Grid.prototype.getGridTo = Grid.prototype.getGridByRelativeCoordinate;

export default Grid;
