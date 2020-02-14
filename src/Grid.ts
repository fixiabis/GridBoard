import GridBoard from "./GridBoard";
import GridDirection from "./GridDirection";
import GridOrientation from "./GridOrientation";
import { DefaultGridState } from "./types/default";

class Grid<GridPiece, GridState extends DefaultGridState = {}> {
    public readonly x: number;
    public readonly y: number;
    public readonly i: number;
    public piece: GridPiece | null;
    public state: GridState | null;
    public readonly board: GridBoard<GridPiece, GridState>;

    constructor(x: number, y: number, board: GridBoard<GridPiece, GridState>) {
        this.x = x;
        this.y = y;
        this.i = x * board.height + y;
        this.piece = null;
        this.state = null;
        this.board = board;
    }

    public getGridByDirection(direction: GridDirection | number): Grid<GridPiece, GridState> | null {
        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    public getGridByRelativeCoordinate(dx: number, dy: number): Grid<GridPiece, GridState> | null {
        let x = this.x + dx;
        let y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }

    public getGridByDirectionFromOrientation(direction: GridDirection | number, orientation: GridOrientation | number = this.board.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        if (isAxisNeedSwap) {
            [f, b, l, r] = [l, r, f, b];
        }

        if (isXAxisOrderByDescending) {
            [r, l] = [l, r];
        }

        if (isYAxisOrderByDescending) {
            [b, f] = [f, b];
        }

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    public getGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: GridOrientation | number = this.board.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        if (isAxisNeedSwap) {
            [dy, dx] = [dx, dy];
        }

        if (isXAxisOrderByDescending) {
            dx = -dx;
        }

        if (isYAxisOrderByDescending) {
            dy = -dy;
        }

        return this.getGridByRelativeCoordinate(dx, dy);
    }

    public movePieceToGrid(grid: Grid<GridPiece, GridState> | null): boolean {
        if (grid === null) {
            return false;
        }

        grid.piece = this.piece;
        this.piece = null;

        return true;
    }

    public movePieceToGridByDirection(direction: GridDirection | number): boolean {
        let grid = this.getGridByDirection(direction);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByRelativeCoordinate(dx: number, dy: number): boolean {
        let grid = this.getGridByRelativeCoordinate(dx, dy);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByDirectionFromOrientation(direction: GridDirection | number, orientation: GridOrientation | number = this.board.orientation): boolean {
        let grid = this.getGridByDirectionFromOrientation(direction, orientation);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: GridOrientation | number = this.board.orientation): boolean {
        let grid = this.getGridByRelativeCoordinateFromOrientation(dx, dy, orientation);

        return this.movePieceToGrid(grid);
    }
}

export default Grid;
