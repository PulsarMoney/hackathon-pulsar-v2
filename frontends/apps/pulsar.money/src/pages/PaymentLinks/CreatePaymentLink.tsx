import { CardContainer } from "@/components/Card/Styled";
import { H1, H3, P } from "@/components/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { PaymentLinksRequest } from "./components/PaymentLinksRequest";
import { PaymentLinksSend } from "./components/PaymentLinksSend";
import { PaymentLinkType } from "@/types/paymentLinks";
import { DiscoverSidebar } from "./components/DiscoverSidebar";

export const CreatePaymentLink = () => {
  const { state } = useLocation();
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-8">
        <Card sx={{ height: "100%" }}>
          <CardContainer>
            <div className="flex flex-col justify-center items-center">
              <H1 className="text-center">Create Payment Link</H1>
              <P className="text-center">Making payments as easy as sharing a link, anytime, anywhere.</P>
              <Tabs defaultValue={state?.type ?? PaymentLinkType.REQUEST} className="mt-4 w-[300px] md:w-[400px] ">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value={PaymentLinkType.REQUEST}>Request Payment</TabsTrigger>
                  <TabsTrigger value={PaymentLinkType.SEND}>Send Payment</TabsTrigger>
                </TabsList>
                <TabsContent value={PaymentLinkType.REQUEST}>
                  <PaymentLinksRequest />
                </TabsContent>
                <TabsContent value={PaymentLinkType.SEND}>
                  <PaymentLinksSend />
                </TabsContent>
              </Tabs>
            </div>
          </CardContainer>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-4">
        <DiscoverSidebar />
      </div>
    </div>
  );
};
