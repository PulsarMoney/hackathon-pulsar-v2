import React, { Dispatch, SetStateAction } from "react";
import { DisplayInvoice } from "../DisplayInvoice";
import { Invoice, InvoiceCreationStatus, InvoicePaymentStatus } from "@/types/invoice";
import { H3, P } from "@/components/Typography";
import { useParams } from "react-router-dom";
import { useInvoice } from "@/hooks/invoice/useInvoice";
import { SecondaryCard } from "@/components/Cards/SecondaryCard";
import { CardContainer } from "@/components/Card/Styled";
import { getTokenPath } from "@/lib/utils";
import { Card, CircularProgress } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CheckCircledIcon,
  ChevronDownIcon,
  Cross1Icon,
  CrossCircledIcon,
  DiscordLogoIcon,
  DownloadIcon,
  EyeOpenIcon,
  ReloadIcon,
  Share1Icon,
  Share2Icon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useGetAccountInfo, useTrackTransactionStatus } from "@pulsar.money/sdk-dapp/hooks";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Telegram, WhatsApp } from "@mui/icons-material";
import { PULSAR_MONEY } from "@/config";
import { MailIcon } from "lucide-react";
import { useUserSettings } from "@/hooks/user-settings/useUserSettings";
import { SearchOnChain } from "@/components/Text/CopyToClipboard";
import { useInvoiceMutation } from "@/hooks/invoice/useInvoiceMutation";
import { useComponentsStore } from "@/hooks/useComponentsStore";
import { useTrackInvoicePayment } from "@/hooks/invoice/useTrackInvoicePayment";
import { PaymentStatus } from "./PaymentStatus";

