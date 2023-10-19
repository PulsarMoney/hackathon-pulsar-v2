import { EGLD, USDC } from "../config";

export const defaultTokens = [
  {
    label: "USDC",
    svg: "https://devnet-media.elrond.com/tokens/asset/USDC-8d4068/logo.svg",
    tokenId: USDC,
  },
  {
    label: EGLD,
    svg: "https://raw.githubusercontent.com/multiversx/mx-assets/master/identities/multiversx/logo.png",
    tokenId: EGLD,
  },
];

export const getTwitterBalanceWithDefaultTokens = (balance: any) => {
  const balanceCopy = JSON.parse(JSON.stringify(balance)) as any;

  defaultTokens.forEach((token) => {
    if (!balanceCopy.tokens.find((t) => t.token_id === token.tokenId)) {
      balanceCopy.tokens.push({
        token_id: token.tokenId,
        amount: 0,
        price: 0,
        svg: token.svg,
        label: token.label,
      });
    }
  });

  return balanceCopy;
};
