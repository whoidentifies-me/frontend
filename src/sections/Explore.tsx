import { Component } from "solid-js";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";

export const Explore: Component = () => {
  return (
    <section id="explore" class="wim-section">
      <TwoColumnLayout
        class="wim-container"
        largerCol="right"
        leftContent={
          <>
            <h2></h2>
            <p class="mb-0"></p>
          </>
        }
        rightContent={<div></div>}
      ></TwoColumnLayout>
    </section>
  );
};
