function seed() {
  return Array.prototype.slice.call(arguments);
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some((c) => same(c, cell));
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? "\u25A3": "\u25A2";
};

const corners = (state = []) => {
  if (state.length === 0) {
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0]
    }
  }
  const xs = state.map(([x, _]) => x);
  const ys = state.map(([_, y]) => y);
  return {
    topRight: [Math.max(...xs), Math.max(...ys)],
    bottomLeft: [Math.min(...xs), Math.min(...ys)]
  };
};

const printCells = (state) => {
  const { bottomLeft, topRight } = corners(state);
  let accumulator = "";
  for (let y = topRight[1]; y >= bottomLeft[1]; y--) {
    let row = [];
    for (let x = bottomLeft[0]; x <= topRight[0]; x++) {
      row.push(printCell([x,y], state));
    }
    accumulator += row.join(" ") + "\n";
  }
  return accumulator;
};

const getNeighborsOf = ([x, y]) => [
  [x-1, y+1], [x, y+1], [x+1, y+1],
  [x-1, y],             [x+1, y],
  [x-1, y-1], [x, y-1], [x+1, y-1]
];

const getLivingNeighbors = (cell, state) => {
  return getNeighborsOf(cell).filter((n) => contains.bind(state)(n));
};

const willBeAlive = (cell, state) => {
  const livingNeighbors = getLivingNeighbors(cell, state);

  return(
    livingNeighbors.length === 3 ||
    (contains.call(state,cell) && livingNeighbors.length === 2)
  );
};

const calculateNext = (state) => {
  const { bottomLeft, topRight } = corners(state);
  let result = [];
  for (let y = topRight[1] + 1; y <= bottomLeft[1] - 1; y--) {
    for (let x = bottomLeft[0] - 1; x <= topRight[0] + 1; x++) {
      result = result.concat(willBeAlive([x,y], state)? [[x,y]] : []);
    }
    return result;
  }
};

const iterate = (state, iterations) => {
  const states = [state];
  for (let i = 0; i < iterations; i++) {
    states.push(calculateNext(states[states.length - 1]))
  }
  return states;
};

const main = (pattern, iterations) => {
  const results = iterate(startPatterns[pattern], iterations);
  results.forEach(r => console.log(printCells(r)));
};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  const _seed = seed;
export { _seed as seed };
  const _same = same;
export { _same as same };
  const _contains = contains;
export { _contains as contains };
  const _getNeighborsOf = getNeighborsOf;
export { _getNeighborsOf as getNeighborsOf };
  const _getLivingNeighbors = getLivingNeighbors;
export { _getLivingNeighbors as getLivingNeighbors };
  const _willBeAlive = willBeAlive;
export { _willBeAlive as willBeAlive };
  const _corners = corners;
export { _corners as corners };
  const _calculateNext = calculateNext;
export { _calculateNext as calculateNext };
  const _printCell = printCell;
export { _printCell as printCell };
  const _printCells = printCells;
export { _printCells as printCells };
  const _startPatterns = startPatterns;
export { _startPatterns as startPatterns };
  const _iterate = iterate;
export { _iterate as iterate };
  const _main = main;
export { _main as main };