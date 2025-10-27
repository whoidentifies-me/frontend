import { Component } from "solid-js";
import { IntendedUse } from "~/api";

export const IntendedUseDetails: Component<{ data?: IntendedUse }> = (
  props
) => {
  const getPurpose = () => {
    return (
      props.data?.purposes.find((p) => p.lang === "en")?.content ??
      props.data?.purposes.find(() => true)?.content
    );
  };
  const getID = () =>
    props?.data?.id
      ? `intended_use_${props.data.id.substring(0, 8)}`
      : undefined;
  return (
    <div class="border-solid my-4">
      <strong id={getID()}>{getPurpose()}</strong>
      <pre class="mb-0">{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};
