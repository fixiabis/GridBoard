import Grid from "./Grid";
import { Vector } from "./Direction";

class GridBoard<GridPiece = any, GridState = never> {
    public readonly width: number;
    public readonly height: number;
    public readonly grids: Grid<GridPiece, GridState>[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid<GridPiece, GridState>(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    public getGridByAbsoluteCoordinate(x: number, y: number): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(coordinate: Vector): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(x: number | Vector, y?: number): Grid<GridPiece, GridState> | null {
        if (y === undefined || typeof x === "object") {
            return this.getGridByAbsoluteCoordinate(...x as [number, number]);
        }

        const isOverBoundary = (
            x < 0 ||
            x >= this.width ||
            y < 0 ||
            y >= this.height
        );

        if (isOverBoundary) {
            return null;
        }

        const i = y * this.width + x;
        return this.grids[i];
    }
}

interface GridBoard<GridPiece, GridState> {
    getGridAt: {
        (x: number, y: number): Grid<GridPiece, GridState> | null;
        (coordinate: Vector): Grid<GridPiece, GridState> | null;
    };
}

GridBoard.prototype.getGridAt = GridBoard.prototype.getGridByAbsoluteCoordinate;

export default GridBoard;
