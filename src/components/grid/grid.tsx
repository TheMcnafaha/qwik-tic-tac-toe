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
type GridContextProps = {
  isXTurnSig: Signal<boolean>;
  grid: Signal<Grid2dArr>;
};
export type Grid1DArr = Signal<SquareValues>[];
export type Grid2dArr = Array<Grid1DArr>;
export interface GridProps {
  rows: number;
  colunms: number;
}
type Board = Grid2dArr[];
export const BoardContext = createContextId<Board>("board.context");
export const GridContext = createContextId<Grid2dArr>("grid.context");
export const XToMove = createContextId<boolean>("isX.context");
export const lastMove = createContextId<Signal<Point>>("lastM.context");
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
  console.log("fav grid ", grid);
  useContextProvider(GridContext, grid);
  useContextProvider(BoardContext, [grid]);
  useContextProvider(lastMove, lastM);
  useTask$(({ track }) => {
    track(() => {
      lastM.value;
    });
    console.log(lastM.value);

    const answer = solve(grid, "X", "O", lastM.value);
    if (answer) {
      console.log("ding ding ding");
    }
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
