import { Input } from "@/components/ui/input";
import { ICreateInvoiceForm, IPersonalDetails, Service } from "@/types/invoice";
import { Box, Grid, Typography } from "@mui/material";
import { useFormContext, useFieldArray, useForm } from "react-hook-form";
import { DeleteIcon } from "../PositionsTable";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";
import { ReadOnlyContext } from "../InvoiceGenerator";
import Currency from "../Currency";
import GenerationStatus, { IGenerationStep } from "../GenerationStatus";
import { Button } from "@/components/ui/button";
import { useInvoiceMutation } from "@/hooks/invoice/useInvoiceMutation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendTransactionReturnType } from "@pulsar.money/sdk-dapp/types";
import { useTrackTransactionStatus } from "@pulsar.money/sdk-dapp/hooks";
import { useNavigate } from "react-router-dom";
import { useTrackInvoiceTransaction } from "@/hooks/invoice/useTrackInvoiceTransaction";

const Recepients = () => {
  const { register, control } = useFormContext<ICreateInvoiceForm>();
  const { fields, append, remove } = useFieldArray({
    name: "recipients",
    control,
  });

  return (
    <Box>
      <Typography fontSize="1.25rem" fontWeight="bold">
        Your recipient will be:
      </Typography>
      <Box display="flex" gap={1} flexDirection="column" marginY={2}>
        {fields.map((recipient, index) => {
          return (
            <Box display="flex" gap={1} key={recipient.id}>
              <Input className="w-[90%]" type="email" key={recipient.id} {...register(`recipients.${index}.value`)} />
              <Button
                className={cn(
                  "rounded-md border border-input bg-transparent px-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black"
                )}
                style={{
                  width: "2.2rem",
                  height: "2.2rem",
                }}
                onClick={() => {
                  remove(index);
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          );
        })}
      </Box>
      <Button
        className="max-w-[150px]"
        onClick={(e) => {
          e.preventDefault();
          append({ value: "" });
        }}
      >
        + Add cc
      </Button>
    </Box>
  );
};

const RightSideDetails = () => {
  const form = useFormContext<ICreateInvoiceForm>();
  const [trackInvoice, setTrackInvoice] = useState<{ sessionId: string; invoiceId: string } | null>(null);
  const navigate = useNavigate();
  const { createInvoiceMutation } = useInvoiceMutation();
  useTrackInvoiceTransaction(trackInvoice);

  const handleSubmit = async (data: ICreateInvoiceForm) => {
    console.log("Data: ", data);
    const subtotal = data.paymentDetails.services.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const taxes = data.paymentDetails.services.reduce((acc, curr) => acc + (curr.tax / 100) * curr.price * curr.quantity, 0);
    const discounts = data.paymentDetails.services.reduce((acc, curr) => acc + (curr.discount / 100) * curr.price * curr.quantity, 0);
    data.paymentDetails.amount = subtotal + taxes - discounts;
    data.paymentDetails.tax = taxes;
    data.paymentDetails.discount = discounts;
    data.paymentDetails.subtotal = subtotal;
    data.emailRecipients = data.recipients.map((r) => r.value);
    const result = await createInvoiceMutation.mutateAsync(data);
    localStorage.setItem(`invoiceId`, JSON.stringify(result));
    setTrackInvoice(result);
  };

  const validPersonalDetails = (personalDetails?: IPersonalDetails | null) =>
    personalDetails && personalDetails.email && personalDetails.firstName && personalDetails.lastName;
  const validService = (service: Service) => service.description && service.price && service.quantity;

  const steps: IGenerationStep[] = [
    {
      name: "Header",
      descriptions: {
        pending: "Header incomplete",
        success: "Header completed",
      },
      status: form.getValues("invoiceNumber") !== "" ? "success" : "pending",
    },
    {
      name: "Sender",
      descriptions: {
        pending: "Sender incomplete",
        success: "Sender completed",
      },
      status: validPersonalDetails(form.getValues("billingDetails")) ? "success" : "pending",
    },
    {
      name: "Recipient",
      descriptions: {
        pending: "Recipient incomplete",
        success: "Recipient completed",
      },
      status: validPersonalDetails(form.getValues("customerDetails")) ? "success" : "pending",
    },
    {
      name: "Items",
      descriptions: {
        pending: "Items incompleted",
        success: "Items completed",
      },
      status: validService(form.getValues("paymentDetails.services.0")) ? "success" : "pending",
    },
    {
      name: "Notes",
      descriptions: {
        pending: "Optional",
        success: "Notes Completed",
      },
      status: form.getValues("comments") === "" ? "pending" : "success",
    },
    {
      name: "Footer",
      descriptions: {
        pending: "Optional",
        success: "Footer completed",
      },
      status: form.getValues("footerText") === "" ? "pending" : "success",
    },
  ];

  return (
    <>
      <Box>
        <Recepients />
      </Box>
      <Box marginTop={5}>
        <Currency />
      </Box>
      <Box marginTop={5}>
        <GenerationStatus steps={steps} />
      </Box>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={form.handleSubmit(handleSubmit, (err) => console.log(err))}
          className="max-w-xs"
          disabled={createInvoiceMutation.isLoading}
        >
          {createInvoiceMutation.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {createInvoiceMutation.isLoading ? "Sending" : "Send"}
        </Button>
        <Button variant="outline" className="w-full max-w-xs">
          Cancel
        </Button>
      </div>
      <Typography marginTop={5}>*your invoice will be generated on white</Typography>
    </>
  );
};

export default RightSideDetails;
