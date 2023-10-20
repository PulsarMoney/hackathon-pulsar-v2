import { ReactNode } from "react";

export interface NftButtonProps {
  image: string;
  nftPrice: number;
  nftTier: string;
  creator: string;
}

import Card from "@/components/Card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { usePulsarActions } from "@/assets/hooks/usePulsarActions";
import { useParams } from "react-router-dom";
import { useNativeAuth } from "@/hooks/useNativeAuth";

import axios from "axios";
import { PularPageDonationMessages } from "@/assets/messages";

export const NftButton = (props: NftButtonProps) => {
  const { id } = useParams();
  const pulsarActions = usePulsarActions();
  const nativeAuthToken = useNativeAuth();

  const buyNft = async () => {
    const response = await axios.post(
      "http://localhost:3000/transfer/buyNft",
      {
        receiverAddress: id,
        amount: props.nftPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${nativeAuthToken}`,
        },
      }
    );
    pulsarActions.refreshAndSend(response.data, PularPageDonationMessages);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Card titleFontSize="12">
          <p className="flex justify-center mb-4 font-bold">{props.nftTier} NFT</p>
          <img src={props.image} className="w-32 h-[213px]" />
          <p className="flex justify-center mt-4 font-bold">{props.nftPrice} EGLD</p>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            You are about to support {props.creator} by purchasing the {props.nftTier} NFT for {props.nftPrice} EGLD.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" className="h-8 w-32">
              No
            </Button>
          </DialogClose>
          <DialogClose asChild onClick={buyNft}>
            <Button type="button" variant="default" className="h-8 w-32">
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
