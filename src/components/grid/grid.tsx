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
  GameWContext,
  Grid2dArr,
  GridContext,
  GridElem,
  GridElemContext,
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
  function getGrids(cols: number, rows: number): [Grid2dArr, GridElem] {
    const grid: Grid2dArr = [];
    const elemGrid: GridElem = [];
    for (let cIndex = 0; cIndex < cols; cIndex++) {
      let innerCol = [];
      let innerElemCol = [];
      for (let rIndex = 0; rIndex < rows; rIndex++) {
        const favSig = useSignal<SquareValues>(" ");
        const mehSig = useSignal<Element | undefined>(undefined);
        innerCol.push(favSig);
        innerElemCol.push(mehSig);
      }
      grid.push(innerCol);
      elemGrid.push(innerElemCol);
      innerCol = [];
      innerElemCol = [];
    }

    return [grid, elemGrid];
  }
  if (props.colunms < 1 || props.rows < 1) {
    throw Error("bad def");
  }
  const jsxGrid = getJSXGrid(props.colunms, props.rows);
  const [grid, elemGrid] = getGrids(props.colunms, props.rows);
  const lastM = useSignal<Point>({ x: -1, y: -1 });
  const playerSig = useSignal<SquareValues>("O");
  const isGameWon = useSignal(false);
  useContextProvider(GridContext, grid);
  useContextProvider(BoardContext, [grid]);
  useContextProvider(LastMoveContext, lastM);
  useContextProvider(PlayerStrgContext, playerSig);
  useContextProvider(GameWContext, isGameWon);
  useContextProvider(GridElemContext, elemGrid);
  useTask$(({ track }) => {
    track(() => {
      lastM.value;
    });
    // bg-yellow-300 text-black
    const nextPlyr = playerSig.value === "X" ? "O" : "X";
    const answer = solve(grid, playerSig.value, lastM.value);
    if (answer.length === 3) {
      answer.forEach((e) => {
        const y = e.point.y;
        const x = e.point.x;
        const sqr = elemGrid[y][x];
        sqr.value?.classList.add("bg-yellow-300", "text-black");
        console.log(sqr.value);
      });
      isGameWon.value = true;
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
