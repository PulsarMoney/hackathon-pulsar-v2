import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { relative } from "path";
import { Navigate, useNavigate } from "react-router-dom";
import { routeNames } from "@/routes";
import { SecondaryCard } from "@/components/Cards/SecondaryCard";
import { PaymentLinkType } from "@/types/paymentLinks";

export const PaymentLinksActions = () => {
  const navigate = useNavigate();
  const handleCreatePaymentLink = (e: any, type: PaymentLinkType) => {
    e.preventDefault();
    navigate(routeNames.createPaymentLink, {
      state: {
        type,
      },
    });
  };
  return (
    <div className="relative  mt-6" style={{ maxWidth: "400px" }}>
      <img src="/assets/img/invoices/form1.png" className="absolute bottom-12 right-[-40px] w-[120px] h-[120px] z-[-20]" />
      <img src="/assets/img/invoices/form1.png" className="absolute bottom-4 -rotate-90 left-[40px] w-[100px] h-[100px] z-[-20]" />
      <SecondaryCard
        sx={{
          background: "linear-gradient(344deg, rgba(69, 155, 181, 0.12) -65.57%, rgba(75, 79, 88, 0.06) 84.06%)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          height: "100%",
          overflow: "visible",
          border: "none",
        }}
      >
        <Box p={2}>
          <Typography fontWeight="bold" gutterBottom>
            Create Payment Link
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="space-between" mt="10px" width="100%" gap={1}>
              <Button
                variant="outlined"
                sx={{ display: "flex", p: "10px 20px" }}
                onClick={(e) => handleCreatePaymentLink(e, PaymentLinkType.SEND)}
              >
                <Typography fontWeight="bold">Send Tokens</Typography>
              </Button>
              <Button variant="outlined" sx={{ display: "flex" }} onClick={(e) => handleCreatePaymentLink(e, PaymentLinkType.REQUEST)}>
                <Typography fontWeight="bold">Request Tokens</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </SecondaryCard>
    </div>
  );
};
