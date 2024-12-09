import type { Window as KeplrWindow } from "@keplr-wallet/types";
import type { BaseProvider, MetaMaskInpageProvider } from "@metamask/providers";
import type Station from "@terra-money/station-connector";
import type { VectisWindow } from "@vectis/extension-client";

import type { InitiaWallet } from "../src/actions/wallet/initia";

declare global {
  interface Window extends KeplrWindow, VectisWindow {
    leap?: KeplrWindow["keplr"];
    compass?: KeplrWindow["keplr"];
    cosmostation?: {
      cosmos: {
        on: (type: string, listener: EventListenerOrEventListenerObject) => void;
        off: (type: string, listener: EventListenerOrEventListenerObject) => void;
      };
      providers: {
        keplr: KeplrWindow["keplr"];
      };
    };
    ethereum?: MetaMaskInpageProvider;
    okxwallet?: BaseProvider & {
      keplr: KeplrWindow["keplr"];
    };
    station?: Station;
    // xfi?: {
    //   keplr: KeplrWindow["keplr"];
    // };
    initia?: InitiaWallet;
  }
}
