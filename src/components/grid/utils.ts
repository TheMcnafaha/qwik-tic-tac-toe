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
  maze: Grid2dArr,
  wall: string,
  start: Point,
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];
  for (let index = 0; index < maze.length; index++) {
    seen.push(new Array(maze[0].length).fill(false));
  }
  walk(maze, wall, start, seen, path);
  return path;
}
function walk(
  maze: Grid2dArr,
  wall: string,
  curr: Point,
  seen: boolean[][],
  path: Point[],
): boolean {
  const offXAxis = curr.x < 0 || curr.x >= maze[0].length;
  const offYAxis = curr.y < 0 || curr.y >= maze.length;

  if (offXAxis || offYAxis) {
    return false;
  }

  if (maze[curr.y][curr.x].value === wall) {
    return false;
  }
  if (path.length === 3) {
    console.log("ending");
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
    if (walk(maze, wall, newPoint, seen, path)) {
      return true;
    }
  }
  path.pop();
  return false;
}
