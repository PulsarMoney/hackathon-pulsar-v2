import { CardContainer } from "@/components/Card/Styled";
import { TitleText } from "@/components/Text/TitleText";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box, Card, Grid, Typography } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import LogoWithCompany from "../LogoWithCompany";
import InvoiceTopRightDetails from "../InvoiceTopRightDetails";
import FromDetails from "../Details/FromDetails";
import ToDetails from "../Details/ToDetails";
import { DataTableInvoicePositions } from "../PositionsTable";
import Totals from "../Totals";
import CommentsNotes from "../CommentsNotes";
import GeneratorFooter from "../GeneratorFooter";
import ReceiverView from "../Recipients/RecipientsView";
import ReadOnlyComponent from "../ReadOnlyComponent";

const InvoiceReadonly = () => {
  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        border: "1px solid #1C1E21",
        background: "linear-gradient(138deg, rgba(51, 45, 45, 0.25) 0%, rgba(37, 34, 34, 0.15) 92.71%)",
      }}
    >
      <CardContainer>
        <TitleText text="Invoice viewer" />
        <Box display="flex" gap={3} flexDirection={{ xs: "column", sm: "column", md: "column", lg: "row" }}>
          <Box
            width={{
              md: "100%",
              lg: "70%",
            }}
            sx={{
              fill: "linear-gradient(155deg, rgba(25, 27, 30, 0.35) 0%, rgba(75, 79, 88, 0.21) 100%)",
              backdropFilter: "blur(10px)",
              paddingTop: "2rem",
            }}
          >
            <ReadOnlyComponent makeReadOnly>
              <Card>
                <CardContainer>
                  <Box
                    padding={{
                      xs: "1rem",
                      md: "2rem",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item container>
                        <Grid item lg={6} md={12} xs={12} paddingTop={4}>
                          <LogoWithCompany />
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          md={12}
                          xs={12}
                          marginTop={{
                            xs: "1rem",
                            lg: "0",
                          }}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Box
                            width={{
                              xs: "100%",
                              lg: "50%",
                            }}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              minWidth: "380px",
                              flexWrap: "wrap",
                            }}
                          >
                            <Box>
                              <Typography
                                textAlign="center"
                                fontSize={{
                                  xs: "1.5rem",
                                  lg: "2rem",
                                }}
                              >
                                Invoice details
                              </Typography>
                            </Box>
                            <Box>
                              <InvoiceTopRightDetails />
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item lg={6} md={12} xs={12}>
                          <FromDetails />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                          <ToDetails />
                        </Grid>
                      </Grid>
                      <Grid item container>
                        <DataTableInvoicePositions />
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item lg={6} md={12} xs={12}></Grid>
                        <Grid item lg={6} md={12} xs={12}>
                          <Totals />
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item lg={6} md={12} xs={12}>
                          <CommentsNotes />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}></Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContainer>
                <GeneratorFooter />
              </Card>
            </ReadOnlyComponent>
          </Box>
          <Box
            paddingTop="2rem"
            width={{
              md: "100%",
              lg: "30%",
            }}
          >
            <Card>
              <CardContainer>
                <Box
                  padding={{
                    xs: "1rem",
                  }}
                  sx={{
                    borderRadius: "11px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <ReceiverView />
                </Box>
              </CardContainer>
            </Card>
          </Box>
        </Box>
      </CardContainer>
    </Card>
  );
};

export default InvoiceReadonly;
