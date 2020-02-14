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

    public getGridByAbsoluteCoordinate(x: number, y: number) {
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

    public getGridByAbsoluteCoordinateFromOrientation(x: number, y: number, orientation: GridOrientation = this.orientation) {
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

    public getGridsByAbsoluteCoordinates(coordinates: [number, number][]) {
        return coordinates.map(([x, y]) => this.getGridByAbsoluteCoordinate(x, y));
    }

    public getGridsByAbsoluteCoordinatesFromOrientation(coordinates: [number, number][], orientation: GridOrientation = this.orientation) {
        return coordinates.map(([x, y]) => this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
    }

    public getGridsByXAxisCoordinate(x: number) {
        let grids = [];

        for (let y = 0; y < this.height; y++) {
            grids.push(this.getGridByAbsoluteCoordinate(x, y));
        }

        return grids;
    }

    public getGridsByYAxisCoordinate(y: number) {
        let grids = [];

        for (let x = 0; x < this.width; x++) {
            grids.push(this.getGridByAbsoluteCoordinate(x, y));
        }

        return grids;
    }

    public getGridsByXAxisCoordinateFromOrientation(x: number, orientation: GridOrientation = this.orientation) {
        let grids = [];

        for (let y = 0; y < this.height; y++) {
            grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
        }

        return grids;
    }

    public getGridsByYAxisCoordinateFromOrientation(y: number, orientation: GridOrientation = this.orientation) {
        let grids = [];

        for (let x = 0; x < this.width; x++) {
            grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
        }

        return grids;
    }

    public getGridsByXAxisCoordinates(xCoordinates: number[]) {
        let grids = [];

        for (let x of xCoordinates) {
            for (let y = 0; y < this.height; y++) {
                grids.push(this.getGridByAbsoluteCoordinate(x, y));
            }
        }

        return grids;
    }

    public getGridsByYAxisCoordinates(yCoordinates: number[]) {
        let grids = [];

        for (let x = 0; x < this.width; x++) {
            for (let y of yCoordinates) {
                grids.push(this.getGridByAbsoluteCoordinate(x, y));
            }
        }

        return grids;
    }

    public getGridsByXAxisCoordinatesFromOrientation(xCoordinates: number[], orientation: GridOrientation) {
        let grids = [];

        for (let x of xCoordinates) {
            for (let y = 0; y < this.height; y++) {
                grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
            }
        }

        return grids;
    }

    public getGridsByYAxisCoordinatesFromOrientation(yCoordinates: number[], orientation: GridOrientation) {
        let grids = [];

        for (let x = 0; x < this.width; x++) {
            for (let y of yCoordinates) {
                grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
            }
        }

        return grids;
    }

    public getGridsByRangeOfAbsoluteCoordinate(startX: number, startY: number, endX: number, endY: number) {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endX; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endX; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endX; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endX; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }

        return grids;
    }

    public getGridsByRangeOfAbsoluteCoordinateFromOrientation(startX: number, startY: number, endX: number, endY: number, orientation: GridOrientation = this.orientation) {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endX; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endX; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endX; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endX; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }

        return grids;
    }
}

export default GridBoard;
