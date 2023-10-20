import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { FromDetailsModal } from "./FromDetailsModal";
import { Pencil1Icon } from "@radix-ui/react-icons";

const FromDetails = () => {
  const address = "Grunderberg 16";
  const city = "Munich";
  const country = "Germany";
  const phone = "+49 648 684 462";
  const email = "mathias@pulsar.money";
  const website = "pulsar.money";

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <Box>
      <Box display="flex" gap={2} alignItems="center" justifyContent="start">
        <Typography fontWeight="bold" fontSize="1.1rem">
          From
        </Typography>
        <Box
          sx={{
            border: "1px solid #3E4147 ",
            borderRadius: "0.25rem",
            padding: "0.1rem 0.2rem",
          }}
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => setIsDetailsModalOpen(true)}
        >
          <Typography fontSize={10} color="#B4B4B4">
            your details
          </Typography>
          <Pencil1Icon />
        </Box>
      </Box>
      <Typography>{address}</Typography>
      <Typography>
        {city}, {country}
      </Typography>
      <Typography>{phone}</Typography>
      <Typography>{email}</Typography>
      <Typography>{website}</Typography>
      <FromDetailsModal open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} />
    </Box>
  );
};

export default FromDetails;
