import { IPulsarPageDetails } from "@/types/pulsarPage";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ControlledInput } from "@/components/ui/custom/controlled-input";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { SOCIAL_NETWORKS } from "./PulsarPageForm";

export const LinktreeFormArray = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IPulsarPageDetails>();
  const { fields, append, remove } = useFieldArray({
    name: "linktree",
    control,
  });

  return (
    <>
      <FormLabel className="text-lg">Linktree</FormLabel>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <section className={"section"} key={field.id}>
              <ControlledInput className="col-span-2 mb-2" placeholder="Description" name={`linktree.${index}.description`} />
              <ControlledInput className="col-span-2" placeholder="URL" name={`linktree.${index}.url`} />
              <Button
                className={cn(
                  "w-7 h-7 text-2xl rounded-md border border-input bg-transparent p-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black mt-2 mr-2"
                )}
                onClick={(ev) => {
                  ev.preventDefault();
                  append({
                    description: "",
                    url: "",
                  });
                }}
              >
                +
              </Button>
              <Button
                className={cn(
                  "w-7 h-7 text-2xl rounded-md border border-input bg-transparent p-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black"
                )}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (fields.length - 1 >= 1) {
                    remove(index);
                  }
                }}
              >
                -
              </Button>
            </section>
          </div>
        );
      })}
    </>
  );
};
