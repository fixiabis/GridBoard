import GridBoard from "./GridBoard";
import GridDirection from "./GridDirection";
import GridOrientation from "./GridOrientation";
import { UniversalGridState } from "./types/default";

class Grid<GridPiece, GridState extends UniversalGridState = {}> {
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

    public getGridByDirection(direction: GridDirection) {
        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    public getGridByRelativeCoordinate(dx: number, dy: number) {
        let x = this.x + dx;
        let y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }

    public getGridByDirectionFromOrientation(direction: GridDirection, orientation: GridOrientation = this.board.orientation) {
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

    public getGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: GridOrientation = this.board.orientation) {
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

    public getGridsByDirectionUntilOverBoundary(direction: GridDirection) {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this;

        while (grid = grid.getGridByDirection(direction)) {
            grids.push(grid);
        }

        return grids;
    }

    public getGridsByDirectionFromOrientationUntilOverBoundary(direction: GridDirection, orientation: GridOrientation = this.board.orientation) {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this;

        while (grid = grid.getGridByDirectionFromOrientation(direction, orientation)) {
            grids.push(grid);
        }

        return grids;
    }

    public getGridsByDirectionUntilGridHasPiece(direction: GridDirection) {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this;

        while (grid = grid.getGridByDirection(direction)) {
            if (grid.piece) {
                break;
            }

            grids.push(grid);
        }

        return grids;
    }

    public getGridsByDirectionFromOrientationUntilGridHasPiece(direction: GridDirection, orientation: GridOrientation = this.board.orientation) {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this;

        while (grid = grid.getGridByDirectionFromOrientation(direction, orientation)) {
            if (grid.piece) {
                break;
            }

            grids.push(grid);
        }

        return grids;
    }

    public getGridsByDirections(directions: GridDirection[]) {
        return directions.map(direction => this.getGridByDirection(direction));
    }

    public getGridsByRelativeCoordinates(coordinates: [number, number][]) {
        return coordinates.map(([dx, dy]) => this.getGridByRelativeCoordinate(dx, dy));
    }

    public getGridsByDirectionsFromOrientation(directions: GridDirection[], orientation: GridOrientation = this.board.orientation) {
        return directions.map(direction => this.getGridByDirectionFromOrientation(direction, orientation));
    }

    public getGridsByRelativeCoordinatesFromOrientation(coordinates: [number, number][], orientation: GridOrientation = this.board.orientation) {
        return coordinates.map(([dx, dy]) => this.getGridByRelativeCoordinateFromOrientation(dx, dy, orientation));
    }

    public movePieceToGrid(grid: Grid<GridPiece, GridState> | null) {
        if (grid === null) {
            return false;
        }

        grid.piece = this.piece;
        this.piece = null;

        return true;
    }

    public movePieceToGridByDirection(direction: GridDirection) {
        let grid = this.getGridByDirection(direction);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByRelativeCoordinate(dx: number, dy: number) {
        let grid = this.getGridByRelativeCoordinate(dx, dy);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByDirectionFromOrientation(direction: GridDirection, orientation: GridOrientation = this.board.orientation) {
        let grid = this.getGridByDirectionFromOrientation(direction, orientation);

        return this.movePieceToGrid(grid);
    }

    public movePieceToGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: GridOrientation = this.board.orientation) {
        let grid = this.getGridByRelativeCoordinateFromOrientation(dx, dy, orientation);

        return this.movePieceToGrid(grid);
    }
}

export default Grid;
