import Grid from "./Grid";
import GridOrientation from "./GridOrientation";

class GridBoard<GridBody> {
    public readonly width: number;
    public readonly height: number;
    public readonly length: number;
    public readonly grids: Grid<GridBody>[];
    public orientation: GridOrientation = GridOrientation.FBLR;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.length = width * height;
        this.grids = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid<GridBody>(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    public getGridByAbsoluteCoordinate(x: number, y: number): Grid<GridBody> | null {
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

    public getGridByAbsoluteCoordinateFromOrientation(x: number, y: number, orientation: GridOrientation | number = this.orientation): Grid<GridBody> | null {
        let swapXAxisToYAxis = (orientation & 0b100) >> 2;
        let xOrderByDescending = (orientation & 0b010) >> 1;
        let yOrderByDescending = (orientation & 0b001);

        if (swapXAxisToYAxis) {
            [y, x] = [x, y];
        }

        if (xOrderByDescending) {
            x = this.width - 1 - x;
        }

        if (yOrderByDescending) {
            y = this.height - 1 - y;
        }

        return this.getGridByAbsoluteCoordinate(x, y);
    }
}

export default GridBoard;