const ShareDialog = ({ open, onClose, invoiceId }: { open: boolean; onClose: Dispatch<SetStateAction<boolean>>; invoiceId: string }) => {
  function shareOnTelegram() {
    const message = "Check out this invoice!";
    const url = `${PULSAR_MONEY}/invoice/${invoiceId}`;
    const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    window.open(telegramURL, "_blank");
  }
  function shareOnWhatsApp() {
    const message = "Check out this invoice!";
    const url = `${PULSAR_MONEY}/invoice/${invoiceId}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`;
    window.open(whatsappURL, "_blank");
  }
  function shareViaEmail() {
    const message = "Check out this invoice!";
    const url = `${PULSAR_MONEY}/invoice/${invoiceId}`;
    const emailURL = `mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent(url)}`;
    window.open(emailURL);
  }
  function shareOnTwitter() {
    const message = "Check out this invoice!";
    const url = `${PULSAR_MONEY}/invoice/${invoiceId}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
    window.open(twitterURL, "_blank");
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your invoice link</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-3">
          <div className="cursor-pointer bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground rounded-md p-2 w-auto transition-all">
            <TwitterLogoIcon onClick={shareOnTwitter} className="w-6 h-6" />
          </div>
          <div className="cursor-pointer bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground rounded-md p-2 w-auto transition-all">
            <Telegram onClick={shareOnTelegram} className="w-6 h-6" />
          </div>
          <div className="cursor-pointer bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground rounded-md p-2 w-auto transition-all">
            <WhatsApp onClick={shareOnWhatsApp} className="w-6 h-6" />
          </div>
          <div className="cursor-pointer bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground rounded-md p-2 w-auto transition-all">
            <MailIcon onClick={shareViaEmail} className="w-6 h-6" />
          </div>
        </div>
        <DialogFooter>{/* <Button type="submit">Save changes</Button> */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DropdownActions = ({ invoice }: { invoice: Invoice }) => {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const userInfo = useUserSettings();

  const downloadInvoice = async () => {
    try {
      const response = await fetch(invoice.pdfUrl);
      if (response.status === 200) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "Invoice.pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url); // Clean up
      } else {
        console.error("Error fetching the PDF:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  const openPdf = () => {
    window.open(invoice.pdfUrl, "_blank");
  };

  const canRejectEmail = () => {
    return userInfo?.data?.billingInformation.email === invoice.billingDetails.email;
  };

  const isRejected = () => invoice.paymentStatus === InvoicePaymentStatus.CANCELLED;

  return (
    <>
      <ShareDialog open={shareDialogOpen} onClose={setShareDialogOpen} invoiceId={invoice.invoiceId} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <span className="mr-1">More</span>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
            <Share1Icon className="mr-2 h-4 w-4" />
            <span>Share Invoice</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadInvoice}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            <span>Download PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openPdf}>
            <EyeOpenIcon className="mr-2 h-4 w-4" />
            <span>Open PDF</span>
          </DropdownMenuItem>
          {canRejectEmail() && !isRejected() && (
            <DropdownMenuItem>
              <Cross1Icon className="mr-2 h-4 w-4" />
              <span>Reject Invoice</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const InvoiceTransactionStatus = ({ invoice }: { invoice: Invoice }) => {
  const shouldLoad = invoice.creationStatus === InvoiceCreationStatus.PENDING || invoice.creationStatus === InvoiceCreationStatus.DRAFT;
  const failed = invoice.creationStatus === InvoiceCreationStatus.FAILED;
  const expired = invoice.creationStatus === InvoiceCreationStatus.EXPIRED;
  const success = invoice.creationStatus === InvoiceCreationStatus.CREATED;

  const Failed = () => {
    return (
      <div className="flex gap-2 items-center">
        <CrossCircledIcon className="text-red-500" />
        <P className="text-slate-200 text-opacity-70">Failed to create invoice on chain</P>
        <SearchOnChain txHash={invoice.paymentDetails.creationTxHash} />
      </div>
    );
  };

  const Success = () => {
    return (
      <div className="flex gap-2 items-center">
        <P className="text-slate-200 text-opacity-70">Invoice created</P>
        <SearchOnChain txHash={invoice.paymentDetails.creationTxHash} />
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className="flex gap-2">
        <CircularProgress classes={{ circle: "text-yellow-300" }} size={15} />
        <P className="text-slate-200 text-opacity-70">Generating Invoice</P>
        {invoice.paymentDetails.creationTxHash && <SearchOnChain txHash={invoice.paymentDetails.creationTxHash} />}
      </div>
    );
  };

  const Expired = () => {
    return (
      <div className="flex gap-2">
        <CrossCircledIcon className="text-red-500" />
        <P className="text-red-500 text-opacity-70">Invoice creation expired</P>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <H3 className="mb-1">Creation Status</H3>
      {shouldLoad && <Loading />}
      {failed && <Failed />}
      {success && <Success />}
      {expired && <Expired />}
    </div>
  );
};

const Pay = ({ invoiceId }: { invoiceId: string }) => {
  const { payInvoiceMutation } = useInvoiceMutation();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  useTrackInvoicePayment(sessionId, invoiceId);

  const handlePay = async (e: any) => {
    e.preventDefault();
    const sessionId = await payInvoiceMutation.mutateAsync(invoiceId);
    setSessionId(sessionId);
  };
  return (
    <Button
      onClick={handlePay}
      disabled={payInvoiceMutation.isLoading}
      className="bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground w-full"
    >
      {payInvoiceMutation.isLoading && <CircularProgress classes={{ circle: "text-white" }} size={15} />}
      {!payInvoiceMutation.isLoading && <span className="mr-2 text-white">Pay Invoice</span>}
    </Button>
  );
};

const Share = () => {
  return (
    <Button className="bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground w-full">
      <Share2Icon className="text-white" />
      <span className="ml-2 text-white">Share Invoice</span>
    </Button>
  );
};

const Connect = () => {
  const { openConnectOptionsDrawer } = useComponentsStore();
  return (
    <Button onClick={openConnectOptionsDrawer} className="bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground w-full">
      <span className="mr-2 text-white">Connect Wallet to pay</span>
    </Button>
  );
};

const DisabledPay = ({ reason }: { reason: string }) => {
  return (
    <Button disabled className="bg-[#459BB5] color-white hover:bg-accent hover:text-accent-foreground w-full">
      <span className="mr-2 text-white">{reason}</span>
    </Button>
  );
};

const ActionSection = ({ invoice }: { invoice: Invoice }) => {
  const { address } = useGetAccountInfo();

  if (!address) {
    return <Connect />;
  }

  if (invoice.paymentStatus === InvoicePaymentStatus.PAID) {
    return <DisabledPay reason="Invoice paid" />;
  }

  if (invoice.paymentStatus === InvoicePaymentStatus.CANCELLED) {
    return <DisabledPay reason="Invoice rejected" />;
  }

  if (invoice.paymentStatus === InvoicePaymentStatus.PENDING) {
    return <DisabledPay reason="Invoice is being paid" />;
  }

  if (invoice.creationStatus === InvoiceCreationStatus.PENDING || invoice.creationStatus === InvoiceCreationStatus.DRAFT) {
    return <DisabledPay reason="Invoice is being created" />;
  }

  return <Pay invoiceId={invoice.invoiceId} />;
};

export const PaymentDetails = ({ invoice }: { invoice: Invoice }) => {
  const { address } = useGetAccountInfo();
  const rec = [...(invoice.recipients ?? []), invoice.customerDetails.email];

  return (
    <SecondaryCard>
      <CardContainer>
        <InvoiceTransactionStatus invoice={invoice} />
        <H3 className="mb-1">Sender</H3>
        <P className="text-slate-200 text-opacity-70">{invoice.billingDetails.email}</P>
        <H3 className="mt-4 mb-1">Recipients</H3>
        {rec.map((recipient) => (
          <P key={recipient} className="text-slate-200 text-opacity-70">
            {recipient}
          </P>
        ))}
        <H3 className="mt-4 mb-1">Total to be paid</H3>
        <div
          className="flex justify-between items-center p-2 border border-[#3E4147] rounded-sm"
          style={{ background: "rgba(62, 65, 71, 0.20)" }}
        >
          <div className="flex gap-1 items-center ">
            <img src={getTokenPath(invoice.paymentDetails.token)} className="w-7 h-7 inline-block bg-black" />
            <P>{invoice.paymentDetails.token}</P>
          </div>
          <P className="bold">
            {invoice.paymentDetails.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })} {invoice.paymentDetails.token}
          </P>
        </div>
        <PaymentStatus invoice={invoice} />
        <div className="flex gap-4 mt-12 flex-wrap">
          <ActionSection invoice={invoice} />
          <DropdownActions invoice={invoice} />
        </div>
      </CardContainer>
    </SecondaryCard>
  );
};

export const PayInvoice = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { invoice } = useInvoice(invoiceId);

  if (invoice.error) {
    return <div>error</div>;
  }
  if (invoice.isLoading) {
    return <div>loading</div>;
  }

  return (
    <Card>
      <CardContainer>
        <div className="grid grid-cols-12 gap-4 md:gap-10">
          <div className="col-span-full lg:col-span-4 lg:order-2">
            <PaymentDetails invoice={invoice.data!} />
          </div>
          <div className="col-span-full lg:col-span-8 ">
            <DisplayInvoice invoice={invoice.data!} />
          </div>
        </div>
      </CardContainer>
    </Card>
  );
};
