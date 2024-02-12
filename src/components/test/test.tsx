import { component$ } from '@builder.io/qwik';

export interface TestProps {

}

export const Test = component$<TestProps>((props) => {
  return (
    <div>
      Test component works!
    </div>
  );
});
