import { CardContainer } from "@/components/Card/Styled";
import { P } from "@/components/Typography";
import { usePaymentLink } from "@/hooks/payment-links/usePaymentLink";
import { PaymentLinkType } from "@/types/paymentLinks";
import { Card, CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { PayPaymentLink } from "./components/ViewPaymentLink/PayPaymentLink";
import { DiscoverSidebar } from "./components/DiscoverSidebar";
import { ClaimPaymentLink } from "./components/ViewPaymentLink/ClaimPaymentLink";

export const ViewPaymentLink = () => {
  const { id } = useParams();
  const paymentLink = usePaymentLink(id);
  if (paymentLink.isLoading) {
    return <CircularProgress />;
  }
  if (paymentLink.isError) {
    return <P className="text-red-500">Payment link not found</P>;
  }
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        {paymentLink.data.type === PaymentLinkType.REQUEST && <PayPaymentLink paymentLink={paymentLink.data} />}
        {paymentLink.data.type === PaymentLinkType.SEND && <ClaimPaymentLink paymentLink={paymentLink.data} />}
      </div>
      <div className="col-span-12 md:col-span-4">
        <DiscoverSidebar />
      </div>
    </div>
  );
};
