import { http, createConfig } from "wagmi";
import { Chain, mainnet, sepolia } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

export const vanaSatori: Chain = {
  id: 14801,
  name: "Vana Satori Testnet",
  nativeCurrency: {
    name: "VANA",
    symbol: "VANA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.satori.vana.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Vanascan",
      url: "https://satori.vanascan.io",
    },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [vanaSatori],
  connectors: [
    metaMask(),
    walletConnect({ projectId: "0fb542e3162856a20db8985a3dc5b06f" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
