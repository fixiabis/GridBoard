# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.  
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@4.1.2/dist/gridboard.js  
or minified version: https://unpkg.com/gridboard@4.1.2/dist/gridboard.min.js

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

### Create An Empty Chess Board (use JavaScript)

#### In Node.js

```javascript
const { GridBoard } = require("gridboard");

var board = new GridBoard(8, 8);
```

#### In Browser (use RequireJS)

```javascript
require(["https://unpkg.com/gridboard@4.1.2/dist/gridboard"], function (gridboard) {
    var GridBoard = gridboard.GridBoard;

    var board = new GridBoard(8, 8);
});
```

#### In Browser

Add this tag in your html file's ```<head>``` tag

```html
<script src="https://unpkg.com/gridboard@4.1.2/dist/gridboard.js"></script>
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

Define state in ```grid.state```, such as like grid's color.

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
var gridAtC6 = board.getGridByAbsoluteCoordinate([2, 5]); // passing array is also available
var gridAtF4 = board.getGridAt(5, 3); // shortcut
var gridAtG2 = board.getGridAt([6, 1]);
```

### Get Grid By Relative Coordinate

```typescript
var gridAtD4 = gridAtD5.getGridByRelativeCoordinate(0, -1);
var gridAtE6 = gridAtC6.getGridByRelativeCoordinate([2, 0]); // passing array is also available
var gridAtE3 = gridAtF4.getGridTo(-1, -1); // shortcut
var gridAtF3 = gridAtG2.getGridTo([-1, 1]);
```

### Use Direction

Refer to [previous section](#get-grid-by-relative-coordinate), relative coordinate can be expressed by direction.

```typescript
import { Direction } from "gridboard";
```

```typescript
// F = y - 1
// B = y + 1
// L = x - 1
// R = x + 1
// ex. FFL = [-1, -2]
var gridAtD4 = gridAtD5.getGridByRelativeCoordinate(Direction("F"));
var gridAtF3 = gridAtG2.getGridTo(Direction`BL`); // template string is also available
```

### Use Orientation Coordinate Converter

Change Board's Orientation, defining directions will be easy.

```typescript
import { Orientation, OrientationCoordinateConverter } from "gridboard";

// default look like this:
//   F   |   | 0 | 1 |
// L   R | 0 |   |   |
//   B   | 1 |   |   |
var asBlackSide = new OrientationCoordinateConverter(board, Orientation.FBLR);

// can be look like this:
//   B   |   | 1 | 0 |
// R   L | 1 |   |   |
//   F   | 0 |   |   |
var asWhiteSide = new OrientationCoordinateConverter(board, Orientation.BFRL);

// the result will look like this:
//   A,  B,  C,  D,  E,  F,  G,  H  x / y
//  WR, WN, WB, WQ, WK, WB, WN, WR,  // 1
//  WP, WP, WP, WP, WP, WP, WP, WP,  // 2
//  __, __, __, __, __, __, __, __,  // 3
//  __, __, __, __, __, __, __, __,  // 4
//  __, __, __, __, __, __, __, __,  // 5
//  BP, __, __, __, __, __, __, __,  // 6
//  __, BP, BP, BP, BP, BP, BP, BP,  // 7
//  BR, BN, BB, BQ, BK, BB, BN, BR,  // 8
var gridAtA7 = board.getGridAt(0, 6, asBlackSide);
var gridAtA6 = gridAtA7.getGridTo(Direction`F`, asBlackSide);
gridAtA6.piece = gridAtA7.piece;
gridAtA7.piece = __;

// the result will look like this(rotated):
//   H,  G,  F,  E,  D,  C,  B,  A  x / y
//  BR, BN, BB, BK, BQ, BB, BN, BR,  // 8
//  BP, BP, BP, BP, BP, BP, BP, __,  // 7
//  __, __, __, __, __, __, __, BP,  // 6
//  __, __, __, __, __, __, __, __,  // 5
//  __, __, __, __, __, __, __, __,  // 4
//  WP, __, __, __, __, __, __, __,  // 3
//  __, WP, WP, WP, WP, WP, WP, WP,  // 2
//  WR, WN, WB, WK, WQ, WB, WN, WR,  // 1
var gridAtH2 = board.getGridAt(0, 6, asWhiteSide);
var gridAtH3 = gridAtH2.getGridTo(Direction("F"), asWhiteSide);
gridAtH3.piece = gridAtH2.piece;
gridAtH2.piece = __;

// result:
//   A,  B,  C,  D,  E,  F,  G,  H  x / y
//  WR, WN, WB, WQ, WK, WB, WN, WR,  // 1
//  WP, WP, WP, WP, WP, WP, WP, __,  // 2
//  __, __, __, __, __, __, __, WP,  // 3
//  __, __, __, __, __, __, __, __,  // 4
//  __, __, __, __, __, __, __, __,  // 5
//  BP, __, __, __, __, __, __, __,  // 6
//  __, BP, BP, BP, BP, BP, BP, BP,  // 7
//  BR, BN, BB, BQ, BK, BB, BN, BR,  // 8
```

### Customize Coordinate Convertion

#### Use Coordinate Converter

Converter only needs 2 methods: convertAbsoluteCoordinate, convertRelativeCoordinate

```typescript
var board = new GridBoard(3, 3);

var asCyclic = {
    convertAbsoluteCoordinate(x, y) {
        x = (x % board.width + board.width) % board.width;
        y = (y % board.height + board.height) % board.height;
        return [x, y];
    },
    convertRelativeCoordinate(dx, dy) {
        return [dx, dy]; // no need to change
    }
};

var grid = board.getGridAt(-1, -1, asCyclic);
grid.x === 2; // true
grid.y === 2; // true
```

### Use Coordinate Convert Function

Refer to [previous section](#use-coordinate-converter), coordinate convert function is also available

```typescript
var board = new GridBoard(3, 3);

function asCyclic(x, y) {
    x = (x % board.width + board.width) % board.width;
    y = (y % board.height + board.height) % board.height;
    return [x, y];
}

var grid = board.getGridAt(-1, -1, asCyclic);
grid.x === 2; // true
grid.y === 2; // true
```
