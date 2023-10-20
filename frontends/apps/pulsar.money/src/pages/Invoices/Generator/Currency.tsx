import { CurrencyCombobox } from "@/components/ui/custom/currency-combobox";
import { Box, Typography } from "@mui/material";

const Currency = () => {
  return (
    <Box>
      <Typography fontSize="1.25rem" fontWeight="bold">
        Currency
      </Typography>
      <CurrencyCombobox name="paymentDetails.token" />
    </Box>
  );
};

export default Currency;
