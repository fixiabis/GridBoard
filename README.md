# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.  
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@2.0.0/dist/gridboard.js

### Create A Chess Board (use TypeScript)

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

### Create A Chess Board (use JavaScript)

#### In Node.js

```javascript
const { GridBoard } = require("gridboard");

let board = new GridBoard(8, 8);
```

#### In Browser (use RequireJS)

```javascript
require(["https://unpkg.com/gridboard@2.0.0/dist/gridboard"], function (gridboard) {
    var GridBoard = gridboard.GridBoard;

    var board = new GridBoard(8, 8);
});
```

#### In Modern Browser

Add this tag in your html file's ```<head>``` tag

```html
<script src="https://unpkg.com/gridboard@2.0.0/dist/gridboard.js"></script>
```

```javascript
const { GridBoard } = window["gridboard"];

let board = new GridBoard(8, 8);
```

#### In Browser Of Early Version (Like Internet Explorer, IE)

if your JavaScript version is early than 5th edition, you may add polyfill for ```Array.prototype.map``` by this link's sample:
https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill

```javascript
var GridBoard = window["gridboard"].GridBoard;

var board = new GridBoard(8, 8);
```

### Place Chess On Grid

Chess can store in ```grid.piece```

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(8, 8);
// place white pawn on A2
let gridAtA2 = board.getGridByAbsoluteCoordinate(0, 1);

let whitePawn = {
    color: "white",
    type: "pawn"
};

gridAtA2.piece = whitePawn;
```

### Add State On Grid

```javascript
import { GridBoard } from "gridboard";

let board = new GridBoard(8, 8);

board.grids.forEach((grid, i) => {
    grid.state = {
        color: i % 2 === 0
            ? "white"
            : "black"
    };
});
```

In TypeScript, State can define interface on it. For Example:

```typescript
import { GridBoard } from "gridboard";

type ChessColor = "white" | "black";
type ChessType = "king" | "queen" | "knight" | "bishop" | "rook" | "pawn";

interface Chess {
    color: ChessColor;
    type: ChessType;
}

type GridColor = "white" | "black";

interface GridStyle {
    color: GridColor;
}

let board = new GridBoard<Chess, GridStyle>(8, 8);
```

### Get Grid By Absolute Coordinate

```javascript
import { GridBoard } from "gridboard";

let board = new GridBoard(3, 2);
board.getGridByAbsoluteCoordinate(2, 1);
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   0   |   1   |   2   |
|       |   0   |  0,0  |  1,0  |  2,0  |
|       |   1   |  0,1  |  1,1  |**2,1**|

### Get Grid By Relative Coordinate

```javascript
import { GridBoard } from "gridboard";

let board = new GridBoard(3, 2);
let grid = board.getGridByAbsoluteCoordinate(2, 1);
grid.getGridByRelativeCoordinate(-1, -1);
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   0   |   1   |   2   |
|       |   0   |  0,0  |**1,0**|  2,0  |
|       |   1   |  0,1  |  1,1  |  2,1  |

### Direction

common direction provided: 

|     |     |     |     |     |
|:---:|:---:|:---:|:---:|:---:|
| FFLL|  FFL|   FF|  FFR| FFRR|
|  FLL|   FL|    F|   FR|  FRR|
|   LL|    L|    C|    R|   RR|
|  BLL|   BL|    B|   BR|  BRR|
| BBLL|  BBL|   BB|  BBR| BBRR|

* F: forward units = y - 1
* B: backward units = y + 1
* L: leftward units = x - 1
* R: rightward units = x + 1

Can customize direction by follow this rules: 0xFBLR.  
For example: 0x3000 means forward 3 units.

### Get Grid By Direction

Direction can let code gain more readability.

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
let grid = board.getGridByAbsoluteCoordinate(2, 1);
grid.getGridByDirection(GridDirection.LL);
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   0   |   1   |   2   |
|       |   0   |  0,0  |  1,0  |  2,0  |
|       |   1   |**0,1**|  1,1  |  2,1  |

### Orientation

Orientation didn't affect grid's real position.
all orientation provided:

#### FBLR(default):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 0 | 1 | 2 |
| 0 | FL|  F| FR|
| 1 |  L|  C|  R|
| 2 | BL|  B| BR|

#### BFLR(F -> B, B -> F, y order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 0 | 1 | 2 |
| 2 | BL|  B| BR|
| 1 |  L|  C|  R|
| 0 | FL|  F| FR|

#### FBRL(L -> R, R -> L, x order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 2 | 1 | 0 |
| 0 | FR|  F| FL|
| 1 |  R|  C|  L|
| 2 | BR|  B| BL|

#### BFRL(F -> B, B -> F, L -> R, R -> L, x, y order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 2 | 1 | 0 |
| 2 | BR|  B| BL|
| 1 |  R|  C|  L|
| 0 | FR|  F| FL|

#### LRFB(F -> L, B -> R, L -> F, R -> B, x, y axis swapped):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 0 | 1 | 2 |
| 0 | FL|  L| BL|
| 1 |  F|  C|  B|
| 2 | FR|  R| BR|

#### LRBF(F -> L, B -> R, L -> B, R -> F, x, y axis swapped, y order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 2 | 1 | 0 |
| 0 | BL|  L| FL|
| 1 |  B|  C|  F|
| 2 | BR|  R| FR|

#### RLFB(F -> R, B -> L, L -> F, R -> B, x, y axis swapped, x order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 0 | 1 | 2 |
| 2 | FR|  R| BR|
| 1 |  F|  C|  B|
| 0 | FL|  L| BL|

#### RLBF(F -> R, B -> L, L -> B, R -> F, x, y axis swapped, x, y order by descending):
|   |   |   |   |
|:-:|:-:|:-:|:-:|
|   | 2 | 1 | 0 |
| 2 | BR|  R| FR|
| 1 |  B|  C|  F|
| 0 | BL|  L| FL|

### Get Grid By Absolute Coordinate From Orientation

```javascript
import { GridBoard, GridOrientation } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
board.getGridByAbsoluteCoordinateFromOrientation(2, 1);
board.getGridByAbsoluteCoordinateFromOrientation(0, 0, GridDirection.FBLR); // use orientation only one times
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   2   |   1   |   0   |
|       |   1   |**0,0**|  1,0  |  2,0  |
|       |   0   |  0,1  |  1,1  |  2,1  |

