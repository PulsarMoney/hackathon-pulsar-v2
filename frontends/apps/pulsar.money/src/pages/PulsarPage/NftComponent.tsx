import goldNftImage from "../../../public/assets/img/gold.png";
import silverNftImage from "../../../public/assets/img/silver.png";
import bronzeNftImage from "../../../public/assets/img/bronze.png";

import { NftButton } from "./buttons/NftButton";

export const NftComponent = () => {
  return (
    <>
      <div className="max-w-2xl p-6 m-auto mt-20 rounded-lg w-full relative flex flex-col items-center justify-center border border-neutral-500 scale-90 ">
        <p className="text-2xl font-bold">Become a Pulsar</p>
        <NftButton image={goldNftImage} nftPrice={4} nftTier="Gold" creator="Matthew Joppinski" />
        <div className="flex justify-items-end">
          <NftButton image={silverNftImage} nftPrice={2} nftTier="Silver" creator="Matthew Joppinski" />
          <NftButton image={bronzeNftImage} nftPrice={1} nftTier="Bronze" creator="Matthew Joppinski" />
        </div>
      </div>
    </>
  );
};
