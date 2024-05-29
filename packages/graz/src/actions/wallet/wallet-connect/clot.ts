import { useGrazInternalStore } from "../../../store";
import type { Wallet } from "../../../types/wallet";
import { WalletType } from "../../../types/wallet";
import { isMobile } from "../../../utils/os";
import { getWalletConnect } from ".";
import type { GetWalletConnectParams } from "./types";

export const getWCClot = (): Wallet => {
  if (!useGrazInternalStore.getState().walletConnect?.options?.projectId?.trim()) {
    throw new Error("walletConnect.options.projectId is not defined");
  }

  if (!isMobile()) throw new Error("WalletConnect Clot mobile is only supported in mobile");

  const params: GetWalletConnectParams = {
    encoding: "base64",
    appUrl: {
      mobile: {
        ios: "clot://",
      },
    },
    walletType: WalletType.WC_CLOT_MOBILE,
    formatNativeUrl: (appUrl, wcUri, os) => {
      const plainAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
      const encoded = encodeURIComponent(wcUri);
      switch (os) {
        case "ios":
          return `${plainAppUrl}://wcV2?${encoded}`;
        default:
          return `${plainAppUrl}://wc?uri=${encoded}`;
      }
    },
  };

  return getWalletConnect(params);
};
