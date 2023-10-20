import React from "react";
import GifPicker from "gif-picker-react";
import { Card } from "@mui/material";
import { CardContainer } from "@/components/Card/Styled";
import { TitleText } from "@/components/Text/TitleText";
import { H1, P } from "@/components/Typography";
import { PaymentLinksActions } from "./components/PaymentLinksActions";
import { PaymentLinksDiscover } from "./components/PaymentLinksDiscover";
import { PaymentLinksTable } from "./components/table/PaymentLinksTable";

export const PaymentLinksDashboard = () => {
  return (
    <Card>
      <CardContainer>
        <TitleText text="Payment Links" />
        <div className="my-4 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <H1>Payment Links</H1>
            <P>Making payments as easy as sharing a link, anytime, anywhere.</P>
            <PaymentLinksActions />
          </div>
          <div className="hidden md:block md:col-span-4">
            <div className="h-full flex justify-center items-center">
              <img src="/assets/logos/logo.png" style={{ width: "20rem", objectFit: "contain" }} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <PaymentLinksTable />
          </div>
          <div className="col-span-12 md:col-span-4">
            <PaymentLinksDiscover />
          </div>
        </div>
      </CardContainer>
    </Card>
  );
};
