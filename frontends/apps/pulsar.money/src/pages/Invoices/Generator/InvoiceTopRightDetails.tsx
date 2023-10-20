import { H2, P } from "@/components/Typography";
import { ControlledDatePicker } from "@/components/ui/custom/controlled-date-picker";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import InputWithLabel from "@/components/ui/custom/input-label";

const InvoiceTopRightDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] w-full max-w-sm gap-2 items-center">
      <H2 className="col-span-full mb-2">INVOICE</H2>
      <P className="md:pr-2">Invoice #</P>
      <ControlledInput placeholder="Invoice #" name="invoiceNumber" inputStyles="w-full max-w-[250px] md:max-w-full" />

      <P className="md:pr-2">Issue date</P>
      <ControlledDatePicker placeholder="Issue Date" name="issuedAt" inputStyles="w-full max-w-[250px] md:max-w-full" />

      <P className="md:pr-2">Due Date</P>
      <ControlledDatePicker placeholder="Due date" name="dueDate" inputStyles="w-full max-w-[250px] md:max-w-full" />
    </div>
  );
};

export default InvoiceTopRightDetails;
