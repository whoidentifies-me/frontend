import { Component, For, Show } from "solid-js";
import { useTranslate } from "~/i18n/dict";
import { TbFillCircleCheck } from "solid-icons/tb";

interface StatusTimelineProps {
  class?: string;
}

const TimelineBox: Component<{
  class?: string;
  isOdd: boolean;
  label: string;
}> = (props) => {
  return (
    <div
      class={`text-wrap lg:text-center ${props.isOdd ? "text-end timeline-start" : "timeline-end"} ${props.class || ""}`}
    >
      {props.label}
    </div>
  );
};

const TimelineDate: Component<{
  class?: string;
  isOdd: boolean;
  date: string;
}> = (props) => {
  return (
    <div
      class={`${props.class || ""} ${props.isOdd ? "timeline-end" : "timeline-start"}`}
    >
      <strong>{props.date}</strong>
    </div>
  );
};

export const StatusTimeline: Component<StatusTimelineProps> = (props) => {
  const t = useTranslate();
  const milestones = () => t.home.status.timeline?.() || [];

  const isFirst = (i: number): boolean => i === 0;
  const isLast = (i: number): boolean => i === milestones().length - 1;
  const isOdd = (i: number): boolean => i % 2 !== 0;

  const statusClass = (completed: boolean) =>
    completed ? "bg-primary" : "bg-base-300";

  return (
    <ul
      class={`timeline timeline-vertical lg:timeline-horizontal w-full ${props.class ?? ""}`}
    >
      <For each={milestones()}>
        {(milestone, i) => (
          <li class="lg:flex-1 lg:min-w-0">
            <Show when={!isFirst(i())}>
              <hr class={statusClass(milestone.completed)} />
            </Show>

            <Show
              when={isOdd(i())}
              fallback={
                <TimelineDate date={milestone.date} isOdd={isOdd(i())} />
              }
            >
              <TimelineBox label={milestone.label} isOdd={isOdd(i())} />
            </Show>

            <div
              class={`timeline-middle text-2xl leading-0 ${milestone.completed ? "text-primary" : "text-base-300"}`}
            >
              <TbFillCircleCheck class="" />
            </div>

            <Show
              when={!isOdd(i())}
              fallback={
                <TimelineDate date={milestone.date} isOdd={isOdd(i())} />
              }
            >
              <TimelineBox label={milestone.label} isOdd={isOdd(i())} />
            </Show>

            <Show when={!isLast(i())}>
              <hr class={statusClass(milestone.completed)} />
            </Show>
          </li>
        )}
      </For>
    </ul>
  );
};
