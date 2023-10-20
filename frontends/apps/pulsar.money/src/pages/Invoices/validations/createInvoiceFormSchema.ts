import * as yup from "yup";

export const personalDetailsSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  address: yup.string().optional(),
  city: yup.string().notRequired(),
  country: yup.string().notRequired(),
  postalCode: yup.string().notRequired(),
  state: yup.string().notRequired(),
  taxId: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
  website: yup.string().url("Invalid website format").notRequired(),
  company: yup.string().optional(),
});

const serviceSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  price: yup.number().moreThan(0, "Price should be bigger than 0").required("Price is required"),
  quantity: yup.number().moreThan(0, "Quantity should be bigger than 0").required("Quantity is required"),
  tax: yup.number().min(0, "Tax should be positive").max(100, "Tax cannot exceed 100%").required("Tax is required"),
  discount: yup.number().min(0, "Discount should be positive").max(100, "Discount cannot exceed 100%").required("Discount is required"),
  totalAmount: yup.number().min(0, "Total Amount should be positive").required("Total Amount is required"),
});

const createInvoiceFormSchema = yup.object().shape({
  invoiceNumber: yup.string().required("Invoice number is required"),
  issuedAt: yup.date().required("Issue date is required"),
  dueDate: yup.date().min(yup.ref("issuedAt"), "Due date cannot be before the issue date").required("Due date is required"),
  paymentDetails: yup.object().shape({
    services: yup.array().of(serviceSchema).min(1, "At least one service is required").required("Services are required"),
    token: yup.string().required("Token is required"),
    amount: yup.number().min(0, "Amount should be positive").nullable(),
  }),
  customerDetails: personalDetailsSchema.required("Customer details are required"),
  billingDetails: personalDetailsSchema.required("Billing details are required"),
  recipients: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().email().required("Recipient value is required"),
      })
    )
    .max(5, "Maximum 5 recipients are allowed")
    .required("Recipients are required"),
  // this is array of {value: string}
  image: yup.mixed().nullable(),
  comments: yup.string().optional(),
});

export default createInvoiceFormSchema;
