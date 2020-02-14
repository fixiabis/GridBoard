import Grid from "./Grid";
import GridOrientation from "./GridOrientation";
import { UniversalGridState } from "./types/default";

class GridBoard<GridPiece, GridState extends UniversalGridState = {}> {
    public readonly width: number;
    public readonly height: number;
    public readonly length: number;
    public readonly grids: Grid<GridPiece, GridState>[];
    public orientation: GridOrientation = GridOrientation.FBLR;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.length = width * height;
        this.grids = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid<GridPiece, GridState>(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    public getGridByAbsoluteCoordinate(x: number, y: number): Grid<GridPiece, GridState> | null {
        let isOverBoundary = (
            x < 0 ||
            x >= this.width ||
            y < 0 ||
            y >= this.height
        );

        if (isOverBoundary) {
            return null;
        }

        let i = x * this.height + y;

        return this.grids[i];
    }

    public getGridByAbsoluteCoordinateFromOrientation(x: number, y: number, orientation: GridOrientation | number = this.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        if (isAxisNeedSwap) {
            [y, x] = [x, y];
        }

        if (isXAxisOrderByDescending) {
            x = this.width - 1 - x;
        }

        if (isYAxisOrderByDescending) {
            y = this.height - 1 - y;
        }

        return this.getGridByAbsoluteCoordinate(x, y);
    }
}

export default GridBoard;

let board = new GridBoard<any>(8, 8);
board.grids.forEach(grid => grid.state = { a: 12 });
