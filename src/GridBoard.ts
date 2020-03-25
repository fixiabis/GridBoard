import Grid from "./Grid";
import { Coordinate, CoordinateConverter, CoordinateConvert } from "./interfaces";

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

    public getGridByAbsoluteCoordinate(x: number, y: number, convert?: CoordinateConvert): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(x: number, y: number, converter?: CoordinateConverter): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(coordinate: Coordinate, convert?: CoordinateConvert): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(coordinate: Coordinate, converter?: CoordinateConverter): Grid<GridPiece, GridState> | null;
    public getGridByAbsoluteCoordinate(x: number | Coordinate, y?: number | CoordinateConverter | CoordinateConvert, converter?: CoordinateConverter | CoordinateConvert): Grid<GridPiece, GridState> | null {
        if (typeof y !== "number") {
            converter = y;
            [x, y] = x as Coordinate;
        }

        if (typeof x !== "number") {
            [x, y] = x;
        }

        if (converter) {
            if (typeof converter === "object") {
                [x, y] = converter.convertAbsoluteCoordinate(x, y);
            }
            else {
                [x, y] = converter(x, y);
            }
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
        (coordinate: Coordinate): Grid<GridPiece, GridState> | null;
    };
}

GridBoard.prototype.getGridAt = GridBoard.prototype.getGridByAbsoluteCoordinate;

export default GridBoard;
