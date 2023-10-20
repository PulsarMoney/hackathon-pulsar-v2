import { Label } from "@/components/ui/label";
import { ICreateInvoiceForm, Service } from "@/types/invoice";
import { Box } from "@mui/material";
import { CSSProperties, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const orZero = (value: number) => {
  return value || 0;
};

const TotalPosition = ({ label, amount, style }: { label: string; amount: string; style?: CSSProperties | undefined }) => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box width="50%">
        <Label
          style={{
            ...style,
            fontSize: "1rem",
            lineHeight: "1.5rem",
          }}
        >
          {label}
        </Label>
      </Box>
      <Box width="50%" textAlign="right">
        <Label
          style={{
            ...style,
            fontSize: "1rem",
            lineHeight: "1.5rem",
          }}
        >
          {amount}
        </Label>
      </Box>
    </Box>
  );
};

const Totals = () => {
  const { control, setValue } = useFormContext<ICreateInvoiceForm>();

  const fields = useWatch({
    control,
    name: "paymentDetails.services",
  });
  const { token } = useWatch({
    control,
    name: "paymentDetails",
  });
  const previousFieldsRef = useRef(fields);

  const isFieldChanged = (currentField: Service, previousField: Service) => {
    return (
      currentField?.quantity !== previousField?.quantity ||
      currentField?.price !== previousField?.price ||
      currentField?.tax !== previousField?.tax ||
      currentField?.discount !== previousField?.discount ||
      currentField?.totalAmount !== previousField?.totalAmount
    );
  };

  useEffect(() => {
    fields?.forEach((field, index) => {
      if (isFieldChanged(field, previousFieldsRef.current[index])) {
        const clampedTax = Math.min(Math.max(orZero(field.tax), 0), 100);
        const clampedDiscount = Math.min(Math.max(orZero(field.discount), 0), 100);
        const price = Math.max(orZero(field.price), 0);
        const quantity = Math.max(orZero(field.quantity), 0);

        setValue(`paymentDetails.services.${index}.tax`, clampedTax);
        setValue(`paymentDetails.services.${index}.discount`, clampedDiscount);
        setValue(`paymentDetails.services.${index}.price`, price);
        setValue(`paymentDetails.services.${index}.quantity`, quantity);

        const updatedTotalAmount = quantity * price - (clampedDiscount / 100) * quantity * price + (clampedTax / 100) * quantity * price;
        setValue(`paymentDetails.services.${index}.totalAmount`, updatedTotalAmount);
      }
    });

    // Update the ref with the current value of fields after we're done
    previousFieldsRef.current = fields;
  }, [fields, setValue]);

  const isValidField = (field: Service) => {
    const { quantity, price, tax, discount, totalAmount } = field;
    return (
      orZero(quantity) >= 0 &&
      orZero(price) >= 0 &&
      orZero(tax) >= 0 &&
      orZero(tax) <= 100 &&
      orZero(discount) >= 0 &&
      orZero(discount) <= 100 &&
      orZero(totalAmount) >= 0
    );
  };

  const subtotal = fields?.every(isValidField) ? fields.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) : "N/A";

  const taxes = fields?.every(isValidField) ? fields.reduce((acc, curr) => acc + (curr.tax / 100) * curr.quantity * curr.price, 0) : "N/A";

  const discounts = fields?.every(isValidField)
    ? fields.reduce((acc, curr) => acc + ((curr.discount || 0) / 100) * curr.quantity * curr.price, 0)
    : "N/A";

  const total = subtotal !== "N/A" && taxes !== "N/A" && discounts !== "N/A" ? subtotal + taxes - discounts : "N/A";

  return (
    <Box display={{ lg: "flex", xs: "block" }} flexDirection={{ lg: "row-reverse", xs: "row" }}>
      <Box width={{ lg: "70%", xs: "100%" }}>
        <Box
          gap={1}
          sx={{
            paddingBottom: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TotalPosition label="Subtotal" amount={subtotal !== "N/A" ? subtotal.toFixed(2).toString() + ` ${token}` : "N/A"} />
          <TotalPosition label="Discounts" amount={discounts !== "N/A" ? discounts.toFixed(2).toString() + ` ${token}` : "N/A"} />
          <TotalPosition label="Taxes" amount={taxes !== "N/A" ? taxes.toFixed(2).toString() + ` ${token}` : "N/A"} />
        </Box>

        <Box
          sx={{
            paddingTop: "1rem",
            borderTop: "0.5px solid #D2D2D233",
          }}
        >
          <TotalPosition
            label="Total"
            amount={total !== "N/A" ? total.toFixed(2).toString() + ` ${token}` : "N/A"}
            style={{
              fontWeight: "bold",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Totals;
