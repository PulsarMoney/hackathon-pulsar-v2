import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { DetailsModal } from "./DetailsModal";
import { PersonalDetails } from "../PersonalDetails";
import { P } from "@/components/Typography";
import { Pencil2Icon } from "@radix-ui/react-icons";

const FromDetails = () => {
  const { control } = useFormContext<ICreateInvoiceForm>();
  const watch = useWatch({
    control,
    name: "billingDetails",
  });

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <Box>
      <Box display="flex" gap={2} alignItems="center" justifyContent="start">
        <P>From</P>
        <Pencil2Icon
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsDetailsModalOpen(true);
          }}
        />
      </Box>
      <PersonalDetails details={watch} />
      <DetailsModal open={isDetailsModalOpen} setOpen={setIsDetailsModalOpen} />
    </Box>
  );
};

export default FromDetails;
