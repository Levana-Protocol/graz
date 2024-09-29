import { keccak256 } from "js-sha3";
import crypto from "crypto";

import { RECONNECT_SESSION_KEY } from "../../constant";
import { grazSessionDefaultValues, useGrazInternalStore, useGrazSessionStore } from "../../store";
import type { Wallet } from "../../types/wallet";
import { WALLET_TYPES, WalletType } from "../../types/wallet";
import { getCapsule } from "./capsule";
import { getCompass } from "./compass";
import { getCosmiframe } from "./cosmiframe";
import { getMetamaskSnapCosmos } from "./cosmos-metamask-snap";
import { getCosmostation } from "./cosmostation";
import { getInitia } from "./initia";
import { getKeplr } from "./keplr";
import { getLeap } from "./leap";
import { getMetamaskSnapLeap } from "./leap-metamask-snap/leap";
import { getStation } from "./station";
import { getVectis } from "./vectis";
import { getWalletConnect } from "./wallet-connect";
import { getWCClot } from "./wallet-connect/clot";
import { getWCCosmostation } from "./wallet-connect/cosmostation";
import { getWCKeplr } from "./wallet-connect/keplr";
import { getWCLeap } from "./wallet-connect/leap";
import { getXDefi } from "./xdefi";

/**
 * Function to check whether given {@link WalletType} or default configured wallet exists.
 *
 * @example
 * ```ts
 * const isSupported = checkWallet();
 * const isKeplrSupported = checkWallet("keplr");
 * ```
 */
export const checkWallet = (type: WalletType = useGrazInternalStore.getState().walletType): boolean => {
  try {
    getWallet(type);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearSession = () => {
  window.sessionStorage.removeItem(RECONNECT_SESSION_KEY);
  useGrazSessionStore.setState(grazSessionDefaultValues);
};

/**
 * Function to return wallet object based on given {@link WalletType} or from store and throws an error if it does not
 * exist on `window` or unknown wallet type.
 *
 * @example
 * ```ts
 * const wallet = getWallet();
 * const keplr = getWallet("keplr");
 * ```
 *
 * @see {@link getKeplr}
 */
export const getWallet = (type: WalletType = useGrazInternalStore.getState().walletType): Wallet => {
  const wallet = (() => {
    switch (type) {
      case WalletType.KEPLR: {
        return getKeplr();
      }
      case WalletType.LEAP: {
        return getLeap();
      }
      case WalletType.COSMOSTATION: {
        return getCosmostation();
      }
      case WalletType.VECTIS: {
        return getVectis();
      }
      case WalletType.WALLETCONNECT: {
        return getWalletConnect();
      }
      case WalletType.WC_KEPLR_MOBILE: {
        return getWCKeplr();
      }
      case WalletType.WC_LEAP_MOBILE: {
        return getWCLeap();
      }
      case WalletType.WC_COSMOSTATION_MOBILE: {
        return getWCCosmostation();
      }
      case WalletType.WC_CLOT_MOBILE: {
        return getWCClot();
      }
      case WalletType.METAMASK_SNAP_LEAP: {
        return getMetamaskSnapLeap();
      }
      case WalletType.METAMASK_SNAP_COSMOS: {
        return getMetamaskSnapCosmos();
      }
      case WalletType.STATION: {
        return getStation();
      }
      case WalletType.XDEFI: {
        return getXDefi();
      }
      case WalletType.CAPSULE: {
        return getCapsule();
      }
      case WalletType.COSMIFRAME: {
        return getCosmiframe();
      }
      case WalletType.COMPASS: {
        return getCompass();
      }
      case WalletType.INITIA: {
        return getInitia();
      }
      default: {
        throw new Error("Unknown wallet type");
      }
    }
  })();
  const options = useGrazInternalStore.getState().walletDefaultOptions;
  if (options) {
    wallet.setDefaultOptions?.(options);
  }

  return wallet;
};

export const getWalletType = () => {
  return useGrazInternalStore.getState().walletType;
};

export const getAvailableWallets = (): Record<WalletType, boolean> => {
  return Object.fromEntries(WALLET_TYPES.map((type) => [type, checkWallet(type)])) as Record<WalletType, boolean>;
};

export const isCapsule = (type: WalletType): boolean => {
  return type === WalletType.CAPSULE;
};

export const isWalletConnect = (type: WalletType): boolean => {
  return (
    type === WalletType.WALLETCONNECT ||
    type === WalletType.WC_KEPLR_MOBILE ||
    type === WalletType.WC_LEAP_MOBILE ||
    type === WalletType.WC_COSMOSTATION_MOBILE
  );
};

/**
 * Function to get the Ethereum-style address from UInt8Array pubkey
 */
export const getEthereumHexAddress = async (pubkeyUint8Array: Uint8Array) => {
  const pubkeyBuffer = Buffer.from(pubkeyUint8Array);
  const pubkeyHash = keccak256(pubkeyBuffer);
  const ethereumAddress = `0x${pubkeyHash.slice(-40)}`;
  return toChecksumAddress(ethereumAddress);
};

/**
 * Function to apply EIP-55 checksum to an Ethereum address
 */
const toChecksumAddress = (address: string) => {
  const addressHash = crypto.createHash("sha3-256").update(address.slice(2).toLowerCase()).digest("hex");

  let checksumAddress = "0x";
  for (let i = 0; i < address.slice(2).length; i++) {
    const addressHashIndex = addressHash.at(i);
    const addressIndex = addressHash.at(i + 2);

    if (addressHashIndex === undefined || addressIndex === undefined) {
      return address;
    }

    checksumAddress += parseInt(addressHashIndex, 16) > 7 ? addressIndex.toUpperCase() : addressIndex.toLowerCase();
  }

  return checksumAddress;
};
