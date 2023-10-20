import { CardContainer } from "@/components/Card/Styled";
import { SecondaryCard } from "@/components/Cards/SecondaryCard";
import { TokenRow } from "@/components/TwitterWallet/TwitterDashboard/TokenRow";
import { H1, H3, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { PaymentLink } from "@/types/paymentLinks";
import { Card } from "@mui/material";
import React from "react";
import { DisplayPaymentLinkStatus } from "../PaymentLinkStatus";
import { usePaymentLinksMutations } from "@/hooks/payment-links/usePaymentLinksMutations";
import { PaymentLinkUtils } from "@/utils/payment-link.utils";
import { useGetAccountInfo } from "@pulsar.money/sdk-dapp/hooks";
import { useComponentsStore } from "@/hooks/useComponentsStore";

interface Props {
  paymentLink: PaymentLink;
}

export const PayPaymentLink = ({ paymentLink }: Props) => {
  const { payPaymentLink, cancelPaymentLink } = usePaymentLinksMutations();
  const { address } = useGetAccountInfo();
  const openConnectOptionsDrawer = useComponentsStore((s) => s.openConnectOptionsDrawer);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContainer>
        <div className="flex flex-col justify-center ">
          <H1 className="text-center">Pay Payment Link</H1>
          <P className="text-center mt-3">Making payments as easy as sharing a link, anytime, anywhere.</P>
          <div className="max-w-sm mx-auto w-full flex flex-col gap-3 mt-8">
            <div
              className="p-2 rounded-md"
              style={{
                background: "rgba(62, 65, 71, 0.10)",
              }}
            >
              <TokenRow
                token={{
                  identifier: paymentLink.token,
                  svg: "EGLD",
                  label: paymentLink.token.split("-")[0],
                  amount: Number(paymentLink.amount),
                }}
              />
            </div>
            <P className="text-sm">Sent from: {paymentLink.from}</P>
            {(paymentLink.gif || paymentLink.description) && (
              <div className="rounded-md p-4" style={{ background: "rgba(62, 65, 71, 0.10)" }}>
                <P>{paymentLink.description}</P>
                {paymentLink.gif && <img src={paymentLink.gif} className="mt-4 rounded-md object-cover" alt="Selected GIF" />}
              </div>
            )}
            <DisplayPaymentLinkStatus paymentLink={paymentLink} />
            {address && (
              <>
                {PaymentLinkUtils.isOwner(paymentLink.creatorAddress, address) && (
                  <Button
                    variant="outline"
                    disabled={!PaymentLinkUtils.canClaim(paymentLink.paymentStatus) || cancelPaymentLink.isLoading}
                    onClick={() => cancelPaymentLink.mutate(paymentLink.paymentLinkId)}
                  >
                    {cancelPaymentLink.isLoading ? "Canceling..." : "Cancel"}
                  </Button>
                )}
                <Button
                  variant="default"
                  disabled={payPaymentLink.isLoading}
                  onClick={() => payPaymentLink.mutate(paymentLink.paymentLinkId)}
                >
                  {payPaymentLink.isLoading ? "Paying..." : "Pay"}
                </Button>
              </>
            )}
            {!address && (
              <Button variant="default" onClick={() => openConnectOptionsDrawer()}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </CardContainer>
    </Card>
  );
};
