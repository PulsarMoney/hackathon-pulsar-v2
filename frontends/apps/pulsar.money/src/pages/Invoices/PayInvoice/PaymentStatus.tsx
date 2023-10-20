import { SearchOnChain } from "@/components/Text/CopyToClipboard";
import { H3, P } from "@/components/Typography";
import { Invoice, InvoicePaymentStatus } from "@/types/invoice";
import { CircularProgress } from "@mui/material";
import { CheckCircledIcon, ClockIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const NotPaid = () => {
  return (
    <div className="flex gap-2 items-center">
      <ClockIcon />
      <P className="text-slate-200 text-opacity-70">Awaiting Payment</P>
    </div>
  );
};

const Paid = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="flex gap-2 items-center">
      <CheckCircledIcon className="text-green-500" />
      <P className="text-slate-200 text-opacity-80">Paid</P>
      <SearchOnChain txHash={invoice.paymentDetails.paymentTxHash} />
    </div>
  );
};

const Pending = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="flex gap-2 items-center">
      <CircularProgress classes={{ circle: "text-yellow-300" }} size={15} />
      <P className="text-slate-200 text-opacity-80">Pending</P>
      <SearchOnChain txHash={invoice.paymentDetails.paymentTxHash} />
    </div>
  );
};

const Failed = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="flex gap-2 items-center">
      <CrossCircledIcon className="text-red-500" />
      <P className="text-slate-200 text-opacity-80">Failed</P>
      <SearchOnChain txHash={invoice.paymentDetails.paymentTxHash} />
    </div>
  );
};

export const PaymentStatus = ({ invoice }: { invoice: Invoice }) => {
  return (
    <>
      <H3 className="mt-4">Payment Status</H3>
      {invoice.paymentStatus === InvoicePaymentStatus.NOT_PAID && <NotPaid />}
      {invoice.paymentStatus === InvoicePaymentStatus.PENDING && <Pending invoice={invoice} />}
      {invoice.paymentStatus === InvoicePaymentStatus.PAID && <Paid invoice={invoice} />}
      {invoice.paymentStatus === InvoicePaymentStatus.FAILED && <Failed invoice={invoice} />}
      {}
    </>
  );
};
