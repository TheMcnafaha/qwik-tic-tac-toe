import { SquareValues } from "../square/square";
import { type Grid2dArr } from "./grid";

type Point = {
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
export default function solve(
  maze: Grid2dArr,
  wall: string,
  key: SquareValues,
  start: Point,
): ValueProps {
  const [seen, path, values] = getWalkArgs(maze);
  const found = walk(maze, wall, key, start, seen, path, values, "diago");
  // const found = false;
  console.log(" i have found ", found, values);

  // the second conditon is bc of false neg
  if (!found && values.length !== 3) {
    const [seen, path, values] = getWalkArgs(maze);
    walk(maze, wall, key, start, seen, path, values, "ortho");
    return values;
  }
  return values;
}

function walk(
  maze: Grid2dArr,
  wall: string,
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
  if (maze[curr.y][curr.x].value === wall) {
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
    console.log("idx ", idx);
    const appliedDir = last?.dir ?? -1;
    if (values.length > 0 && idx !== -1 && appliedDir !== -1) {
      if (!isPair(idx, appliedDir)) {
        console.log("new boi ", appliedDir, idx);
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
    if (walk(maze, wall, key, newPoint, seen, path, values, strat, index)) {
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
