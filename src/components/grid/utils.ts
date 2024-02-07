import { SquareValues } from "../square/square";
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
  key: SquareValues,
  start: Point,
): Point[] {
  const seen: boolean[][] = [];
  const seenOnce: boolean[][] = [];
  const path: Point[] = [];
  const lol: Point[] = [];
  for (let index = 0; index < maze.length; index++) {
    seen.push(new Array(maze[0].length).fill(false));
    seenOnce.push(new Array(maze[0].length).fill(false));
  }
  walk(maze, wall, key, start, seen, path, lol);
  return lol;
}
function walk(
  maze: Grid2dArr,
  wall: string,
  key: SquareValues,
  curr: Point,
  seen: boolean[][],
  path: Point[],
  values: Point[],
  idx: number = -1,
): boolean {
  const offXAxis = curr.x < 0 || curr.x >= maze[0].length;
  const offYAxis = curr.y < 0 || curr.y >= maze.length;
  if (offXAxis || offYAxis) {
    return false;
  }

  const entry = maze[curr.y][curr.x];
  if (maze[curr.y][curr.x].value === wall) {
    return false;
  }
  if (values.length === 3) {
    return true;
  }
  if (seen[curr.y][curr.x]) {
    return false;
  }

  if (entry.value === key) {
    console.log(idx);
    values.push(curr);
  }
  path.push(curr);
  seen[curr.y][curr.x] = true;
  for (let index = 0; index < dir.length; index++) {
    const [x, y] = dir[index];
    idx = index;
    const newPoint = { x: curr.x + x, y: curr.y + y };
    if (walk(maze, wall, key, newPoint, seen, path, values, idx)) {
      return true;
    }
  }
  path.pop();
  return false;
}
