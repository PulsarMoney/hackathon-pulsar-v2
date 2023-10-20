import * as yup from "yup";

export const requestPaymentValidationSchema = yup.object().shape({
  from: yup.string().required(),
  description: yup.string().optional(),
  amount: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .required(),
    
  token: yup.string().required(),
  terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  gif: yup.string().optional().nullable(),
});
