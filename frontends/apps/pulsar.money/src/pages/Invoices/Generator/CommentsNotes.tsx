import { Box, Typography } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import { ICreateInvoiceForm } from "@/types/invoice";
import { useFormContext } from "react-hook-form";

const CommentsNotes = () => {
  const { register } = useFormContext<ICreateInvoiceForm>();

  return (
    <Box maxWidth={{ xs: "100%", md: "400px" }} width="100%">
      <Typography fontWeight="bold">Comments/Notes</Typography>
      <Textarea
        {...register("comments")}
        rows={5}
        style={{
          marginTop: "0.5rem",
          background: "rgba(62, 65, 71, 0.20)",
          border: "1px solid #3E4147",
          borderRadius: "0.5rem",
          color: "white",
        }}
        placeholder="Any further relevant information"
      />
    </Box>
  );
};

export default CommentsNotes;
