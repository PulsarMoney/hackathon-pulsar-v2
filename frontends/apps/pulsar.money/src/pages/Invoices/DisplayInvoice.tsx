import React from "react";
import { Invoice } from "@/types/invoice";
import { H1, H2, H3, P } from "@/components/Typography";
import { SecondaryCard } from "@/components/Cards/SecondaryCard";
import { CardContainer } from "@/components/Card/Styled";
import Logo from "../../../public/assets/img/Logo.png";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonalDetails } from "./Generator/PersonalDetails";

interface IInvoiceProps {
  invoice: Invoice;
}

const Header = ({ invoice }: IInvoiceProps) => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap-reverse gap-4">
        <div className="flex gap-2">
          <img src={invoice.companyLogo} className="max-w-[150px] max-h-[110px]" />
          <H2>{invoice.billingDetails.company}</H2>
        </div>
        <div className="flex flex-col gap-2">
          <H2 className="">INVOICE</H2>
          <P>Invoice #{invoice.invoiceNumber}</P>
          <P>Issue Date: {new Date(invoice.issuedAt).toLocaleDateString()}</P>
          <P>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</P>
        </div>
      </div>
    </>
  );
};

const DetailsSection = ({ invoice }: IInvoiceProps) => {
  return (
    <div className="flex justify-between gap-4 flex-wrap">
      <div>
        <H3>From</H3>
        <PersonalDetails details={invoice.billingDetails} />
      </div>
      <div>
        <H3>To</H3>
        <PersonalDetails details={invoice.customerDetails} />
      </div>
    </div>
  );
};

const CommentsSection = ({ invoice }: IInvoiceProps) => {
  if (invoice.comments) {
    return (
      <div className="mt-8">
        <P className="text-gray-400 opacity-70">Comments/Notes</P>
        <P className="text-xs text-gray-400 opacity-70">{invoice.comments}</P>
      </div>
    );
  }
  return null;
};

const ServicesSection = ({ invoice }: IInvoiceProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.paymentDetails.services.map((inv, i) => (
            <TableRow key={"service-" + i}>
              <TableCell className="font-medium">{inv.description}</TableCell>
              <TableCell>{inv.quantity}</TableCell>
              <TableCell>
                {inv.price} {invoice.paymentDetails.token}
              </TableCell>
              <TableCell>{inv.tax}%</TableCell>
              <TableCell>{inv.discount}%</TableCell>
              <TableCell className="text-right">
                {inv.totalAmount?.toLocaleString("en-US", { maximumFractionDigits: 4 })} {invoice.paymentDetails.token}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ml-auto mt-8 max-w-xs grid grid-cols-2 gap-2">
        <P>Subtotal</P>
        <P className="text-right">
          {invoice.paymentDetails.amount?.toLocaleString("en-US", { maximumFractionDigits: 4 })} {invoice.paymentDetails.token}
        </P>
        <P>Discounts</P>
        <P className="text-right">
          {invoice.paymentDetails.discount?.toLocaleString("en-US", { maximumFractionDigits: 4 }) ?? 0} {invoice.paymentDetails.token}
        </P>
        <P>Tax Rate</P>
        <P className="text-right">
          {invoice.paymentDetails.tax?.toLocaleString("en-US", { maximumFractionDigits: 4 }) ?? 0} {invoice.paymentDetails.token}
        </P>
        <div className="col-span-2 h-[1.5px] w-full border-r-2 bg-slate-300 bg-opacity-10" />
        <P className="font-medium">Total</P>
        <P className="text-right font-medium">
          {invoice.paymentDetails.amount?.toLocaleString("en-US", { maximumFractionDigits: 4 })} {invoice.paymentDetails.token}
        </P>
      </div>
    </div>
  );
};

const Footer = ({ invoice }: IInvoiceProps) => {
  return (
    <div className="flex justify-between items-center mt-32 flex-wrap">
      <P className="text-xs text-[#B6B6B6]">{invoice.footerText}</P>
      <div className="flex items-center">
        <img src={"/assets/img/pulsarmoney.png"} className="w-10" />
        <P className="text-[#B6B6B6]">Powered by Pulsar.Money</P>
      </div>
    </div>
  );
};

export const DisplayInvoice = ({ invoice }: { invoice: Invoice }) => {
  return (
    <>
      <SecondaryCard>
        <CardContainer className="flex flex-col gap-10">
          <Header invoice={invoice} />
          <DetailsSection invoice={invoice} />
          <ServicesSection invoice={invoice} />
          <CommentsSection invoice={invoice} />
          <Footer invoice={invoice} />
        </CardContainer>
      </SecondaryCard>
    </>
  );
};
