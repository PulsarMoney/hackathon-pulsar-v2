"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/useUserStore";
import axios from "axios";
import { usePulsarActions } from "@/assets/hooks/usePulsarActions";
import { PularPageMessages } from "@/assets/messages";
import { IToken } from "@/types";
import { useNativeAuth } from "@/hooks/useNativeAuth";
import { useParams } from "react-router-dom";

export interface TransferFormProps {
  closeFormHandler(): void;
  tokens: IToken[];
}

export const TransferForm = (props: TransferFormProps) => {
  const { id } = useParams();
  const form = useFormContext();
  const pulsarActions = usePulsarActions();
  const nativeAuthToken = useNativeAuth();
  const selectedToken = form.watch("token");
  const selectedAmount = form.watch("amount");

  async function onSubmit() {
    const response = await axios.post("http://localhost:3000/transfer/donate", {
      //"erd1dp7df07e6funz27svc3nyz8yn6yqjf6ke2kv2gk2f7mtxkudjq2sjvgnc3"
      receiverAddress: id,
      tokenId: selectedToken.identifier,
      amount: selectedAmount,
    }, {
      headers: {
        Authorization: `Bearer ${nativeAuthToken}`,
      },
    });
    pulsarActions.refreshAndSend(response.data, PularPageMessages);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2 bg-[#459BB51A] rounded-lg mb-8 a p-4">
        <div>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">Amount</FormLabel>
                <FormControl className="bg-neutral-900">
                  <Input placeholder="" {...field} type="number" />
                </FormControl>
                <FormDescription className="text-white">Please enter an amount to transfer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="token"
            render={() => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">Token</FormLabel>
                <br />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="bg-neutral-900">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between", !form.getValues("token") && "text-muted-foreground")}
                      >
                        {selectedToken ? selectedToken.label.toUpperCase() : "Select token"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search token..." />
                      <CommandEmpty>No token found.</CommandEmpty>
                      <CommandGroup>
                        {props.tokens.map((token) => (
                          <CommandItem
                            value={token.label.toUpperCase()}
                            key={token.identifier}
                            onSelect={() => {
                              form.setValue("token", token);
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", token.identifier === selectedToken?.identifier ? "opacity-100" : "opacity-0")}
                            />
                            {token.label.toUpperCase()}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-white">This is the token that will be transferred.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit" variant="default" className="flex-1">
            Submit
          </Button>
          <Button type="reset" variant="destructive" onClick={props.closeFormHandler} className="flex-1">
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
};
