import { TitleText } from "@/components/Text/TitleText";
import { ICreateInvoiceForm, IPersonalDetails } from "@/types/invoice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { personalDetailsSchema } from "../../validations/createInvoiceFormSchema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useUserSettings } from "@/hooks/user-settings/useUserSettings";
import { useUserSettingsMutation } from "@/hooks/user-settings/useUserSettingsMutation";

interface IUncontrolledFromDetailsModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddCustomerModal = ({ open, setOpen }: IUncontrolledFromDetailsModal) => {
  const { setValue, control } = useFormContext<ICreateInvoiceForm>();
  const form = useForm<IPersonalDetails>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      taxId: "",
      email: "",
      phoneNumber: "",
      website: "",
    },
    resolver: yupResolver(personalDetailsSchema) as any,
    reValidateMode: "onBlur",
  });
  const recepients = useWatch({ control, name: "recipients" });
  const { addCustomerMutation } = useUserSettingsMutation();
  const handleSubmit = (data: IPersonalDetails) => {
    console.log(data);
    addCustomerMutation.mutate(data);
    setValue("customerDetails", data);
    setValue("recipients", [...recepients, { value: data.email }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Box mt="20px">
          <TitleText text="Add a customer" />
          <FormProvider {...form}>
            <form
              // onSubmit={form.handleSubmit(handleSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap mt-4 max-h-[80vh] overflow-y-auto"
            >
              <ControlledInput label="First Name" placeholder="First Name" name="firstName" className="md:max-w-[250px]" />
              <ControlledInput label="Last Name" placeholder="Last Name" name="lastName" className="md:max-w-[250px]" />
              <ControlledInput label="Email" placeholder="Email" name="email" className="md:col-span-2" />
              <ControlledInput label="Address" placeholder="Address" name="address" className="md:max-w-[250px]" />
              <ControlledInput label="City" placeholder="City" name="city" className="md:max-w-[250px]" />
              <ControlledInput label="Country" placeholder="Country" name="country" className="md:max-w-[250px]" />
              <ControlledInput label="Tax Id" placeholder="Tax Id" name="taxId" className="md:max-w-[250px]" />
              <ControlledInput label="Phone Number" placeholder="Phone number" name="phoneNumber" className="md:max-w-[250px]" />
              <ControlledInput label="Website" placeholder="Website" name="website" className="md:max-w-[250px]" />
              <Button
                variant="default"
                // type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit(handleSubmit)();
                }}
              >
                Add Client
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </FormProvider>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
