import { Input } from "@/components/ui/input";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ImagePicker from "./ImagePicker";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { ControlledTextArea } from "@/components/ui/custom/controlled-text-area";

const LogoWithCompany = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ImagePicker />
      <ControlledTextArea
        placeholder="Company Name"
        name="billingDetails.company"
        inputStyles="w-full min-w-[190px] max-w-[250px] h-[110px] resize-none bg-transparent outline-none text-white text-2xl "
      />
    </div>
  );
};

export default LogoWithCompany;
