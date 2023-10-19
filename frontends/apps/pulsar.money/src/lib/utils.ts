import { NETWORK } from "@/config";
import { IPersonalDetails } from "@/types/invoice";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import egld from "../../public/assets/img/multiversx-icon.svg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTokenPath = (token: string) => {
  if (!token) return "";
  if (token.toUpperCase() === "EGLD") return egld;
  if (NETWORK === "D") return `https://raw.githubusercontent.com/multiversx/mx-assets/master/devnet/tokens/${token}/logo.png`;
  return `https://raw.githubusercontent.com/multiversx/mx-assets/7425b7a06e68cf212da28a22c0f931a02a8c98e7/tokens/${token}/logo.png`;
};

export const getErrorMessage = (error: any, defaultMessage: string) => {
  if (typeof error?.response.data.message === "string") {
    return error?.response.data.message;
  }
  if (Array.isArray(error?.response.data.message)) {
    return error?.response.data.message[0];
  }
  return defaultMessage;
};
