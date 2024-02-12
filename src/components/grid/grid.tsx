import {
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  PropsOf,
  useTask$,
} from "@builder.io/qwik";
import { SquarePTag, type SquareValues } from "../square/square";
import { type Point, solve } from "./utils";
import {
  BoardContext,
  Grid2dArr,
  GridContext,
  LastMoveContext,
  PlayerStrgContext,
} from "./context-ids";
type GridContextProps = {
  isXTurnSig: Signal<boolean>;
  grid: Signal<Grid2dArr>;
};
export interface GridProps {
  rows: number;
  colunms: number;
}
export type GridRowAndColProps = {
  index: number;
  max: number;
} & PropsOf<"div">;
export const Grid = component$<GridProps>((props) => {
  function getGrid(cols: number, rows: number): Grid2dArr {
    const grid: Grid2dArr = [];
    for (let cIndex = 0; cIndex < cols; cIndex++) {
      let innerCol = [];
      for (let rIndex = 0; rIndex < rows; rIndex++) {
        const favSig = useSignal<SquareValues>(" ");
        innerCol.push(favSig);
      }
      grid.push(innerCol);
      innerCol = [];
    }

    return grid;
  }
  if (props.colunms < 1 || props.rows < 1) {
    throw Error("bad def");
  }
  const jsxGrid = getJSXGrid(props.colunms, props.rows);
  const grid = getGrid(props.colunms, props.rows);
  const lastM = useSignal<Point>({ x: -1, y: -1 });
  const playerSig = useSignal<SquareValues>("O");
  const isGameWon = useSignal(false);
  console.log("fav grid ", grid);
  useContextProvider(GridContext, grid);
  useContextProvider(BoardContext, [grid]);
  useContextProvider(LastMoveContext, lastM);
  useContextProvider(PlayerStrgContext, playerSig);
  useTask$(({ track }) => {
    track(() => {
      lastM.value;
    });
    console.log(lastM.value);
    const nextPlyr = playerSig.value === "X" ? "O" : "X";
    const answer = solve(grid, playerSig.value, lastM.value);
    console.log(
      "curr stuff ",
      answer.map((e) => e.point),
      lastM.value,
    );
    console.table(grid.map((e) => e.map((e) => e.value)));

    if (answer.length === 3) {
      isGameWon.value = true;
      console.log("ding ding ding");
    }
    playerSig.value = nextPlyr;
  });
  return <>{jsxGrid}</>;
});

const GridRow = component$<GridRowAndColProps>((props) => {
  let className = "border-b-2 border-slate-500";
  if (props.index >= props.max - 1) {
    className = "";
  }

  return (
    <>
      <div class={className}>
        <Slot />
      </div>
    </>
  );
});

const GridCol = component$<GridRowAndColProps>((props) => {
  let className = "border-r-2 border-slate-500";

  if (props.index >= props.max - 1) {
    className = "";
  }
  return (
    <div class={className}>
      <Slot />
    </div>
  );
});
function getJSXGrid(cols: number, rows: number) {
  const grid = [];
  for (let cIndex = 0; cIndex < cols; cIndex++) {
    let innerCol = [];
    for (let rIndex = 0; rIndex < rows; rIndex++) {
      innerCol.push(
        <GridRow index={rIndex} max={rows}>
          <SquarePTag
            pos={{ y: cIndex, x: rIndex }}
            size={30}
            isXTurn={false}
          />
        </GridRow>,
      );
    }
    grid.push(
      <GridCol index={cIndex} max={cols}>
        {innerCol}
      </GridCol>,
    );
    innerCol = [];
  }

  return grid;
}
function getWall(currPlayer: "X" | "O") {
  if (currPlayer === "O") {
    return "X";
  }
  return "O";
}
