import * as yup from "yup";

export const createInvoiceAccountValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});