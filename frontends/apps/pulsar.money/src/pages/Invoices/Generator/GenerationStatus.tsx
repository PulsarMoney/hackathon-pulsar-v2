import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Error from "@mui/icons-material/Error";
import Pending from "@mui/icons-material/Pending";
import { CenteredFlexBox } from "@/ToRefactor/Styled/GlobalStyled";
import { useFormContext } from "react-hook-form";
import { ICreateInvoiceForm } from "@/types/invoice";
export interface IGenerationStep {
  name: string;
  descriptions: {
    pending: string;
    success: string;
  };
  status: "pending" | "success";
}

interface IGenerationStatusProps {
  steps: IGenerationStep[];
}

const PendingIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#373737" />
      <path d="M14.2637 5.71094V7.42163" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5409 6.85693L17.6855 8.33842" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.6729 9.98779L20.1914 10.8431" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.8181 14.2646H21.1074" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.6729 18.5409L20.1914 17.6855" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5409 21.6719L17.6855 20.1904" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.2637 22.8181V21.1074" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.98828 21.6719L10.8436 20.1904" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.85742 18.5409L8.33891 17.6855" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.71094 14.2646H7.42163" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.85742 9.98779L8.33891 10.8431" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.98828 6.85693L10.8436 8.33842" stroke="white" strokeWidth="1.71069" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const GenerationStep = ({ step }: { step: IGenerationStep }) => {
  const icons = {
    success: (
      <CheckCircleIcon
        style={{
          height: "28px",
          width: "28px",
        }}
      />
    ),
    pending: <PendingIcon />,
  };

  return (
    <Box
      width={{
        xs: "100%",
        md: "50%",
      }}
    >
      <Box display="flex" gap={1}>
        <CenteredFlexBox>{icons[step.status]}</CenteredFlexBox>
        <Box width="70%" paddingX={1} lineHeight="1.25rem">
          <Typography fontSize="14px">{step.name}</Typography>
          <Typography fontSize="10px" color="#898989">
            {step.descriptions[step.status]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const GenerationStatus = ({ steps }: IGenerationStatusProps) => {
  return (
    <Box>
      <Typography fontWeight="bold" fontSize="1.25rem">
        Invoice Generation Status
      </Typography>
      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        flexWrap="wrap"
        rowGap={2}
        sx={{
          border: "1px solid #3E4147",
          borderRadius: "0.5rem",
          padding: "1rem",
          marginTop: "0.5rem",
          background: "rgba(62, 65, 71, 0.20)",
        }}
      >
        {steps.map((step, i) => {
          return <GenerationStep step={step} key={`generation-step-${i}`} />;
        })}
      </Box>
    </Box>
  );
};

export default GenerationStatus;
