import { Button } from "@/components/ui/button";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { cn, getTokenPath } from "@/lib/utils";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ICreateInvoiceForm } from "@/types/invoice";
import { TrashIcon } from "@radix-ui/react-icons";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { P } from "@/components/Typography";

export const DeleteIcon = () => {
  return <TrashIcon className="scale-125" />;
};

const Header = () => {
  return (
    <div className="grid grid-cols-7 w-[98%] gap-2 mb-2">
      <P className="col-span-2">Description</P>
      <P>Quantity</P>
      <P>Unit Price</P>
      <P>Discount</P>
      <P>Tax</P>
      <P>Total</P>
    </div>
  );
};

const InvoicePositionRowBig = ({ index }: { index: number }) => {
  const { control } = useFormContext<ICreateInvoiceForm>();
  const token = useWatch({
    control,
    name: `paymentDetails.token`,
  });
  return (
    <div className="grid grid-cols-7 gap-2">
      <ControlledInput className="col-span-2" placeholder="Description" name={`paymentDetails.services.${index}.description`} />
      <ControlledInput placeholder="Quantity" type="number" name={`paymentDetails.services.${index}.quantity`} />
      <ControlledInput placeholder="Price" type="number" name={`paymentDetails.services.${index}.price`} />
      <ControlledInput placeholder="Discount" type="number" name={`paymentDetails.services.${index}.discount`} symbol="%" />
      <ControlledInput placeholder="Tax" type="number" name={`paymentDetails.services.${index}.tax`} symbol="%" />
      <ControlledInput
        className="col-span-1"
        type="number"
        name={`paymentDetails.services.${index}.totalAmount`}
        symbol={<img className="w-6 h-6 bg-black rounded-md" src={getTokenPath(token)} />}
      />
    </div>
  );
};

const InvoicePositionRowMobile = ({ index }: { index: number }) => {
  return (
    <Box borderBottom="0.5px solid #D2D2D233" paddingBottom={2} marginBottom={2}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
        <ControlledInput
          className="w-full max-w-[250px]"
          name={`paymentDetails.services.${index}.description`}
          placeholder="Description"
          label="Description"
        />
        <ControlledInput
          className="w-full max-w-[250px]"
          name={`paymentDetails.services.${index}.quantity`}
          placeholder="Quantity"
          label="Quantity"
        />
        <ControlledInput
          className=" w-full max-w-[250px]"
          name={`paymentDetails.services.${index}.price`}
          placeholder="Price"
          label="Price"
        />
        <ControlledInput
          className="w-full max-w-[250px]"
          name={`paymentDetails.services.${index}.tax`}
          placeholder="Tax"
          label="Tax"
          symbol="%"
        />
        <ControlledInput
          className="w-full max-w-[250px]"
          name={`paymentDetails.services.${index}.discount`}
          placeholder="Discount"
          label="Discount"
          symbol="%"
        />
        <ControlledInput
          className="w-full max-w-[250px]"
          readonly
          name={`paymentDetails.services.${index}.totalAmount`}
          placeholder="Total"
          label="Total"
        />
      </Box>
    </Box>
  );
};

export const DataTableInvoicePositions = () => {
  const { control } = useFormContext<ICreateInvoiceForm>();
  const { append, fields, remove } = useFieldArray({
    name: "paymentDetails.services",
    control,
  });

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div
      className="w-full h-[auto]"
      style={{
        borderBottom: "0.5px solid #D2D2D233",
        paddingBottom: "1rem",
      }}
    >
      <Box>
        <Box
          width="97%"
          className="hidden md:block"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Header />
        </Box>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center mb-2">
              <Box width="95%">{mdUp ? <InvoicePositionRowBig index={index} /> : <InvoicePositionRowMobile index={index} />}</Box>
              <Box width="5%">
                {index > 0 && (
                  <Box paddingLeft="0.5rem">
                    <Button
                      className={cn(
                        "rounded-md border border-input bg-transparent px-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black"
                      )}
                      style={{
                        width: "2.2rem",
                        height: "2.2rem",
                      }}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                )}
              </Box>
            </div>
          );
        })}
      </Box>
      <Button
        className={cn(
          "w-7 h-7 text-2xl rounded-md border border-input bg-transparent p-0 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white hover:text-black"
        )}
        onClick={(e) => {
          e.preventDefault();
          append({
            description: "",
            quantity: 0,
            discount: 0,
            tax: 0,
            totalAmount: 0,
            name: "",
            price: 0,
          });
        }}
      >
        +
      </Button>
    </div>
  );
};
