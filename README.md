# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@1.0.5/dist/gridboard.js

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
let gridInA2 = board.getGridByAbsoluteCoordinate(0, 1);

let whitePawn = {
    color: "white",
    type: "pawn"
};

gridInA2.body = whitePawn;

// place white rook on A1
let gridInA1 = gridInA2.getGridByRelativeCoordinate(0, -1);

let whiteRook = {
    color: "white",
    type: "rook"
};

gridInA1.body = whiteRook;
```

###  Get Grid By Use GridDirection

```javascript
let gridInE1 = board.getGridByAbsoluteCoordinate(4, 0); // white king placed

// backwards of king
gridInE1.getGridByDirection(GridDirection.B);

let gridInB1 = board.getGridByAbsoluteCoordinate(1, 0); // white knight placed

// knight next steps
gridInB1.getGridByDirection(GridDirection.BRR);
gridInB1.getGridByDirection(GridDirection.BBR);
gridInB1.getGridByDirection(GridDirection.BBL);
```
