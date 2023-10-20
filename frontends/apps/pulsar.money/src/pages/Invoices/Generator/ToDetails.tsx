import { ClientsCombobox } from "@/components/ui/custom/clients-combobox";
import { Box, Typography } from "@mui/material";
import ClientRow from "./ClientRow";

const ToDetails = () => {
  const clients = [
    {
      id: "1",
      company: "Hatom labs1",
      selectionLabel: "nem",
      email: "johnny.bravo@cartoonetwork.com",
      city: "Ciudateni",
      country: "Tara tuturor posibilitatilor",
    },
    {
      id: "2",
      company: "Hatom labs2",
      selectionLabel: "todom",
      email: "test.bravo@cartoonetwork.com",
      city: "non-ciudateni",
      country: "Tara tuturor posibilitatilor",
    },
    {
      id: "3",
      company: "Hatom labs3",
      selectionLabel: "Hatom labs3",
      email: "johnny.bravo@cartoonetwork.com",
      city: "bla-Ciudateni",
      country: "Tara tuturor posibilitatilor",
    },
  ];

  const comboboxProps = {
    placeholder: "Select client",
    emptyString: "No client found",
    searchString: "Search client",
    items: clients,
    component: ClientRow,
  };

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      sx={{
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box width="100%">
        <Typography fontWeight="bold" fontSize="1.1rem">
          To
        </Typography>
      </Box>
      <Box width="100%">
        <ClientsCombobox {...comboboxProps} />
      </Box>
    </Box>
  );
};

export default ToDetails;
