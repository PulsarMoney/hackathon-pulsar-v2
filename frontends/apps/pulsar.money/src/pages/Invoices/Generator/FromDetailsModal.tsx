import { CardContainer } from "@/components/Card/Styled";
import { TitleText } from "@/components/Text/TitleText";
import InputWithLabel from "@/components/ui/custom/input-label";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Button, Card, Dialog, DialogContent, Grid } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

interface IFromDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

export const FromDetailsModal = ({ open, onClose }: IFromDetailsModalProps) => {
  return <UncontrolledFromDetailsModal open={open} onClose={onClose} />;
};

interface IUncontrolledFromDetailsModal {
  open: boolean;
  onClose: () => void;
}

export const UncontrolledFromDetailsModal = ({ open, onClose }: IUncontrolledFromDetailsModal) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          // backgroundColor: "#131516",
          backgroundColor: "red",
        },
      }}
    >
      <DialogContent>
        <Box mt="20px">
          <Card>
            <CardContainer>
              <TitleText text="Edit your details" />
              <Grid container spacing={2} mt="20px">
                <Grid item container spacing={2}>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel label="Address" id="customerDetails.address" />
                  </Grid>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel label="City" id="customerDetails.city" />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel label="Country" id="customerDetails.country" />
                  </Grid>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel label="Tax Id" id="customerDetails.taxId" />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel disabled label="Email" id="customerDetails.email" />
                  </Grid>
                  <Grid item lg={6} md={12} xs={12}>
                    <InputWithLabel label="Phone number" id="customerDetails.phoneNumber" />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Grid item lg={3} md={6} xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "white",
                        background: "#BA4254",
                        border: "1px solid #BA4254",
                        height: "2.6rem",
                      }}
                    >
                      Canceaaal
                    </Button>
                  </Grid>
                  <Grid item lg={3} md={6} xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--color-secondary)",
                        textTransform: "none",
                        height: "2.6rem",
                        borderRadius: "0.5rem",
                        color: "#F4F9FD",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        "&.Mui-disabled": {
                          backgroundColor: "#2596be33",
                          color: "#FFFFFF66",
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContainer>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
