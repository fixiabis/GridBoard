# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.  
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@3.0.0/dist/gridboard.js

### Create A Empty Chess Board (use TypeScript)

```typescript
import { GridBoard } from "gridboard";

type ChessColor = "white" | "black";
type ChessType = "king" | "queen" | "knight" | "bishop" | "rook" | "pawn";

interface Chess {
    color: ChessColor;
    type: ChessType;
}

var board = new GridBoard<Chess>(8, 8);
```

### Create A Empty Chess Board (use JavaScript)

#### In Node.js

```javascript
const { GridBoard } = require("gridboard");

var board = new GridBoard(8, 8);
```

#### In Browser (use RequireJS)

```javascript
require(["https://unpkg.com/gridboard@3.0.0/dist/gridboard"], function (gridboard) {
    var GridBoard = gridboard.GridBoard;

    var board = new GridBoard(8, 8);
});
```

#### In Browser

Add this tag in your html file's ```<head>``` tag

```html
<script src="https://unpkg.com/gridboard@3.0.0/dist/gridboard.js"></script>
```

```javascript
var { GridBoard } = window["gridboard"];

var board = new GridBoard(8, 8);
```

### Place Chess On Empty Chess Board

Chess can store in ```grid.piece```

```typescript
var __ = undefined;

var WK = { color: "white", type: "king" };
var WQ = { color: "white", type: "queen" };
var WN = { color: "white", type: "knight" };
var WB = { color: "white", type: "bishop" };
var WR = { color: "white", type: "rook" };
var WP = { color: "white", type: "pawn" };

var BK = { color: "black", type: "king" };
var BQ = { color: "black", type: "queen" };
var BN = { color: "black", type: "knight" };
var BB = { color: "black", type: "bishop" };
var BR = { color: "black", type: "rook" };
var BP = { color: "black", type: "pawn" };

var pieces = [
//   A,  B,  C,  D,  E,  F,  G,  H  x / y
    WR, WN, WB, WQ, WK, WB, WN, WR,  // 1
    WP, WP, WP, WP, WP, WP, WP, WP,  // 2
    __, __, __, __, __, __, __, __,  // 3
    __, __, __, __, __, __, __, __,  // 4
    __, __, __, __, __, __, __, __,  // 5
    __, __, __, __, __, __, __, __,  // 6
    BP, BP, BP, BP, BP, BP, BP, BP,  // 7
    BR, BN, BB, BQ, BK, BB, BN, BR,  // 8
];

board.grids.forEach((grid, i) => grid.piece = pieces[i]);
```

### Define State On Grid

Define state in ```grid.state```, such like grid's color

```typescript
var W = "white";
var B = "black";

var colors = [
//  A, B, C, D, E, F, G, H  x / y
    W, B, W, B, W, B, W, B,  // 1
    B, W, B, W, B, W, B, W,  // 2
    W, B, W, B, W, B, W, B,  // 3
    B, W, B, W, B, W, B, W,  // 4
    W, B, W, B, W, B, W, B,  // 5
    B, W, B, W, B, W, B, W,  // 6
    W, B, W, B, W, B, W, B,  // 7
    B, W, B, W, B, W, B, W,  // 8
];

board.grids.forEach((grid, i) => grid.state = colors[i]);
```

### Get Grid By Absolute Coordinate

```typescript
var gridAtD5 = board.getGridByAbsoluteCoordinate(3, 4);
var gridAtG2 = board.getGridAt([6, 1]); // shortcut, also can pass array
```

### Get Grid By Relative Coordinate

```typescript
var gridAtD4 = gridAtD5.getGridByRelativeCoordinate(0, -1);
var gridAtF3 = gridAtG2.getGridTo([-1, 1]); // shortcut, also can pass array
```

### Use Direction

Refer to [previous section](#get-grid-by-relative-coordinate), relative coordinate also can use direction to express

```typescript
// F = y - 1
// B = y + 1
// L = x - 1
// R = x + 1
// ex. FFL = [-1, -2]
var gridAtD4 = gridAtD5.getGridByRelativeCoordinate(Direction("F"));
var gridAtF3 = gridAtG2.getGridTo(Direction`BL`); // also can use template string
```
