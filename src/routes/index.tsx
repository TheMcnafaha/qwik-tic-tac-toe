import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Grid } from "~/components/grid/grid";

export default component$(() => {
  return (
    <>
      <main class="flex h-screen items-center justify-center">
        <Grid colunms={5} rows={3} />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
