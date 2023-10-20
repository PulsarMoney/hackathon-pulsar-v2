import { P } from "@/components/Typography";
import { getCompanyOrName, getLocation } from "@/lib/utils";
import { IPersonalDetails } from "@/types/invoice";

export const PersonalDetails = ({ details }: { details: IPersonalDetails }) => {
  return (
    <div>
      <P>{getCompanyOrName(details)}</P>
      <P>{details.email}</P>
      {getLocation(details) && <P>{getLocation(details)}</P>}
      {details.phoneNumber && <P>{details.phoneNumber}</P>}
      {details.website && <P>{details.website}</P>}
    </div>
  );
};
