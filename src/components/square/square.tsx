import { component$, useSignal } from "@builder.io/qwik";

export interface SquarePTagProps {
  isXTurn: boolean;
  size: number;
}

export const SquarePTag = component$<SquarePTagProps>(({ size }) => {
  const setSqure = useSignal(" ");
  const className = `width:${size}px; height:${size}px;`;
  console.log(size);

  return <p style={className}>{setSqure.value}</p>;
});
