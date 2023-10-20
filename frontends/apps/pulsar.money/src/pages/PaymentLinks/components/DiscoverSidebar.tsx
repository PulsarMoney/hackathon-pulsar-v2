import { CardContainer } from "@/components/Card/Styled";
import { P } from "@/components/Typography";
import { Card } from "@mui/material";
import React from "react";
import { PaymentLinksDiscover } from "./PaymentLinksDiscover";

export const DiscoverSidebar = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContainer>
        <div>
          <img src="/assets/logos/logo-white-text.png" className="max-w-sm w-full mx-auto" />
          <P className="text-center text-2xl mt-4" style={{ fontFamily: "Space Grotesk" }}>
            The Smart Payments Hub
          </P>
          <div className="mt-4">
            <PaymentLinksDiscover />
          </div>
        </div>
      </CardContainer>
    </Card>
  );
};
