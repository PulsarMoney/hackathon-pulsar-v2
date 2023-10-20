import { P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { routeNames } from "@/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PaymentLinksDiscover = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div
        className="flex flex-col gap-2 p-5 rounded-lg"
        style={{
          background: "linear-gradient(121deg, rgba(25, 27, 30, 0.35) 13.77%, rgba(75, 79, 88, 0.21) 108.66%)",
          border: "1px solid #222428",
        }}
      >
        <P className="text-bold">Invoices</P>
        <p className="text-xs text-gray-200 opacity-80">Set up your Social Pay Profile and transfer tokens via Social Media</p>
        <Button
          variant="outline"
          className="text-xs flex-grow-0 max-w-[160px]"
          onClick={() => {
            navigate(routeNames.invoiceDashboard);
          }}
        >
          Set up Invoices
        </Button>
      </div>
      <div
        className="flex flex-col gap-2 p-5 rounded-lg"
        style={{
          background: "linear-gradient(121deg, rgba(25, 27, 30, 0.35) 13.77%, rgba(75, 79, 88, 0.21) 108.66%)",
          border: "1px solid #222428",
        }}
      >
        <P className="text-bold">Social Pay</P>
        <p className="text-xs text-gray-200 opacity-80">Set up your Social Pay Profile and transfer tokens via Social Media</p>
        <Button
          variant="outline"
          className="text-xs flex-grow-0 max-w-[160px]"
          onClick={() => {
            navigate(routeNames.twitter_wallet);
          }}
        >
          Set up Social Pay
        </Button>
      </div>
      <div
        className="flex flex-col gap-2 p-5 rounded-lg"
        style={{
          background: "linear-gradient(121deg, rgba(25, 27, 30, 0.35) 13.77%, rgba(75, 79, 88, 0.21) 108.66%)",
          border: "1px solid #222428",
        }}
      >
        <P className="text-bold">Payment Page</P>
        <p className="text-xs text-gray-200 opacity-80">
          Create your own Payment Page and receive support from your community, fans and friends.
        </p>
        <Button variant="outline" className="text-xs flex-grow-0 max-w-[160px]">
          Open Payment Page
        </Button>
      </div>
    </div>
  );
};
