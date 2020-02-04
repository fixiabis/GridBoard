const { GridBoard, GridDirection, GridOrientation } = require("./dist/gridboard");

let board = new GridBoard(5, 6);
board.orientation = GridOrientation.RLBF;

let grid;

grid = board.getGridByAbsoluteCoordinateFromOrientation(0, 0);
console.log(grid.x, grid.y);

grid = grid.getGridByRelativeCoordinateFromOrientation(0, 4);
console.log(grid.x, grid.y);
