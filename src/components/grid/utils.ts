import { SquareValues } from "../square/square";
import { Grid2dArr } from "./context-ids";

export type Point = {
  x: number;
  y: number;
};
type ValueProps = {
  point: Point;
  dir: number;
}[];
export function testlol() {
  return "working";
}
type Strats = "ortho" | "diago";
const dirOrth = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const dirDiago = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];
export function find3() {
  const arr: string[] = [];
  return arr.length;
}
export function solve(
  maze: Grid2dArr,
  key: SquareValues,
  start: Point,
): ValueProps {
  const [seen, path, values] = getWalkArgs(maze);
  const found = walk(
    maze,
    getWalls(key),
    key,
    start,
    seen,
    path,
    values,
    "diago",
  );
  // the second conditon is bc of false neg
  if (!found && values.length !== 3) {
    const [seen, path, values] = getWalkArgs(maze);
    walk(maze, getWalls(key), key, start, seen, path, values, "ortho");
    return values;
  }
  return values;
}

function walk(
  maze: Grid2dArr,
  walls: string[],
  key: SquareValues,
  curr: Point,
  seen: boolean[][],
  path: Point[],
  values: ValueProps,
  strat: Strats,
  idx: number = -1,
): boolean {
  const offXAxis = curr.x < 0 || curr.x >= maze[0].length;
  const offYAxis = curr.y < 0 || curr.y >= maze.length;
  if (offXAxis || offYAxis) {
    return false;
  }

  const entry = maze[curr.y][curr.x];
  if (walls.some((elem) => elem === entry.value)) {
    return false;
  }
  if (values.length === 3) {
    return true;
  }
  if (seen[curr.y][curr.x]) {
    return false;
  }

  const last = values.at(-1);
  if (entry.value === key) {
    const appliedDir = last?.dir ?? -1;
    if (values.length > 0 && idx !== -1 && appliedDir !== -1) {
      if (!isPair(idx, appliedDir)) {
        // this only works because arr is size 3,
        // the dynamic solution is to make the arr equal the last two elems,
        // which for a size 3 arr is always the case with shift
        values.shift();
      }
    }

    const obj = { point: curr, dir: idx };
    values.push(obj);
  }
  path.push(curr);
  seen[curr.y][curr.x] = true;
  const dir = strat === "ortho" ? dirOrth : dirDiago;
  for (let index = 0; index < dir.length; index++) {
    const [x, y] = dir[index];
    const newPoint = { x: curr.x + x, y: curr.y + y };
    if (walk(maze, walls, key, newPoint, seen, path, values, strat, index)) {
      return true;
    }
  }
  path.pop();
  return false;
}

function isPair(idx: number, prevIdx: number) {
  if (idx === 0 || idx === 1) {
    return prevIdx === 0 || prevIdx === 1;
  }
  if (idx === 2 || idx === 3) {
    return prevIdx === 2 || prevIdx === 3;
  }
  if (idx === 4 || idx === 5) {
    return prevIdx === 4 || prevIdx === 5;
  }
}

function getWalkArgs(maze: Grid2dArr): [boolean[][], Point[], ValueProps] {
  const seen: boolean[][] = [];
  const path: Point[] = [];
  const values: ValueProps = [];
  for (let index = 0; index < maze.length; index++) {
    seen.push(new Array(maze[0].length).fill(false));
  }
  return [seen, path, values];
}
function getWalls(player: SquareValues) {
  if (player === "X") {
    return [" ", "O"];
  }
  return [" ", "X"];
}
