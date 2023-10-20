import { Box, Button, Card, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { CardContainer } from "../../components/Card/Styled";
import { TitleText } from "../../components/Text/TitleText";
import { SecondaryCard } from "../../components/Cards/SecondaryCard";
import { InvoiceStatsCard } from "../../components/Invoice/InflowStatsCard";
import { useInvoieStats as useInvoiceStats, useInvoieStats } from "../../hooks/invoice/useInvoiceStats";
import { ActionCard } from "../../components/Invoice/ActionCard";
import { InvoicesTable } from "@/components/Invoice/InvoiceGrid/InvoicesTable";
import { RecentActivity } from "@/components/Invoice/RecentActivity";
import { Overview } from "@/components/Invoice/Overview";
import { useInvoices } from "@/hooks/invoice/useInvoices";
import { useUserSettingsMutation } from "@/hooks/user-settings/useUserSettingsMutation";

export const InvoiceDashboard = () => {
  const invoiceStats = useInvoieStats();
  const invoices = useInvoices();
  const { deleteUserSettings } = useUserSettingsMutation();

  return (
    <Card>
      <CardContainer>
        <TitleText text="Invoices" />
        <Box mt="20px">
          <Typography
            sx={{
              fontSize: "48px",
              lineHeight: "60px",
              fontWeight: "700",
            }}
          >
            Invoicing Portal
            <span className="text-sm" onClick={() => deleteUserSettings.mutate()}>
              {" "}
              - Delete Account
            </span>
          </Typography>
          <Typography>Streamlined invoicing: View live invoices, track payments, and create new invoices with just a few clicks</Typography>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-full  md:col-span-6 lg:col-span-4">
              <InvoiceStatsCard
                isLoading={invoiceStats.isLoading}
                monthlyUsd={invoiceStats.data?.monthly.outflow}
                monthlyToReceive={invoiceStats.data?.monthly.pendingOutflow}
                yearlyToReceive={invoiceStats.data?.yearly.pendingOutflow}
                yearlyUsd={invoiceStats.data?.yearly.outflow}
                cardType="outflow"
              />
            </div>
            <div className="col-span-full  md:col-span-6 lg:col-span-4">
              <InvoiceStatsCard
                isLoading={invoiceStats.isLoading}
                monthlyUsd={invoiceStats.data?.monthly.inflow}
                monthlyToReceive={invoiceStats.data?.monthly.pendingInflow}
                yearlyToReceive={invoiceStats.data?.yearly.inflow}
                yearlyUsd={invoiceStats.data?.yearly.pendingInflow}
                cardType="inflow"
              />
            </div>
            <div className="col-span-full  md:col-span-6 lg:col-span-4">
              <ActionCard />
            </div>
            <div className="col-span-full lg:col-span-6">
              <Overview inflowData={invoiceStats.data?.monthlyInflow ?? []} outflowData={invoiceStats.data?.monthlyOutflow ?? []} />
            </div>
            <div className="col-span-full  md:col-span-6  md:row-start-1 md:row-end-4 md:col-start-7 lg:col-span-6 lg:row-span-1">
              <RecentActivity recentInflows={invoiceStats.data?.recentInflows ?? []} />
            </div>
            <div className="col-span-full">
              <SecondaryCard>
                <InvoicesTable data={invoices.data ?? []} loading={invoices.isLoading} error={invoices.error} />
              </SecondaryCard>
            </div>
          </div>
        </Box>
      </CardContainer>
    </Card>
  );
};
