# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@1.1.1/dist/gridboard.js

### Create A Chess Board (TypeScript)

```typescript
import { GridBoard } from "gridboard";

type ChessColor = "white" | "black";
type ChessType = "king" | "queen" | "knight" | "bishop" | "rook" | "pawn";

interface Chess {
    color: ChessColor;
    type: ChessType;
}

let board = new GridBoard<Chess>(8, 8);
```

### Place Chess On Board

Chess can store in ```grid.body```

```javascript
// place white pawn on A2
let gridAtA2 = board.getGridByAbsoluteCoordinate(0, 1);

let whitePawn = {
    color: "white",
    type: "pawn"
};

gridAtA2.body = whitePawn;

// place white rook on A1
let gridAtA1 = gridAtA2.getGridByRelativeCoordinate(0, -1);

let whiteRook = {
    color: "white",
    type: "rook"
};

gridAtA1.body = whiteRook;
```

### Get Grid By Use GridDirection

common direction provided

F: forward of grid  
B: backward of grid  
R: rightward of grid  
L: leftward of grid  

Format(HEX): 0xFBLR, 0x5000 means forward 5 units of grid

```javascript
let gridAtE1 = board.getGridByAbsoluteCoordinate(4, 0); // white king placed

// backward of king
gridAtE1.getGridByDirection(GridDirection.B);

let gridAtB1 = board.getGridByAbsoluteCoordinate(1, 0); // white knight placed

// knight possible moves
gridAtB1.getGridByDirection(GridDirection.BRR);
gridAtB1.getGridByDirection(GridDirection.BBR);
gridAtB1.getGridByDirection(GridDirection.BBL);

//     A   B   C   D  
//   +---+---+---+---+
// 1 |   | * |   |   |
// 2 |   |   |   |BRR|
// 3 |BBL|   |BBR|   |
//   +---+---+---+---+
```

### Board Orientation By GridOrientation

common orientation provided

S: board x-axis and y-axis will swap
X: x-axis number is order by descending
Y: y-axis number is order by descending

Format(BIN): 0bSXY, 0b100 means two axis need swap

refer to [Get Grid By Use GridDirection](#get-grid-by-use-griddirection)

```javascript
board.orientation = GridOrientation.FBLR; // default

// FBLR:
//     A   B   C  
//   +---+---+---+
// 1 |   |   |   |
// 2 |   |   |   |
// 3 |   |   |   |
//   +---+---+---+

board.orientation = GridOrientation.BFLR; // chess board coordinate

// BFLR:
//     A   B   C  
//   +---+---+---+
// 3 |   |   |   |
// 2 |   |   |   |
// 1 |   |   |   |
//   +---+---+---+

let gridAtE1 = board.getGridByAbsoluteCoordinate(4, 0); // white king placed

// forward of king
gridAtE1.getGridByDirectionFromOrientation(GridDirection.F);

let gridAtB1 = board.getGridByAbsoluteCoordinate(1, 0); // white knight placed

// knight possible moves
gridAtB1.getGridByDirectionFromOrientation(GridDirection.FRR);
gridAtB1.getGridByDirectionFromOrientation(GridDirection.FFR);
gridAtB1.getGridByDirectionFromOrientation(GridDirection.FFL);

//     A   B   C   D  
//   +---+---+---+---+
// 3 |FFL|   |FFR|   |
// 2 |   |   |   |FRR|
// 1 |   | * |   |   |
//   +---+---+---+---+
```
