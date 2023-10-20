import { useState } from "react";
import { TransferForm } from "./TransferForm";
import { FormProvider, useForm } from "react-hook-form";
import { UserProps } from "@/types/UserProps";
import { getTokenPath } from "@/lib/utils";
import { TokenPresetButton } from "./buttons/TokenPresetButton";
import { IToken } from "@/types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/hooks/useUserStore";

const transerFormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Please enter a positive number.",
    })
    .gt(1),
  token: z.object({}),
});

type TransferValidationSchema = z.infer<typeof transerFormSchema>;

const TransferComponent = () => {
  const [isTransferActive, setIsTransferActive] = useState(false);
  const userData = useUserStore((s) => s.data);

  const fields = useForm<TransferValidationSchema>({
    resolver: zodResolver(transerFormSchema),
    reValidateMode: "onChange",
  });

  const handleOpenTransferForm = (token: IToken, amount: Number) => {
    fields.setValue("token", token);
    fields.setValue("amount", +amount);
    setIsTransferActive(true);
  };

  const handleCloseTransferForm = () => {
    fields.setValue("token", null);
    fields.setValue("amount", 1);
    setIsTransferActive(false);
  };

  return (
    <FormProvider {...fields}>
      <div className="w-full max-w-2xl p-6 m-auto mt-20 flex flex-col items-center rounded-lg bg-gradient-to-l from-stone-950 to-neutral-900 gap-8">
        <p className="text-center text-xl font-bold text-white">Send crypto to Matthew!</p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {userData.tokens
            .filter((token) => token.identifier !== "LKMEX-3b7d9a-01df")
            .filter((token) => token.identifier === "EGLD" || token.identifier.startsWith("USDC"))
            .map((token) => {
              return (
                <TokenPresetButton
                  key={token.identifier}
                  className="bg-[#459BB51A] h-16 w-32 text-white rounded-lg flex justify-center items-center duration-300 hover:scale-105"
                  onClick={() => handleOpenTransferForm(token, 5)}
                  children={
                    <b>
                      5$
                      <br />
                      <div className="flex align-center">
                        in {token.label.toUpperCase()} &nbsp;
                        <img src={token.label === "EGLD" ? getTokenPath(token.identifier) : token.svg} className="h-5 w-5 my-auto" />
                      </div>
                    </b>
                  }
                />
              );
            })}
          <TokenPresetButton
            className="bg-[#459BB5] h-16 w-32 text-white rounded-lg duration-300 hover:scale-105"
            onClick={() => handleOpenTransferForm(null, 5)}
            children={<b>custom</b>}
          />
        </div>
        {isTransferActive && <TransferForm closeFormHandler={handleCloseTransferForm} tokens={userData.tokens} />}
      </div>
    </FormProvider>
  );
};

export default TransferComponent;
