import { TokenRow } from "@/components/TwitterWallet/TwitterDashboard/TokenRow";
import { Input } from "@/components/ui/input";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ReadOnlyContext } from "../InvoiceGenerator";
import ReadOnlyComponent from "../ReadOnlyComponent";
import DropdownMenuItems from "@/components/ui/custom/combobox-more-invoice";
import { Bell, Download, Ban, Share, XCircle } from "lucide-react";

const ReceiverView = () => {
  const isReadOnly = useContext(ReadOnlyContext);

  const { register, control } = useFormContext<ICreateInvoiceForm>();
  const { fields } = useFieldArray({
    name: "recipients",
    control,
  });

  const sender = "test@astrariozn.com";
  const tokenId = "egld";
  const amount = 1000;
  const token = {
    identifier: tokenId.toUpperCase(),
    svg: "https://s2.coinmarketcap.com/static/img/coins/64x64/6892.png",
    label: tokenId.toUpperCase(),
    price: 0,
    amount: amount,
  };

  const isReceiver = false;

  const receiverItems = [
    {
      icon: <Share className="mr-2 h-4" />,
      label: "Share link",
      onClick: () => {
        alert("Share link");
      },
    },
    {
      icon: <Download className="mr-2 h-4" />,
      label: "Export PDF",
      onClick: () => {
        alert("Export PDF");
      },
    },
    {
      icon: <Ban className="mr-2 h-4" />,
      label: "Block sender",
      onClick: () => {
        alert("Block sende");
      },
    },
    {
      icon: <XCircle className="mr-2 h-4" />,
      label: "Reject invoice",
      onClick: () => {
        alert("Reject invoice");
      },
    },
  ];

  const senderItems = [
    // {
    //   icon: <Bell className="mr-2 h-4" />,
    //   label: "Send reminder",
    //   onClick: () => {
    //     alert("Send reminder");
    //   },
    // },
    {
      icon: <Download className="mr-2 h-4" />,
      label: "Export PDF",
      onClick: () => {
        alert("Export PDF");
      },
    },
    {
      icon: <Ban className="mr-2 h-4" />,
      label: "Void invoice",
      onClick: () => {
        alert("Void invoice");
      },
    },
  ];

  const items = isReceiver ? receiverItems : senderItems;

  return (
    <Box>
      <ReadOnlyComponent makeReadOnly={isReadOnly}>
        <Box marginBottom={10}>
          <Typography fontSize="1.25rem" fontWeight="bold">
            Sender
          </Typography>
          <Box display="flex">
            <Input className="w-[90%]" type="email" />
          </Box>
        </Box>
        <Box marginBottom={10}>
          <Typography fontSize="1.25rem" fontWeight="bold">
            Recipients
          </Typography>
          <Box display="flex" gap={1} flexDirection="column" marginY={2}>
            {fields.map((recipient, index) => {
              return (
                <Box display="flex" gap={1} key={recipient.id}>
                  <Input className="w-[90%]" type="email" key={recipient.id} {...register(`recipients.${index}.value`)} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box marginBottom={10}>
          <Typography fontSize="1.25rem" fontWeight="bold">
            Total to be paid
          </Typography>
          <Box
            sx={{
              borderRadius: "0.25rem",
              border: "1px solid #3E4147",
              background: "rgba(62, 65, 71, 0.20)",
              padding: "0.25rem",
            }}
          >
            <TokenRow token={token} />
          </Box>
        </Box>
      </ReadOnlyComponent>
      {isReceiver ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <DropdownMenuItems items={items} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  zIndex: 1000,
                  backgroundColor: "var(--color-secondary)",
                  textTransform: "none",
                  borderRadius: "0.5rem",
                  color: "#F4F9FD",
                  fontSize: "14px",
                  fontWeight: "bold",
                  "&.Mui-disabled": {
                    backgroundColor: "#2596be33",
                    color: "#FFFFFF66",
                  },
                }}
              >
                Pay invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <DropdownMenuItems items={items} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  zIndex: 1000,
                  backgroundColor: "var(--color-secondary)",
                  textTransform: "none",
                  borderRadius: "0.5rem",
                  color: "#F4F9FD",
                  fontSize: "14px",
                  fontWeight: "bold",
                  "&.Mui-disabled": {
                    backgroundColor: "#2596be33",
                    color: "#FFFFFF66",
                  },
                }}
              >
                Share link
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ReceiverView;
