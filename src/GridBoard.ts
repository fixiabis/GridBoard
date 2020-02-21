import Grid from "./Grid";
import GridOrientation from "./GridOrientation";
import { GridBoardSnapshot, GridSnapshot } from "./GridSnapshot";

function isObjectAndNotNull(value: any): value is object {
    return typeof value === "object" && value !== null;
}

class GridBoard<GridPiece, GridState = undefined> {
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

    public getGridsByRangeOfAbsoluteCoordinates(startX: number, startY: number, endX: number, endY: number) {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }

        return grids;
    }

    public getGridsByRangeOfAbsoluteCoordinatesFromOrientation(startX: number, startY: number, endX: number, endY: number, orientation: GridOrientation = this.orientation) {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }

        return grids;
    }

    public getSnapshot(): GridBoardSnapshot<GridPiece, GridState> {
        let { width, height, grids } = this;

        let gridSnapshots = grids.map(grid => {
            let { piece, state } = grid;

            if (isObjectAndNotNull(piece)) {
                piece = Object.create(piece);
            }

            if (isObjectAndNotNull(state)) {
                state = Object.create(state);
            }

            if ("state" in grid) {
                return { piece, state };
            }
            else {
                return { piece } as GridSnapshot<GridPiece, GridState>;
            }
        });

        return { width, height, grids: gridSnapshots };
    }

    public setSnapshot(snapshot: GridBoardSnapshot<GridPiece, GridState>) {
        let isSizeNotMatch = (
            snapshot.width !== this.width ||
            snapshot.height !== this.height
        );

        if (isSizeNotMatch) {
            return false;
        }

        for (let i = 0; i < this.grids.length; i++) {
            let grid = this.grids[i];
            let gridSnapshot = snapshot.grids[i];

            if (typeof gridSnapshot.state !== "undefined") {
                if (isObjectAndNotNull(gridSnapshot.state) && isObjectAndNotNull(grid.state)) {
                    if (gridSnapshot.state instanceof Array && grid.state instanceof Array) {
                        for (let i = 0; i < gridSnapshot.state.length; i++) {
                            grid.state[i] = gridSnapshot.state[i];
                        }

                        for (let i = gridSnapshot.state.length - 1; i < grid.state.length; i++) {
                            delete grid.state[i];
                        }
                    }
                    else {
                        for (let field in grid.state) {
                            delete grid.state[field];
                        }

                        for (let field in gridSnapshot.state) {
                            grid.state[field] = gridSnapshot.state[field];
                        }
                    }
                }
                else {
                    grid.state = gridSnapshot.state;
                }
            }
        }

        return true;
    }
}

export default GridBoard;
