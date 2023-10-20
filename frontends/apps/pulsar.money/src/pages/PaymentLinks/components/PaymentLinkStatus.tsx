import { SearchOnChain } from "@/components/Text/CopyToClipboard";
import { P } from "@/components/Typography";
import { PaymentLink, PaymentLinkStatus, PaymentLinkType } from "@/types/paymentLinks";
import { CircularProgress } from "@mui/material";
import { CheckCircledIcon, ClockIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  paymentLink: PaymentLink;
}

const Pending = () => {
  return (
    <div className="flex gap-2 items-center">
      <CircularProgress classes={{ circle: "text-yellow-300" }} size={15} />
      <P className="text-gray-200 opacity-80">Generating Payment Link</P>
    </div>
  );
};

const Paid = ({ txHash, type }: { txHash: string; type: PaymentLinkType }) => {
  const text = type === PaymentLinkType.REQUEST ? "Payment Link Paid" : "Payment Link Claimed";
  return (
    <div className="flex gap-2 items-center">
      <CheckCircledIcon className="text-green-500" />
      <P className="text-gray-200 opacity-80">{text}</P>
      <SearchOnChain txHash={txHash} />
    </div>
  );
};

const Expired = () => {
  return (
    <div className="flex gap-2 items-center">
      <CrossCircledIcon className="text-red-500" />
      <P className="text-gray-200 opacity-80">Payment Link Expired</P>
    </div>
  );
};

const Failed = ({ txHash }: { txHash: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <CrossCircledIcon className="text-red-500" />
      <P className="text-gray-200 opacity-80">Payment Link creation failed</P>
      <SearchOnChain txHash={txHash} />
    </div>
  );
};

const PendingPayment = ({ type }: { type: PaymentLinkType }) => {
  const text = type === PaymentLinkType.REQUEST ? "Pending  Payment" : "Pending Claim";
  return (
    <div className="flex gap-2 items-center">
      <ClockIcon className="text-yellow-300" />
      <P className="text-gray-200 opacity-80">{text}</P>
    </div>
  );
};

const Cancelled = ({ txHash }: { txHash: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <CrossCircledIcon className="text-yellow-300" />
      <P className="text-gray-200 opacity-80">Payment Link Cancelled</P>
      <SearchOnChain txHash={txHash} />
    </div>
  );
};

export const DisplayPaymentLinkStatus = ({ paymentLink }: Props) => {
  return (
    <div className="rounded-md p-4" style={{ background: "rgba(62, 65, 71, 0.10)" }}>
      {paymentLink.paymentStatus === PaymentLinkStatus.NOT_CREATED && <Pending />}
      {paymentLink.paymentStatus === PaymentLinkStatus.CLAIMED_OR_PAID && <Paid txHash={paymentLink.claimTxHash} type={paymentLink.type} />}
      {paymentLink.paymentStatus === PaymentLinkStatus.EXPIRED && <Expired />}
      {paymentLink.paymentStatus === PaymentLinkStatus.FAILED && <Failed txHash={paymentLink.createTxHash} />}
      {paymentLink.paymentStatus === PaymentLinkStatus.NOT_PAID_OR_CLAIMED && <PendingPayment type={paymentLink.type} />}
      {paymentLink.paymentStatus === PaymentLinkStatus.WITHDRAWN && <Cancelled txHash={paymentLink.withdrawTxHash} />}
      <span className="text-gray-200 opacity-80 text-xs mt-2">Created at: {new Date(paymentLink.createdAt).toLocaleString()}</span>
    </div>
  );
};
