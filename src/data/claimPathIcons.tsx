import {
  TbOutlineIdBadge2,
  TbOutlineCake,
  TbOutlineFlag,
  TbOutlineGenderBigender,
  TbOutlinePasswordUser,
  TbOutlineCurrentLocation,
  TbOutlineCalendarPlus,
  TbOutlineUserScan,
  TbOutlineId,
  TbOutlineUserPin,
  TbOutlineFirstAidKit,
  TbOutlinePigMoney,
  TbOutlineCreditCardPay,
  TbOutlineSchool,
  TbOutlineCertificate,
  TbOutlineBriefcase,
  TbOutlineTax,
  TbOutlineCar,
  TbOutlineBuildingFactory2,
  TbOutlineUsersGroup,
} from "solid-icons/tb";
import { JSX } from "solid-js";

const iconByPrefix: Record<string, () => JSX.Element> = {
  "eu.europa.ec.eudi.pid.date_of_birth": () => <TbOutlineCake />,
  "eu.europa.ec.eudi.pid.place_of_birth": () => <TbOutlineCake />,
  "eu.europa.ec.eudi.pid.nationality": () => <TbOutlineFlag />,
  "eu.europa.ec.eudi.pid.sex": () => <TbOutlineGenderBigender />,
  "eu.europa.ec.eudi.pid.personal_administrative_number": () => (
    <TbOutlinePasswordUser />
  ),
  "eu.europa.ec.eudi.pid.current_address": () => <TbOutlineCurrentLocation />,
  "eu.europa.ec.eudi.pid.age_over_": () => <TbOutlineCalendarPlus />,
  "eu.europa.ec.eudi.pid.portrait": () => <TbOutlineUserScan />,
  "eu.europa.ec.eudi.pid": () => <TbOutlineIdBadge2 />,
  "org.iso.18013.5.1.mdl": () => <TbOutlineId />,
  "eu.europa.ec.eudi.residencePermit": () => <TbOutlineUserPin />,
  "eu.europa.ec.eudi.healthInsurance": () => <TbOutlineFirstAidKit />,
  "eu.europa.ec.eudi.bankAccount": () => <TbOutlinePigMoney />,
  "eu.europa.ec.eudi.payment": () => <TbOutlineCreditCardPay />,
  "eu.europa.ec.eudi.diploma": () => <TbOutlineSchool />,
  "eu.europa.ec.eudi.professionalQualification": () => <TbOutlineCertificate />,
  "eu.europa.ec.eudi.employeeId": () => <TbOutlineBriefcase />,
  "eu.europa.ec.eudi.taxIdentification": () => <TbOutlineTax />,
  "eu.europa.ec.eudi.vehicleRegistration": () => <TbOutlineCar />,
  "eu.europa.ec.eudi.companyRepresentation": () => (
    <TbOutlineBuildingFactory2 />
  ),
  "eu.europa.ec.eudi.loyalty": () => <TbOutlineUsersGroup />,
};

const sortedPrefixes = Object.keys(iconByPrefix).sort(
  (a, b) => b.length - a.length
);

export function getClaimPathIcon(uri: string): () => JSX.Element {
  const match = sortedPrefixes.find((p) => uri.startsWith(p));
  return match ? iconByPrefix[match] : () => <></>;
}
