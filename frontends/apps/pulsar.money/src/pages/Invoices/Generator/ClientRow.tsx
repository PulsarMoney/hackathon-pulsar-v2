import { useUserSettingsMutation } from "@/hooks/user-settings/useUserSettingsMutation";
import { getCompanyOrName, getLocation } from "@/lib/utils";
import { IPersonalDetails } from "@/types/invoice";
import { Box, Grid, Typography } from "@mui/material";
import { Cross2Icon } from "@radix-ui/react-icons";

const ClientRow = ({ client }: { client: IPersonalDetails }) => {
  const { removeCustomerMutation } = useUserSettingsMutation();
  const deleteClient = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    removeCustomerMutation.mutate(client._id);
  };
  return (
    <Box
      sx={{
        width: "100%",
        padding: "0.5rem 0",
        borderBottom: "0.5px solid #D2D2D233",
        marginBottom: "0.5rem",
        position: "relative",
      }}
    >
      <Cross2Icon className="absolute top-2 right-0 text-white cursor-pointer transition-all hover:text-gray-500 " onClick={deleteClient} />
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Typography color="#EBEBEB">{getCompanyOrName(client)}</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item sm={6} xs={12}>
          <Typography color="#EBEBEB" fontSize="0.75rem" fontWeight={400} lineHeight="1.5rem">
            {client.email}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography color="#EBEBEB" fontSize="0.75rem" fontWeight={400} lineHeight="1.5rem" textAlign="right">
            {getLocation(client)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientRow;
