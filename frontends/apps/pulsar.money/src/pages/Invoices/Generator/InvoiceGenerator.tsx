import { Box, Card, Grid, Typography } from "@mui/material";
import { CardContainer } from "../../../components/Card/Styled";
import { TitleText } from "../../../components/Text/TitleText";
import CommentsNotes from "./CommentsNotes";
import FromDetails from "./Details/FromDetails";
import GeneratorFooter from "./GeneratorFooter";
import InvoiceTopRightDetails from "./InvoiceTopRightDetails";
import LogoWithCompany from "./LogoWithCompany";
import { DataTableInvoicePositions } from "./PositionsTable";
import ToDetails from "./Details/ToDetails";
import Totals from "./Totals";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ICreateInvoiceForm } from "@/types/invoice";
import "./style.css";
import { createContext, useContext, useEffect, useState } from "react";
import RightSideDetails from "./Recipients/Recipients";
import InvoiceReadonly from "./Readonly/InvoiceReadonly";
import { useUserSettings } from "@/hooks/user-settings/useUserSettings";
import { yupResolver } from "@hookform/resolvers/yup";
import createInvoiceFormSchema from "../validations/createInvoiceFormSchema";
import { useInvoiceMutation } from "@/hooks/invoice/useInvoiceMutation";

export const ReadOnlyContext = createContext<boolean>(true);

const initialInvoiceFormData: ICreateInvoiceForm = {
  sendReceipt: false,
  recipients: [],
  issuedAt: new Date(),
  dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  invoiceNumber: "",
  paymentDetails: {
    services: [
      {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        tax: 0, // Represented in percentage
        discount: 0, // Represented in percentage
        totalAmount: 0, // After applying tax and discount
      },
    ],
    token: "EGLD",
    discount: 0,
    tax: 0,
    amount: 0,
    subtotal: 0,
  },
  customerDetails: null,
  billingDetails: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    state: "",
    taxId: "",
    phoneNumber: "",
    company: "",
    _id: "",
  },
  image: null,
  comments: "",
  footerText: "",
  emailRecipients: [],
};

export interface IInvoicePosition {
  id: number;
  description: string;
  quantity: number;
  pricePerUnit: number;
  tax: number;
  discount: number;
  totalAmount: number;
}

export enum RecipientsViewType {
  CREATE = "create",
  VIEW = "view",
}

const Header = () => {
  return (
    <div className="flex flex-wrap-reverse justify-between gap-4">
      <LogoWithCompany />
      <InvoiceTopRightDetails />
    </div>
  );
};

const DetailsSection = () => {
  return (
    <div className="flex justify-between gap-4 flex-wrap">
      <div className="max-w-sm w-full">
        <FromDetails />
      </div>
      <div className="max-w-sm w-full">
        <ToDetails />
      </div>
    </div>
  );
};

const InvoiceGenerator = () => {
  const userSettings = useUserSettings();
  const form = useForm<ICreateInvoiceForm>({
    resolver: yupResolver(createInvoiceFormSchema) as any,
    defaultValues: initialInvoiceFormData,
    reValidateMode: "onBlur",
  });
  useEffect(() => {
    if (userSettings.isSuccess) {
      const billing = JSON.parse(JSON.stringify(userSettings.data!.billingInformation));

      form.setValue("billingDetails", billing);
    }
  }, [userSettings.data]);

  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        border: "1px solid #1C1E21",
        background: "linear-gradient(138deg, rgba(51, 45, 45, 0.25) 0%, rgba(37, 34, 34, 0.15) 92.71%)",
      }}
    >
      <CardContainer>
        <FormProvider {...form}>
          <form>
            <TitleText text="Invoice generator" />
            <div className="grid grid-cols-12 mt-4 gap-4 md:gap-10">
              <div className="col-span-full xl:col-span-8">
                <Card>
                  <CardContainer className="flex flex-col gap-12">
                    <Header />
                    <DetailsSection />
                    <DataTableInvoicePositions />
                    <Totals />
                    <CommentsNotes />
                  </CardContainer>
                  <GeneratorFooter />
                </Card>
              </div>
              <div className="col-span-full xl:col-span-4">
                <Card>
                  <CardContainer>
                    <RightSideDetails />
                  </CardContainer>
                </Card>
              </div>
            </div>
          </form>
        </FormProvider>
      </CardContainer>
    </Card>
  );
};

export default InvoiceGenerator;
