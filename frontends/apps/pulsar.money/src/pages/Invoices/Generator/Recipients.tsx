import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Typography } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";

const Recepients = () => {
  const { register, control, formState } = useFormContext<ICreateInvoiceForm>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    name: "recipients",
    control,
  });

  console.log(formState);

  return (
    <Box>
      <Typography fontSize="1.25rem" fontWeight="bold">
        Your recepient will be:
      </Typography>
      <Box display="flex" gap={1} flexDirection="column" marginY={2}>
        {fields.map((recepient, index) => {
          return (
            <Box>
              <Input type="email" key={recepient.id} {...register(`recipients.${index}.value`)} />
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={() => {
          append({ value: "" });
        }}
      >
        + Add cc
      </Button>
    </Box>
  );
};

export default Recepients;
