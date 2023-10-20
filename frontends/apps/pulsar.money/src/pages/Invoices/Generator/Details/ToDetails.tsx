import { Button } from "@/components/ui/button";
import { ClientsCombobox } from "@/components/ui/custom/clients-combobox";
import { cn } from "@/lib/utils";
import { ICreateInvoiceForm, IPersonalDetails } from "@/types/invoice";
import { Box, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { DeleteIcon } from "../PositionsTable";
import { PersonalDetails } from "../PersonalDetails";

const comboboxProps = {
  placeholder: "Select client",
  emptyString: "No client found",
  searchString: "Search client",
  items: [],
};

const ToDetails = () => {
  const { control, setValue, getValues } = useFormContext<ICreateInvoiceForm>();

  const fields = useWatch({
    control,
    name: "customerDetails",
  });
  const emailRecipients = useWatch({
    control,
    name: "recipients",
  });

  const isCustomerEmpty = !fields || Object.values(fields).every((x) => x === null || x === "");

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography fontWeight="bold" fontSize="1.1rem">
          To
        </Typography>
        {!isCustomerEmpty && (
          <Button
            className={cn(
              "rounded-md border border-input bg-transparent px-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black"
            )}
            style={{
              width: "1.3rem",
              height: "1.3rem",
            }}
            onClick={() => {
              setValue("recipients", emailRecipients.filter((item) => item.value !== fields.email)); 
              setValue("customerDetails", null);
            }}
          >
            <DeleteIcon />
          </Button>
        )}
      </Box>
      {isCustomerEmpty ? (
        <Box width="100%">
          <ClientsCombobox {...comboboxProps} />
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: "6rem",
          }}
        >
          <PersonalDetails details={fields} />
        </Box>
      )}
    </Box>
  );
};

export default ToDetails;
