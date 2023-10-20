import { TitleText } from "@/components/Text/TitleText";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUserSettingsMutation } from "@/hooks/user-settings/useUserSettingsMutation";
import { ICreateInvoiceForm } from "@/types/invoice";
import { useFormContext } from "react-hook-form";

interface IFromDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

interface IUncontrolledFromDetailsModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailsModal = ({ open, setOpen }: IUncontrolledFromDetailsModal) => {
  const { register, getValues } = useFormContext<ICreateInvoiceForm>();
  const { updateInvoiceAccountMutaion } = useUserSettingsMutation();

  const onSubmit = () => {
    const billing = getValues("billingDetails");
    updateInvoiceAccountMutaion.mutate(billing);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <TitleText text="Edit your details" />
        <div
          // onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap mt-4 max-h-[80vh] overflow-y-auto"
        >
          <ControlledInput
            label="First Name"
            placeholder="First Name"
            name="billingDetails.firstName"
            className="md:max-w-[250px]"
          />
          <ControlledInput label="Last Name" placeholder="Last Name" name="billingDetails.lastName" className="md:max-w-[250px]" />
          <ControlledInput disabled label="Email" placeholder="Email" name="billingDetails.email" className="md:col-span-2" />
          <ControlledInput label="Address" placeholder="Address" name="billingDetails.address" className="md:max-w-[250px]" />
          <ControlledInput label="City" placeholder="City" name="city" className="md:max-w-[250px]" />
          <ControlledInput label="Country" placeholder="Country" name="billingDetails.country" className="md:max-w-[250px]" />
          <ControlledInput label="Tax Id" placeholder="Tax Id" name="billingDetails.taxId" className="md:max-w-[250px]" />
          <ControlledInput label="Phone Number" placeholder="Phone number" name="billingDetails.phoneNumber" className="md:max-w-[250px]" />
          <ControlledInput label="Website" placeholder="Website" name="billingDetails.website" className="md:max-w-[250px]" />
          <Button
            variant="default"
            // type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
