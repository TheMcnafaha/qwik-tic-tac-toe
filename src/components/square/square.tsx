import {
  component$,
  $,
  useContext,
  createContextId,
  useSignal,
} from "@builder.io/qwik";
import {
  BoardContext,
  type Grid2dArr,
  GridContext,
  PlayerStrgContext,
  LastMoveContext,
  GameWContext,
} from "../grid/context-ids";
import { Point } from "../grid/utils";

export interface SquarePTagProps {
  isXTurn: boolean;
  size: number;
  pos: Point;
}
export type SquareValues = " " | "X" | "O";
export const SquarePTag = component$<SquarePTagProps>(
  ({ size, isXTurn, pos }) => {
    const grid = useContext(GridContext);
    const board = useContext(BoardContext);
    const lastM = useContext(LastMoveContext);
    const playerSig = useContext(PlayerStrgContext);
    const square = grid[pos.y][pos.x];
    const isW = useContext(GameWContext);
    const ref = useSignal(undefined);
    // dynamic tailwind bad bad
    const className = `width:${size}px; height:${size}px;`;
    console.log(pos);
    const setSquare = $(() => {
      if (square.value !== " " || isW.value) {
        return;
      }
      lastM.value = pos;
      square.value = playerSig.value as SquareValues;
      board.push(grid);
    });
    return (
      <p
        ref={ref}
        style={className}
        class="flex items-center justify-center"
        onPointerDown$={setSquare}
        onKeyDown$={(e) => {
          if (e.key === " ") {
            setSquare();
          }
        }}
        tabIndex={0}
      >
        {square.value}
      </p>
    );
  },
);
