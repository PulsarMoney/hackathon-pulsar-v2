import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPulsarPageDetails } from "@/types/pulsarPage";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import * as yup from "yup";
import axios from "axios";
import { useNativeAuth } from "@/hooks/useNativeAuth";
import { openErrorSnackbar } from "@/utils/snackbar.utils";
import { Link } from "@/types/Link";
import { LinktreeFormArray } from "./LinktreeFormArray";
import { ControlledInput } from "@/components/ui/custom/controlled-input";
import { usePulsarActions } from "@/assets/hooks/usePulsarActions";
import { PularPageRegistrationMessages } from "@/assets/messages";

export const SOCIAL_NETWORKS = ["Facebook", , "Instagram", "Twitter", "Linkedin", "Tiktok", "Youtube"];

export const PulsarPageForm = () => {
  const nativeAuthToken = useNativeAuth();
  const pulsarActions = usePulsarActions();

  const pulsarPageDetailsSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    description: yup.string().optional(),
    linktree: yup.array().of(
      yup.object().shape({
        description: yup
          .mixed<String>()
          .oneOf(
            ["Facebook", "Instagram", "Twitter", "Linkedin", "Tiktok", "Youtube"],
            `The description of the URL must match one of the following social networks: ${[...SOCIAL_NETWORKS]}`
          ),
        url: yup.string().required("URL of a link is required."),
      })
    ),
  });

  const form = useForm<IPulsarPageDetails>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      description: "",
      linktree: [{ description: "Twitter", url: "www.twitter.com" } as Link],
    },
    resolver: yupResolver(pulsarPageDetailsSchema) as any,
    reValidateMode: "onBlur",
  });

  const onSubmit = async (formData: IPulsarPageDetails) => {
    const usernameQueryResponse = await axios.get(`http://localhost:3000/users/findByUsername/${formData.username}`);
    const usernameQueryResponseData = usernameQueryResponse.data;
    if (usernameQueryResponseData) {
      return openErrorSnackbar("The username is already taken!");
    }

    await axios.post(
      `http://localhost:3000/users`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        description: formData.description,
        imageUrl: "",
        linktree: formData.linktree,
      },
      {
        headers: {
          Authorization: `Bearer ${nativeAuthToken}`,
        },
      }
    );

    // Register user with the sc
    const response = await axios.post(
      `http://localhost:3000/transfer/register`,
      {},
      {
        params: {
          username: formData.username,
        },
        headers: {
          Authorization: `Bearer ${nativeAuthToken}`,
        },
      }
    );
    pulsarActions.refreshAndSend(response.data, PularPageRegistrationMessages);
  };

  return (
    <div>
      <p className="mb-4 text-4xl">Pulsar Page registration form</p>
      <FormProvider {...form}>
        {/* <Form {...form}> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-[#459BB51A] rounded-lg mb-8 a p-4">
          {/* First name input field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">First name</FormLabel>
                <FormControl className="bg-neutral-900">
                  <Input placeholder="What is your first name?" {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last name input field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">Last name</FormLabel>
                <FormControl className="bg-neutral-900">
                  <Input placeholder="What is your last name?" {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Username input field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">Username</FormLabel>
                <FormControl className="bg-neutral-900">
                  <Input placeholder="What should your username be?" {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description input field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl className="bg-neutral-900">
                  <Input placeholder="Tell us a bit about yourself." {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Linktree input field */}
          <LinktreeFormArray />
          <div className="flex space-x-2">
            <Button type="reset" variant="destructive" className="flex-1">
              Close
            </Button>
            <Button type="submit" variant="default" className="flex-1">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
