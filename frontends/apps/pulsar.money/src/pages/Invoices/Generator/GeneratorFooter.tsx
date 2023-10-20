import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { Input } from "@/components/ui/input";
import { CenteredFlexBox } from "@/ToRefactor/Styled/GlobalStyled";
import { Box, Button, Typography } from "@mui/material";

const GeneratorFooter = () => {
  return (
    <Box
      display="flex"
      gap={4}
      sx={{
        padding: "1rem 2rem",
        background: "#3E414733",
      }}
      justifyContent="space-between"
    >
      <Box
        width={{
          xs: "50%",
          md: "30%",
        }}
      >
        <ControlledInput name="footerText" />
      </Box>
      <CenteredFlexBox>
        <Typography color="#B6B6B6" fontSize="0.75rem">
          Powered by pulsar.money
        </Typography>
      </CenteredFlexBox>
    </Box>
  );
};

export default GeneratorFooter;
