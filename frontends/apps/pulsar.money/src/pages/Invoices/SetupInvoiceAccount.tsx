import { CardContainer } from "@/components/Card/Styled";
import { SecondaryCard } from "@/components/Cards/SecondaryCard";
import { TitleText } from "@/components/Text/TitleText";
import { BlueGradientText, H1, H2, P } from "@/components/Typography";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Card } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { InvoiceAccountRegisterForm } from "@/types/invoice";
import { createInvoiceAccountValidationSchema } from "./validations/createInvoiceAccountValidationSchema";
import { useUserSettingsMutation } from "@/hooks/user-settings/useUserSettingsMutation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HAS_USER_SETTINGS_STATE, useHasUserSettings } from "@/hooks/user-settings/useHasUserSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog as MUIDialog, DialogTitle as MUIDialogTitle, DialogContent as MUIDialogContent } from "@mui/material";
import { Navigate } from "react-router-dom";
import { routeNames } from "@/routes";

interface IVerifyEmailDialogProps {
  open: boolean;
  email?: string;
}
export const VerifyEmailDialog = ({ open, email }: IVerifyEmailDialogProps) => {
  const form = useForm<{ code: string }>();
  const { verify2Fa, resend2Fa, deleteUserSettings } = useUserSettingsMutation();

  const handleSubmit = async ({ code }: { code: string }) => {
    const errorMessage = await verify2Fa.mutateAsync(code);
    if (errorMessage) {
      form.setError("code", { message: errorMessage });
    }
  };

  const onEmailChange = async (e: any) => {
    e.preventDefault();
    await deleteUserSettings.mutateAsync();
  }

  return (
    <MUIDialog open={open} maxWidth="sm" fullWidth>
      <MUIDialogContent className="p-4">
        <MUIDialogTitle className="text-center">Verify your email</MUIDialogTitle>
        <div className="max-w-xl mx-auto flex flex-col justify-center items-center gap-2">
          <P className="text-center">A verification email has been sent to your email at</P>
          <P className="text-center font-bold">{email}</P>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[300px] w-full flex flex-col gap-2">
            <Input
              id="code"
              placeholder="Enter verification code"
              {...form.register("code")}
              className={cn("your-normal-input-styles", form.formState.errors.code && "border-red-500")}
            />

            {/* Display error message */}
            {form.formState.errors.code && <span className="text-red-500">{form.formState.errors.code.message}</span>}

            <Button variant="default" type="submit">
              {" "}
              Verify Account
            </Button>
          </form>
          <div className="max-w-[200px] w-full flex flex-wrap justify-between">
            <p
              className="text-sm text-[#459BB5] cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                await resend2Fa.mutateAsync();
              }}
            >
              Resend Code
            </p>
            <p className="text-sm text-[#459BB5] cursor-pointer" onClick={onEmailChange}>Change Email</p>
          </div>
        </div>
      </MUIDialogContent>
    </MUIDialog>
  );
};

export const SetupInvoiceAccount = () => {
  const hasUserSettings = useHasUserSettings();
  const [shouldVerifyEmail, setShouldVerifyEmail] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const form = useForm<InvoiceAccountRegisterForm>({
    resolver: yupResolver(createInvoiceAccountValidationSchema),
  });
  const { createInvoiceAccountMutaion } = useUserSettingsMutation();
  const handleSubmit = async (data: InvoiceAccountRegisterForm) => {
    await createInvoiceAccountMutaion.mutateAsync(data);
    // this should open only if the creation is successful
    setShouldVerifyEmail(true);
  };

  if (hasUserSettings.data?.status === HAS_USER_SETTINGS_STATE.VERIFIED) {
    return <Navigate to={routeNames.invoiceDashboard} replace />;
  }

  return (
    <Card>
      <CardContainer>
        <VerifyEmailDialog
          open={hasUserSettings.data?.status === HAS_USER_SETTINGS_STATE.EMAIL_NOT_VERIFIED || shouldVerifyEmail}
          email={hasUserSettings.data?.email}
        />
        <TitleText text="Invoices" />
        <div className="mt-5">
          <H1>Invoicing Portal</H1>
          <P>From Invoice Creation to Payment - Effortlessly</P>
        </div>
        <SecondaryCard sx={{ mt: "20px" }}>
          <div className="p-5 min-h-[60vh] max-w-7xl mr-auto lg:mt-5 ">
            <div className=" flex flex-wrap-reverse justify-between gap-2">
              <div className="max-w-3xl">
                <H2>Craft your unique Pulsar Invoice</H2>
                <BlueGradientText className="mt-2">
                  Showcase your content, share your vision, and attract meaningful support
                </BlueGradientText>
                <P className="mt-5">
                  An effortless platform to consolidate information, receive support and endorsement from your followers, and cultivate
                  vibrant communities.
                </P>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5 grid gap-1 max-w-lg">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2 h-15">
                          <FormControl>
                            <Input placeholder="Email" onFocus={() => setIsExpanded(true)} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div
                      className={cn(
                        "col-span-1 overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "h-14 p-px" : "h-0 p-0"
                      )}
                    >
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="h-15">
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "col-span-1 overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "h-14 p-px" : "h-0 p-0"
                      )}
                    >
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="h-15">
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <LoadingButton
                      loading={createInvoiceAccountMutaion.isLoading}
                      variant="contained"
                      type="submit"
                      sx={{
                        marginTop: {
                          xs: "15px",
                        },
                        background: "#459BB5",
                        "&.MuiButton-contained.Mui-disabled": {
                          background: "#387e94e2",
                        },
                      }}
                    >
                      Setup Invoices
                    </LoadingButton>
                  </form>
                </Form>
              </div>
              <img src="assets/img/invoices/setup.png" alt="invoice" className="min-w-sm  object-contain " />
            </div>
          </div>
        </SecondaryCard>
      </CardContainer>
    </Card>
  );
};
