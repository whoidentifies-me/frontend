import { Component, Show } from "solid-js";
import AT from "country-flag-icons/string/3x2/AT";
import BE from "country-flag-icons/string/3x2/BE";
import BG from "country-flag-icons/string/3x2/BG";
import HR from "country-flag-icons/string/3x2/HR";
import CY from "country-flag-icons/string/3x2/CY";
import CZ from "country-flag-icons/string/3x2/CZ";
import DK from "country-flag-icons/string/3x2/DK";
import EE from "country-flag-icons/string/3x2/EE";
import FI from "country-flag-icons/string/3x2/FI";
import FR from "country-flag-icons/string/3x2/FR";
import DE from "country-flag-icons/string/3x2/DE";
import GR from "country-flag-icons/string/3x2/GR";
import HU from "country-flag-icons/string/3x2/HU";
import IE from "country-flag-icons/string/3x2/IE";
import IT from "country-flag-icons/string/3x2/IT";
import LV from "country-flag-icons/string/3x2/LV";
import LT from "country-flag-icons/string/3x2/LT";
import LU from "country-flag-icons/string/3x2/LU";
import MT from "country-flag-icons/string/3x2/MT";
import NL from "country-flag-icons/string/3x2/NL";
import PL from "country-flag-icons/string/3x2/PL";
import PT from "country-flag-icons/string/3x2/PT";
import RO from "country-flag-icons/string/3x2/RO";
import SK from "country-flag-icons/string/3x2/SK";
import SI from "country-flag-icons/string/3x2/SI";
import ES from "country-flag-icons/string/3x2/ES";
import SE from "country-flag-icons/string/3x2/SE";

const flags: Record<string, string> = {
  AT,
  BE,
  BG,
  HR,
  CY,
  CZ,
  DK,
  EE,
  FI,
  FR,
  DE,
  GR,
  HU,
  IE,
  IT,
  LV,
  LT,
  LU,
  MT,
  NL,
  PL,
  PT,
  RO,
  SK,
  SI,
  ES,
  SE,
};

interface CountryFlagProps {
  code?: string;
  class?: string;
}

export const CountryFlag: Component<CountryFlagProps> = (props) => {
  const svg = () => (props.code ? flags[props.code] : undefined);

  return (
    <Show when={svg()}>
      <span
        class={`inline-flex w-5 shrink-0 ring-1 ring-black/10 ${props.class || ""}`}
        innerHTML={svg()}
      />
    </Show>
  );
};
