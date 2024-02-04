import { component$, useSignal, $ } from "@builder.io/qwik";
import { Grid2dArr } from "../grid/grid";

export interface SquarePTagProps {
  isXTurn: boolean;
  size: number;
}
export type SquareValues = " " | "X" | "O";

export const SquarePTag = component$<SquarePTagProps>(({ size, isXTurn }) => {
  const square = useSignal<SquareValues>(" ");
  // dynamic tailwind bad bad
  const className = `width:${size}px; height:${size}px;`;
  console.log(size);
  const setSquare = $(() => {
    if (square.value !== " ") {
      return;
    }
    let strg = "O";
    if (isXTurn) {
      strg = "X";
    }
    square.value = strg as SquareValues;
  });
  return (
    <p
      style={className}
      class="flex items-center justify-center"
      onPointerDown$={setSquare}
    >
      {square.value}
    </p>
  );
});
