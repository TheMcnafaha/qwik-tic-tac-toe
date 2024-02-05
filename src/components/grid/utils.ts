import { Grid1DArr, Grid2dArr } from "./grid";

type Point = {
  x: number;
  y: number;
};
export function testlol() {
  return "working";
}

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
export function find3() {
  const arr: string[] = [];
  return arr.length;
}
export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];
  for (let index = 0; index < maze.length; index++) {
    seen.push(new Array(maze[0].length).fill(false));
  }
  walk(maze, wall, start, end, seen, path);
  return path;
}
function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
): boolean {
  const offXAxis = curr.x < 0 || curr.x >= maze[0].length;
  const offYAxis = curr.y < 0 || curr.y >= maze.length;

  if (offXAxis || offYAxis) {
    return false;
  }

  if (maze[curr.y][curr.x] === wall) {
    return false;
  }
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }
  if (seen[curr.y][curr.x]) {
    return false;
  }
  seen[curr.y][curr.x] = true;
  path.push(curr);
  for (let index = 0; index < dir.length; index++) {
    const [x, y] = dir[index];
    const newPoint = { x: curr.x + x, y: curr.y + y };
    if (walk(maze, wall, newPoint, end, seen, path)) {
      return true;
    }
  }
  path.pop();
  return false;
}

export function mazefier(grid: Grid2dArr, strg: "X" | "O") {
  const maze = [];
  let output = "";
  for (let index = 0; index < grid.length; index++) {
    console.log(output);
    const row = grid[index];
    if (index === 0) {
      output = padder(row);
      maze.push(output);
    }
  }

  console.log(maze);
}
function rowfier(row: Grid1DArr, strg: "X" | "O", cIndex: number) {}

function padder(row: Grid1DArr) {
  let output = "";
  for (let index = 0; index < row.length; index++) {
    output += "#";
  }
  return addEnds(output);
}

function addEnds(strg: string) {
  return "#".concat(strg, "#");
}
