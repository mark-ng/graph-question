const alphNum = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
};

const edges = [
  [0, 1],
  [0, 7],
  [0, 3],
  [1, 3],
  [1, 2],
  [2, 3],
  [2, 5],
  [3, 4],
  [4, 5],
  [4, 7],
  [5, 6],
  [6, 7],
];

function createAdj(nodes, edges) {
  let map = new Map();

  for (let i = 0; i < nodes; i++) {
    map.set(i, []);
  }

  for (let i = 0; i < edges.length; i++) {
    map.get(edges[i][0]).push(edges[i][1]);
    map.get(edges[i][1]).push(edges[i][0]);
  }

  return map;
}

// Create an adjacency map
let adj = createAdj(8, edges);

// 1a. Write a function that returns all the possible paths between A­-H.
function findPaths(
  curNode,
  destinationNode,
  possiblePaths,
  cumulatedPath,
  adj
) {
  if (curNode === destinationNode) {
    possiblePaths.push([...cumulatedPath, curNode]);
    return;
  }
  let neighbors = adj.get(curNode);
  for (let i = 0; i < neighbors.length; i++) {
    let neighborNode = neighbors[i];
    if (!cumulatedPath.includes(neighborNode)) {
      let newCumulatedPath = [...cumulatedPath, curNode];
      findPaths(
        neighborNode,
        destinationNode,
        possiblePaths,
        newCumulatedPath,
        adj
      );
    }
  }
}

let possiblePaths = [];
findPaths(0, 7, possiblePaths, [], adj);
let alphaPossiblePaths = possiblePaths.map((pathArr) =>
  pathArr.map((vertice) => alphNum[vertice])
);
console.log({ "All the possible paths between A­-H": alphaPossiblePaths });

// 1b. Write a function that returns the least number of hops (shortest path) between A­-H.
function findShortestPathLength(
  curNode,
  destinationNode,
  curMinLength,
  cumulatedPath,
  adj
) {
  if (curNode === destinationNode) {
    let curPathLength = cumulatedPath.length + 1;
    if (curPathLength < curMinLength[0]) {
      curMinLength[0] = curPathLength;
    }
    return;
  }
  let neighbors = adj.get(curNode);
  for (let i = 0; i < neighbors.length; i++) {
    let neighborNode = neighbors[i];
    if (!cumulatedPath.includes(neighborNode)) {
      let newCumulatedPath = [...cumulatedPath, curNode];
      findShortestPathLength(
        neighborNode,
        destinationNode,
        curMinLength,
        newCumulatedPath,
        adj
      );
    }
  }
}

let minPathLength = [Number.MAX_SAFE_INTEGER];
findShortestPathLength(0, 7, minPathLength, [], adj);
console.log({
  "The least number of hops (shortest path) between A­-H": minPathLength[0],
});
