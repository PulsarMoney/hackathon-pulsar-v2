import { H2, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { ControlledCheckbox } from "@/components/ui/custom/controlled-checkbox";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { ControlledTextArea } from "@/components/ui/custom/controlled-text-area";
import { CurrencyCombobox } from "@/components/ui/custom/currency-combobox";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { requestPaymentValidationSchema } from "../validations/requestPaymentValidationSchema";
import GifPicker, { TenorImage, Theme } from "gif-picker-react";
import { Dialog, DialogContent, Modal } from "@mui/material";
import { Cross1Icon } from "@radix-ui/react-icons";
import { GifPickerSelector } from "./GifPickerSelector";
import { CreatePaymentLinkForm, PaymentLinkType } from "@/types/paymentLinks";
import { useOnTransactionSigned } from "@/hooks/useOnTransactionSigned";
import { useInvoiceMutation } from "@/hooks/invoice/useInvoiceMutation";
import { usePaymentLinksMutations } from "@/hooks/payment-links/usePaymentLinksMutations";
import { useNavigate } from "react-router-dom";

const defaultData: CreatePaymentLinkForm = {
  from: "",
  token: "EGLD",
  amount: "",
  description: "",
  terms: false,
  gif: null,
};

export const PaymentLinksRequest = () => {
  const [openGifPicker, setOpenGifPicker] = useState(false);
  const form = useForm<CreatePaymentLinkForm>({
    defaultValues: defaultData,
    resolver: yupResolver(requestPaymentValidationSchema),
  });
  const { createPaymentLink } = usePaymentLinksMutations();
  const [sessionId, setSessionId] = useState<null | string>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<null | string>(null);
  const navigate = useNavigate();
  useOnTransactionSigned({
    sessionId,
    callback: () => {
      navigate("/payment-links/" + paymentLinkId);
    },
  });

  const gif = useWatch({
    control: form.control,
    name: "gif",
  });

  const onSubmit = async (data: CreatePaymentLinkForm) => {
    console.log(data);
    const resp = await createPaymentLink.mutateAsync({
      type: PaymentLinkType.REQUEST,
      data,
    });
    console.log(resp);
    setSessionId(resp.sessionId);
    setPaymentLinkId(resp.paymentLink.paymentLinkId);
  };

  const setGif = (gif: string | null) => {
    form.setValue("gif", gif);
    setOpenGifPicker(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <GifPickerSelector open={openGifPicker} setOpen={setOpenGifPicker} setGif={setGif} />
      <H2>Receive Money on-chain</H2>
      <FormProvider {...form}>
        <form className="max-w-xs mt-4 flex flex-col gap-4 " onSubmit={form.handleSubmit(onSubmit)}>
          <ControlledInput name="from" placeholder="From" className="w-full max-w-xs" />
          <div className="flex gap-4 ">
            <CurrencyCombobox name="token" />
            <ControlledInput name="amount" placeholder="Amount" className="w-full " />
          </div>
          <ControlledTextArea name="description" placeholder="Description" className="w-full" inputStyles="h-52" />
          {!gif && (
            <span
              style={{ width: "80px" }}
              className="w-[80px] text-xs text-gray-500 opacity-80 cursor-pointer border border-1 rounded-md p-1 flex-0 "
              onClick={(e) => {
                setOpenGifPicker(true);
              }}
            >
              Select a GIF
            </span>
          )}
          {gif && (
            <div className="relative m-auto">
              <div className="absolute top-2 right-2 cursor-pointer ">
                <div
                  style={{
                    padding: "2px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      padding: "2px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                    }}
                  >
                    <Cross1Icon
                      style={{
                        width: "10px",
                        height: "10px",
                      }}
                      onClick={() => setGif(null)}
                    />
                  </div>
                </div>
              </div>
              <img src={gif} className="rounded-md object-cover mx-auto" alt="Selected GIF" />
            </div>
          )}
          <ControlledCheckbox name="terms" label="I agree to the terms and conditions" />
          <Button variant="default" type="submit" disabled={!form.getValues("terms") || createPaymentLink.isLoading}>
            {createPaymentLink.isLoading ? "Creating..." : "Send"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