### Get Grid By Relative Coordinate From Orientation

```javascript
import { GridBoard, GridOrientation } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
board.getGridByAbsoluteCoordinateFromOrientation(2, 1);
grid.getGridByRelativeCoordinateFromOrientation(-1, -1);
grid.getGridByRelativeCoordinateFromOrientation(+1, +1, GridDirection.FBLR); // use orientation only one times
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   2   |   1   |   0   |
|       |   1   |  0,0  |  1,0  |  2,0  |
|       |   0   |  0,1  |**1,1**|  2,1  |

### Get Grid By Direction From Orientation

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
let grid = board.getGridByAbsoluteCoordinateFromOrientation(2, 1);
grid.getGridByDirectionFromOrientation(GridDirection.LL);
grid.getGridByDirectionFromOrientation(GridDirection.RR, GridOrientation.FBLR); // use orientation only one times
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   2   |   1   |   0   |
|       |   1   |  0,0  |  1,0  |**2,0**|
|       |   0   |  0,1  |  1,1  |  2,1  |

### Move Piece To Grid

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(8, 8);
let gridAtA2 = board.getGridByAbsoluteCoordinate(0, 1);
let backwardOfGridAtA2 = gridAtA2.getGridByDirection(GridDirection.B);

let whitePawn = {
    color: "white",
    type: "pawn"
};

// place white pawn on A2
gridAtA2.piece = whitePawn;

// move white pawn to A3
gridAtA2.movePieceToGrid(backwardOfGridAtA2);
```

### Get Grids By Range Of Absolute Coordinates

```javascript
import { GridBoard } from "gridboard";

let board = new GridBoard(3, 2);
board.getGridsByRangeOfAbsoluteCoordinates(0, 0, 1, 1);
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   0   |   1   |   2   |
|       |   0   |**0,0**|**1,0**|  2,0  |
|       |   1   |**0,1**|**1,1**|  2,1  |

### Get Grids By Range Of Absolute Coordinates From Orientation

```javascript
import { GridBoard, GridOrientation } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
board.getGridsByRangeOfAbsoluteCoordinatesFromOrientation(1, 0, 2, 1);
board.getGridsByRangeOfAbsoluteCoordinatesFromOrientation(0, 0, 1, 1, GridOrientation.FBLR); // use orientation only one times
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   2   |   1   |   0   |
|       |   1   |**0,0**|**1,0**|  2,0  |
|       |   0   |**0,1**|**1,1**|  2,1  |

### Get Grids By Direction Until Over Boundary

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
let grid = board.getGridByAbsoluteCoordinate(2, 1);
grid.getGridByDirectionUntilOverBoundary(GridDirection.L);
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   0   |   1   |   2   |
|       |   0   |  0,0  |  1,0  |  2,0  |
|       |   1   |**0,1**|**1,1**|  2,1  |


### Get Grids By Direction From Orientation Until Over Boundary

```javascript
import { GridBoard, GridOrientation, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
let grid = board.getGridByAbsoluteCoordinateFromOrientation(2, 1);
grid.getGridByDirectionFromOrientationUntilOverBoundary(GridDirection.L);
grid.getGridByDirectionFromOrientationUntilOverBoundary(GridDirection.R, GridOrientation.FBLR); // use orientation only one times
```

looks like this:

|       |       |       |       |       |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|       |   y   |       |       |       |
|   x   |       |   2   |   1   |   0   |
|       |   1   |  0,0  |**1,0**|**2,0**|
|       |   0   |  0,1  |  1,1  |  2,1  |

### Get Grids By Direction Until Condition Met

```javascript
import { GridBoard, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
let grid = board.getGridByAbsoluteCoordinate(2, 1);

// until met grid has piece
grid.getGridByDirectionUntilConditionMet(GridDirection.L, grid => grid.piece !== null);
```

### Get Grids By Direction From Orientation Until Condition Met

```javascript
import { GridBoard, GridOrientation, GridDirection } from "gridboard";

let board = new GridBoard(3, 2);
board.orientation = GridOrientation.BFRL;
let grid = board.getGridByAbsoluteCoordinateFromOrientation(2, 1);

// until met grid has piece
grid.getGridByDirectionFromOrientationUntilConditionMet(GridDirection.L, grid => grid.piece !== null);
grid.getGridByDirectionFromOrientationUntilConditionMet(GridDirection.R, grid => grid.piece !== null, GridOrientation.FBLR); // use orientation only one times
```
