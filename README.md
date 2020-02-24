# GridBoard - A Grid-Based Games Framework For TypeScript/JavaScript

## Getting Started with GridBoard

### Installation

```
npm install --save gridboard
```

Also available UMD package defines a ```window.gridboard``` global variable.
Can be used for &lt;script&gt; by this link: https://unpkg.com/gridboard@1.1.2/dist/gridboard.js

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
require(["https://unpkg.com/gridboard@1.1.1/dist/gridboard"], function (gridboard) {
    var GridBoard = gridboard.GridBoard;

    var board = new GridBoard(8, 8);
});
```

#### In Modern Browser

Add this tag in your html file's ```<head>``` tag

```html
<script src="https://unpkg.com/gridboard@1.1.1/dist/gridboard.js"></script>
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

