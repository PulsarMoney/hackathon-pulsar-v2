import { WALLET_PROVIDER_DEVNET, WALLET_PROVIDER_MAINNET } from "@multiversx/sdk-web-wallet-provider/out/constants";
import { WalletProvider } from "@multiversx/sdk-web-wallet-provider/out/walletProvider";
import THEMES from "./assets/themes";
import { PulsarTheme } from "./types/Theme";

// export const NETWORK = "D"; // testing
export const NETWORK = import.meta.env.VITE_NETWORK as string;
const wallet_provider = NETWORK === "D" ? WALLET_PROVIDER_MAINNET : WALLET_PROVIDER_DEVNET;
export const provider = new WalletProvider(wallet_provider);

export const dAppName = "PulsarMoney";

export const API_ENDPOINTS = {
  TOKEN: "tokens",
};

export const EGLD = "EGLD";
export const CURRENT_THEME: PulsarTheme = THEMES.dark;

export const drawerWidth = 240;
