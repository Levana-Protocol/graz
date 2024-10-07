/// <reference types="../types/global" />
import { OfflineDirectSigner, Coin } from '@cosmjs/proto-signing';
import { Keplr, KeplrIntereactionOptions, Key, ChainInfo, OfflineAminoSigner, AppCurrency } from '@keplr-wallet/types';
import { SignClientTypes } from '@walletconnect/types';
import { Web3ModalConfig } from '@web3modal/standalone';
import * as _cosmjs_cosmwasm_stargate from '@cosmjs/cosmwasm-stargate';
import { SigningCosmWasmClient, InstantiateOptions, CosmWasmClient, InstantiateResult, ExecuteResult, SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClient, StdFee, DeliverTxResponse, QueryClient, StakingExtension, StargateClient, SigningStargateClientOptions } from '@cosmjs/stargate';
import { Height } from 'cosmjs-types/ibc/core/client/v1/client';
import * as _tanstack_react_query from '@tanstack/react-query';
import { UseQueryResult, QueryClientProviderProps } from '@tanstack/react-query';
import * as _leapwallet_cosmos_social_login_capsule_provider from '@leapwallet/cosmos-social-login-capsule-provider';
import { BondStatusString } from '@cosmjs/stargate/build/modules/staking/queries';
import { QueryValidatorsResponse } from 'cosmjs-types/cosmos/staking/v1beta1/query';
import { Tendermint34Client, Tendermint37Client } from '@cosmjs/tendermint-rpc';
import { FC } from 'react';

type Dictionary<T = string> = Record<string, T>;
type Maybe<T> = T | undefined;

declare enum WalletType {
    KEPLR = "keplr",
    LEAP = "leap",
    VECTIS = "vectis",
    COSMOSTATION = "cosmostation",
    WALLETCONNECT = "walletconnect",
    WC_KEPLR_MOBILE = "wc_keplr_mobile",
    WC_LEAP_MOBILE = "wc_leap_mobile",
    WC_COSMOSTATION_MOBILE = "wc_cosmostation_mobile",
    WC_CLOT_MOBILE = "wc_clot_mobile",
    METAMASK_SNAP_LEAP = "metamask_snap_leap",
    METAMASK_SNAP_COSMOS = "metamask_snap_cosmos",
    STATION = "station",
    XDEFI = "xdefi",
    CAPSULE = "capsule",
    COSMIFRAME = "cosmiframe",
    COMPASS = "compass",
    INITIA = "initia",
    OKX = "okx"
}
declare const WALLET_TYPES: WalletType[];
type Wallet = Pick<Keplr, "enable" | "getKey" | "getOfflineSigner" | "getOfflineSignerAuto" | "getOfflineSignerOnlyAmino" | "experimentalSuggestChain" | "signDirect" | "signAmino"> & {
    signArbitrary?: Keplr["signArbitrary"];
    subscription?: (reconnect: () => void) => () => void;
    init?: () => Promise<unknown>;
    disable?: (chainIds?: string | undefined) => Promise<void>;
    setDefaultOptions?: (options: KeplrIntereactionOptions) => void;
    onAfterLoginSuccessful?: () => Promise<void>;
};
type SignDirectParams = Parameters<Wallet["signDirect"]>;
type SignAminoParams = Parameters<Wallet["signAmino"]>;
type KnownKeys = Record<string, Key>;

type ChainId$1 = string | string[];
interface MultiChainHookArgs {
    chainId?: ChainId$1;
    multiChain?: boolean;
}

type ConnectArgs = Maybe<{
    chainId: ChainId$1;
    walletType?: WalletType;
    autoReconnect?: boolean;
}>;
interface ConnectResult {
    accounts: Record<string, Key>;
    walletType: WalletType;
    chains: ChainInfo[];
}
declare const connect: (args?: ConnectArgs) => Promise<ConnectResult>;
declare const disconnect: (args?: {
    chainId?: ChainId$1;
}) => Promise<void>;
type ReconnectArgs = Maybe<{
    onError?: (error: unknown) => void;
}>;
declare const reconnect: (args?: ReconnectArgs) => Promise<ConnectResult | undefined>;
interface OfflineSigners {
    offlineSigner: OfflineAminoSigner & OfflineDirectSigner;
    offlineSignerAmino: OfflineAminoSigner;
    offlineSignerAuto: OfflineAminoSigner | OfflineDirectSigner;
}
declare const getOfflineSigners: (args?: {
    walletType?: WalletType;
    chainId: string;
}) => Promise<OfflineSigners>;
declare const getAccounts: () => Record<string, Key> | null;
declare const subscribeAccounts: (selector: (account: Record<string, Key> | null, previousAccounts: Record<string, Key> | null) => void) => () => void;

declare const clearRecentChain: () => void;
declare const getRecentChainIds: () => string[] | null;
declare const getRecentChains: () => ChainInfo[] | null;
declare const getChainInfo: ({ chainId }: {
    chainId?: string;
}) => ChainInfo | undefined;
declare const getChainInfos: ({ chainId }: {
    chainId?: string[];
}) => ChainInfo[] | undefined;
interface SuggestChainArgs {
    chainInfo: ChainInfo;
    walletType: WalletType;
}
declare const suggestChain: ({ chainInfo, walletType }: SuggestChainArgs) => Promise<ChainInfo>;
interface SuggestChainAndConnectArgs {
    chainInfo: ChainInfo;
    walletType?: WalletType;
    autoReconnect?: boolean;
}
declare const suggestChainAndConnect: (args: SuggestChainAndConnectArgs) => Promise<ConnectResult>;

interface ChainConfig {
    path?: string;
    rpcHeaders?: Dictionary;
    gas?: {
        price: string;
        denom: string;
    };
}
interface WalletConnectStore {
    options: SignClientTypes.Options | null;
    web3Modal?: Pick<Web3ModalConfig, "themeVariables" | "themeMode" | "privacyPolicyUrl" | "termsOfServiceUrl"> | null;
}
interface CapsuleConfig {
    apiKey?: string;
    env?: "DEV" | "SANDBOX" | "BETA" | "PROD";
}
interface CapsuleState {
    showModal: boolean;
    chainId?: string[];
}
interface IframeOptions {
    /**
     * Origins to allow wrapping this app in an iframe and connecting to this Graz
     * instance.
     */
    allowedIframeParentOrigins: string[];
    /**
     * Whether or not to auto connect when in an iframe running Cosmiframe. This
     * will attempt to connect to all chains provided to GrazProvider.
     *
     * Defaults to true.
     */
    autoConnect?: boolean;
}
interface GrazInternalStore {
    recentChainIds: string[] | null;
    capsuleConfig: CapsuleConfig | null;
    capsuleState: CapsuleState | null;
    chains: ChainInfo[] | null;
    chainsConfig: Record<string, ChainConfig> | null;
    iframeOptions: IframeOptions | null;
    /**
     * Graz will use this number to determine how many concurrent requests to make when using `multiChain` args in hooks.
     * Defaults to 3.
     */
    multiChainFetchConcurrency: number;
    walletType: WalletType;
    walletConnect: WalletConnectStore | null;
    walletDefaultOptions: Keplr["defaultOptions"] | null;
    _notFoundFn: () => void;
    _reconnect: boolean;
    _reconnectConnector: WalletType | null;
    _onReconnectFailed: () => void;
}

interface ConfigureGrazArgs {
    defaultWallet?: WalletType;
    chains: ChainInfo[];
    chainsConfig?: Record<string, ChainConfig>;
    capsuleConfig?: CapsuleConfig;
    onNotFound?: () => void;
    onReconnectFailed?: () => void;
    walletConnect?: GrazInternalStore["walletConnect"];
    walletDefaultOptions?: GrazInternalStore["walletDefaultOptions"];
    /**
     * default to true
     */
    autoReconnect?: boolean;
    /**
     * Graz will use this number to determine how many concurrent requests to make when using `multiChain` args in hooks.
     * Defaults to 3.
     */
    multiChainFetchConcurrency?: number;
    /**
     * Options to enable iframe wallet connection.
     */
    iframeOptions?: IframeOptions;
}
declare const configureGraz: (args: ConfigureGrazArgs) => ConfigureGrazArgs;

interface SendTokensArgs {
    signingClient?: SigningStargateClient | SigningCosmWasmClient;
    senderAddress?: string;
    recipientAddress: string;
    amount: Coin[];
    fee: number | StdFee | "auto";
    memo?: string;
}
declare const sendTokens: ({ signingClient, senderAddress, recipientAddress, amount, fee, memo, }: SendTokensArgs) => Promise<DeliverTxResponse>;
interface SendIbcTokensArgs {
    signingClient?: SigningStargateClient;
    senderAddress?: string;
    recipientAddress: string;
    transferAmount: Coin;
    sourcePort: string;
    sourceChannel: string;
    timeoutHeight?: Height;
    timeoutTimestamp?: number;
    fee: number | StdFee | "auto";
    memo?: string;
}
declare const sendIbcTokens: ({ signingClient, senderAddress, recipientAddress, transferAmount, sourcePort, sourceChannel, timeoutHeight, timeoutTimestamp, fee, memo, }: SendIbcTokensArgs) => Promise<DeliverTxResponse>;
interface InstantiateContractArgs<Message extends Record<string, unknown>> {
    signingClient?: SigningCosmWasmClient;
    msg: Message;
    label: string;
    fee: StdFee | "auto" | number;
    options?: InstantiateOptions;
    senderAddress: string;
    codeId: number;
}
type InstantiateContractMutationArgs<Message extends Record<string, unknown>> = Omit<InstantiateContractArgs<Message>, "codeId" | "senderAddress" | "fee"> & {
    fee?: StdFee | "auto" | number;
};
declare const instantiateContract: <Message extends Record<string, unknown>>({ signingClient, senderAddress, msg, fee, options, label, codeId, }: InstantiateContractArgs<Message>) => Promise<_cosmjs_cosmwasm_stargate.InstantiateResult>;
interface ExecuteContractArgs<Message extends Record<string, unknown>> {
    signingClient?: SigningCosmWasmClient;
    msg: Message;
    fee: StdFee | "auto" | number;
    senderAddress: string;
    contractAddress: string;
    funds: Coin[];
    memo: string;
}
type ExecuteContractMutationArgs<Message extends Record<string, unknown>> = Omit<ExecuteContractArgs<Message>, "contractAddress" | "senderAddress" | "fee" | "funds" | "memo"> & {
    fee?: StdFee | "auto" | number;
    funds?: Coin[];
    memo?: string;
};
declare const executeContract: <Message extends Record<string, unknown>>({ signingClient, senderAddress, msg, fee, contractAddress, funds, memo, }: ExecuteContractArgs<Message>) => Promise<_cosmjs_cosmwasm_stargate.ExecuteResult>;
declare const getQuerySmart: <TData>(address: string, queryMsg: Record<string, unknown>, client?: CosmWasmClient) => Promise<TData>;
declare const getQueryRaw: (address: string, keyStr: string, client?: CosmWasmClient) => Promise<Uint8Array | null>;

/**
 * Function to check whether given {@link WalletType} or default configured wallet exists.
 *
 * @example
 * ```ts
 * const isSupported = checkWallet();
 * const isKeplrSupported = checkWallet("keplr");
 * ```
 */
declare const checkWallet: (type?: WalletType) => boolean;
declare const clearSession: () => void;
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
declare const getWallet: (type?: WalletType) => Wallet;
declare const getWalletType: () => WalletType;
declare const getAvailableWallets: () => Record<WalletType, boolean>;
declare const isCapsule: (type: WalletType) => boolean;
declare const isWalletConnect: (type: WalletType) => boolean;
/**
 * Function to get the Ethereum-style address from UInt8Array pubkey
 */
declare const getEthereumHexAddress: (pubkeyUint8Array: Uint8Array) => Promise<string>;

/**
 * Function to return cosmostation object (which is {@link Wallet}) and throws and error if it does not exist on `window`.
 *
 * @example
 * ```ts
 * try {
 *   const cosmostation = getCosmostation();
 * } catch (error: Error) {
 *   console.error(error.message);
 * }
 * ```
 *
 * @see https://docs.cosmostation.io/integration-extension/cosmos/integrate-keplr
 */
declare const getCosmostation: () => Wallet;

/**
 * Function to return {@link Wallet} object and throws and error if it does not exist on `window`.
 *
 * @example
 * ```ts
 * try {
 *   const keplr = getKeplr();
 * } catch (error: Error) {
 *   console.error(error.message);
 * }
 * ```
 *
 * @see https://docs.keplr.app
 */
declare const getKeplr: () => Wallet;

/**
 * Function to return Leap object (which is {@link Wallet}) and throws and error if it does not exist on `window`.
 *
 * @example
 * ```ts
 * try {
 *   const leap = getLeap();
 * } catch (error: Error) {
 *   console.error(error.message);
 * }
 * ```
 *
 * @see https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/add-leap-to-existing-keplr-integration
 */
declare const getLeap: () => Wallet;

/**
 * Function to return {@link Wallet} object and throws and error if it does not exist on `window`.
 *
 * @example
 * ```ts
 * try {
 *   const leapMetamaskSnap = getMetamaskSnapLeap();
 * } catch (error: Error) {
 *   console.error(error.message);
 * }
 * ```
 *
 *
 */
declare const getMetamaskSnapLeap: () => Wallet;

/**
 * Function to return {@link Wallet} object and throws and error if it does not exist on `window`.
 *
 * @example
 * ```ts
 * try {
 *   const vectis = getVectis();
 * } catch (error: Error) {
 *   console.error(error.message);
 * }
 * ```
 *
 *
 */
declare const getVectis: () => Wallet;

interface GetWalletConnectParams {
    encoding: BufferEncoding;
    walletType: WalletType.WC_KEPLR_MOBILE | WalletType.WC_LEAP_MOBILE | WalletType.WC_COSMOSTATION_MOBILE | WalletType.WC_CLOT_MOBILE;
    appUrl: {
        mobile: {
            ios: string;
            android: string;
        };
    };
    formatNativeUrl: (appUrl: string, wcUri: string, os?: "android" | "ios") => string;
}

declare const getWalletConnect: (params?: GetWalletConnectParams) => Wallet;

declare const getWCCosmostation: () => Wallet;

declare const getWCKeplr: () => Wallet;

declare const getWCLeap: () => Wallet;

/**
 * Helper function to define chain information records (key values).
 *
 * This function does not do anything special else than providing type safety
 * when defining chain informations.
 *
 * @example
 * ```ts
 * import { connect, defineChains } from "graz";
 *
 * const myChains = defineChains({
 *    cosmoshub: {
 *      rpc: "https://rpc.cosmoshub.strange.love",
 *      rest: "https://api.cosmoshub.strange.love",
 *      chainId: "cosmoshub-4",
 *      ...
 *    },
 * });
 *
 * connect(myChains.cosmoshub);
 * ```
 */
declare const defineChains: <T extends Dictionary<ChainInfo>>(chains: T) => T;
/**
 * Helper function to define Keplr's `ChainInfo` object.
 *
 * This function does not do anything special else than providing type safety
 * when defining chain information.
 *
 * @example
 * ```ts
 * import { defineChainInfo } from "graz";
 *
 * const cosmoshub = defineChainInfo({
 *   chainId: "cosmoshub-4",
 *   currencies: [ ... ],
 *   path: "cosmoshub",
 *   rest: "https://lcd-cosmoshub.blockapsis.com/",
 *   rpc: "https://rpc-cosmoshub.ecostake.com/",
 *   ...
 * });
 * ```
 */
declare const defineChainInfo: <T extends ChainInfo>(chain: T) => T;

interface MutationEventArgs<TInitial = unknown, TSuccess = TInitial> {
    onError?: (error: unknown, data: TInitial) => unknown;
    onLoading?: (data: TInitial) => unknown;
    onSuccess?: (data: TSuccess) => unknown;
}
type ChainId = string;
type UseMultiChainQueryResult<TMulti extends MultiChainHookArgs, TData> = UseQueryResult<TMulti["multiChain"] extends true ? Record<ChainId, TData> : TData>;
interface QueryConfig {
    enabled?: boolean;
}

interface UseAccountArgs {
    onConnect?: (args: ConnectResult & {
        isReconnect: boolean;
    }) => void;
    onDisconnect?: () => void;
}
interface UseAccountResult<TMulti extends MultiChainHookArgs> {
    data?: TMulti["multiChain"] extends true ? Record<string, Key | undefined> : Key | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
    isReconnecting: boolean;
    isLoading: boolean;
    reconnect: (args?: ReconnectArgs) => Promise<ConnectResult | undefined>;
    status: string;
    walletType?: WalletType;
}
/**
 * graz query hook to retrieve account data with optional arguments to invoke
 * given function on connect/disconnect.
 *
 * @example
 * ```tsx
 * import { useAccount } from "graz";
 *
 * // basic example
 * const { data:account, isConnecting, isConnected, ... } = useAccount();
 * account.bech32Address
 * // multichain example
 * const { data: accounts, isConnecting, isConnected, ... } = useAccount({ chainId: ["cosmoshub-4", "sommelier-3"], multiChain: true });
 * accounts['cosmoshub-4'].bech32Address
 * // with event arguments
 * useAccount({
 *   onConnect: ({ account, isReconnect }) => { ... },
 *   onDisconnect: () => { ... },
 * });
 * ```
 */
declare const useAccount: <TMulti extends MultiChainHookArgs>(args?: UseAccountArgs & TMulti) => UseAccountResult<TMulti>;
/**
 * graz query hook to retrieve list of balances from current account or given address.
 *
 * @param bech32Address - Optional bech32 account address, defaults to connected account address
 *
 * @example
 * ```ts
 * import { useBalances } from "graz";
 *
 * // basic example
 * const { data, isFetching, refetch, ... } = useBalances();
 *
 * // multichain example
 * const { data:balances, isFetching, refetch, ... } = useBalances({chainId: ["cosmoshub-4", "sommelier-3"] multiChain: true});
 * const cosmoshubBalances = balances["cosmoshub-4"]
 *
 * ```
 */
declare const useBalances: <TMulti extends MultiChainHookArgs>(args?: {
    bech32Address?: string;
} & TMulti & QueryConfig) => UseMultiChainQueryResult<TMulti, Coin[]>;
/**
 * graz query hook to retrieve specific asset balance from current account or given address.
 *
 * @param denom - Asset denom to search
 * @param bech32Address - Optional bech32 account address, defaults to connected account address
 *
 * @example
 * ```ts
 * import { useBalance } from "graz";
 *
 * // basic example
 * const { data, isFetching, refetch, ... } = useBalance({denom: "atom"});
 *
 * // with custom bech32 address
 * useBalance("atom", "cosmos1kpzxx2lxg05xxn8mfygrerhmkj0ypn8edmu2pu");
 * ```
 */
declare const useBalance: <TMulti extends MultiChainHookArgs>(args: {
    denom?: string;
    bech32Address?: string;
} & {
    chainId: ChainId$1;
} & QueryConfig) => UseMultiChainQueryResult<TMulti, Coin | undefined>;
type UseConnectChainArgs = MutationEventArgs<ConnectArgs, ConnectResult>;
/**
 * graz mutation hook to execute wallet connection with optional arguments to
 * invoke given functions on error, loading, or success event.
 *
 * @example
 * ```ts
 * import { useConnect, mainnetChains } from "graz";
 *
 * // basic example
 * const { connect, isLoading, isSuccess, ... } = useConnect();
 *
 * // with event arguments
 * useConnect({
 *   onError: (err, chain) => { ... },
 *   onLoading: (chain) => { ... },
 *   onSuccess: (account) => { ... },
 * });
 *
 * // use graz provided chain information
 * connect(mainnetChains.cosmos);
 *
 * // use custom chain information
 * connect({
 *  chain:{
 *    rpc: "https://rpc.juno.strange.love",
 *    rest: "https://api.juno.strange.love",
 *    chainId: "juno-1",
 *    ...
 *   }
 * });
 * ```
 *
 * @see {@link connect}
 */
declare const useConnect: ({ onError, onLoading, onSuccess }?: UseConnectChainArgs) => {
    connect: (args?: ConnectArgs) => void;
    connectAsync: (args?: ConnectArgs) => Promise<ConnectResult>;
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    isSupported: boolean;
    status: "error" | "success" | "pending" | "idle";
};
/**
 * graz mutation hook to execute wallet disconnection with optional arguments to
 * invoke given functions on error, loading, or success event.
 *
 * @example
 * ```ts
 * import { useDisconnect } from "graz";
 *
 * // basic eaxmple
 * const { disconnect, isLoading, isSuccess, ... } = useDisconnect();
 *
 * // with event arguments
 * useDisconnect({
 *   onError: (err) => { ... },
 *   onLoading: () => { ... },
 *   onSuccess: () => { ... },
 * });
 *
 * // pass `true` on disconnect to clear recent connected chain
 * disconnect(true);
 * ```
 *
 * @see {@link disconnect}
 */
declare const useDisconnect: ({ onError, onLoading, onSuccess }?: MutationEventArgs) => {
    disconnect: (args?: {
        chainId?: ChainId$1;
    }) => void;
    disconnectAsync: (args?: {
        chainId?: ChainId$1;
    }) => Promise<void>;
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    status: "error" | "success" | "pending" | "idle";
};
/**
 * graz hook to retrieve offline signer objects (default, amino enabled, and auto).
 *
 * Note: signer objects is initialized after connecting an account.
 *
 * @example
 * ```ts
 *
 * // basic example
 * import { useOfflineSigners } from "graz";
 * const { offlineSigner, offlineSignerAmino, offlineSignerAuto } = useOfflineSigners();
 *
 * // multichain example
 * const offlineSigners = useOfflineSigners({chainId: ["cosmoshub-4", "sommelier-3"] multiChain: true});
 * const cosmoshubOfflineSigners = offlineSigners["cosmoshub-4"]
 *
 * ```
 */
declare const useOfflineSigners: <TMulti extends MultiChainHookArgs>(args?: TMulti) => UseMultiChainQueryResult<TMulti, OfflineSigners>;
/**
 * graz query hook to retrieve list of staked balances from current account or given address.
 *
 * @param bech32Address - Optional bech32 account address, defaults to connected account address
 *
 * @example
 * ```ts
 * import { useBalanceStaked } from "graz";
 *
 * // basic example
 * const { data, isFetching, refetch, ... } = useBalanceStaked();
 *
 * // multichain example
 * const { data:balanceStaked, isFetching, refetch, ... } = useBalanceStaked({chainId: ["cosmoshub-4", "sommelier-3"] multiChain: true});
 * const cosmoshubBalanceStaked = balances["cosmoshub-4"]
 *
 * // with custom bech32 address
 * useBalanceStaked({ bech32Address: "cosmos1kpzxx2lxg05xxn8mfygrerhmkj0ypn8edmu2pu"});
 * ```
 */
declare const useBalanceStaked: <TMulti extends MultiChainHookArgs>(args?: {
    bech32Address?: string;
} & TMulti) => UseMultiChainQueryResult<TMulti, Coin>;

declare const useCapsule: () => {
    setModalState: (state: boolean) => void;
    modalState: boolean;
    client: _leapwallet_cosmos_social_login_capsule_provider.CapsuleProvider | null;
    onAfterLoginSuccessful: (() => Promise<void>) | undefined;
    onLoginFailure: () => void;
};

/**
 * graz hook to retrieve connected account's active chainIds
 *
 * @example
 * ```ts
 * import { useActiveChainIds } from "graz";
 * const activeChainIds = useActiveChainIds();
 * ```
 */
declare const useActiveChainIds: () => string[] | null;
/**
 * graz hook to retrieve connected account's active chains
 *
 * @example
 * ```ts
 * import { useActiveChains } from "graz";
 * const activeChains = useActiveChains();
 * const { rpc, rest, chainId, currencies } = activeChains[0];
 * ```
 */
declare const useActiveChains: () => ChainInfo[] | undefined;
/**
 * graz hook to retrieve ChainInfo object from GrazProvider with given chainId
 *
 * @param chainId - chainId to search
 *
 * @example
 * ```ts
 * import { useChain } from "graz";
 * const chainInfo = useChainInfo({chainId: "cosmoshub-4"});
 * ```
 */
declare const useChainInfo: ({ chainId }: {
    chainId?: string;
}) => ChainInfo | undefined;
/**
 * graz hook to retrieve ChainInfo objects from GrazProvider with given chainId
 *
 * @param chainId - chainId to search
 *
 * @example
 * ```ts
 * import { useChainInfos } from "graz";
 * const chainInfos = useChainInfos({chainId: ["cosmoshub-4", "juno-1"]});
 * ```
 */
declare const useChainInfos: ({ chainId }: {
    chainId?: string[];
}) => ChainInfo[] | undefined;
/**
 * graz hook to retrieve specific connected chains currency
 *
 * @param denom - Currency denom to search
 *
 * @example
 * ```ts
 * import { useActiveChainCurrency } from "graz";
 * const { data: currency, ... } = useActiveChainCurrency({denom: "juno"});
 * ```
 */
declare const useActiveChainCurrency: ({ denom }: {
    denom: string;
}) => UseQueryResult<AppCurrency | undefined>;
/**
 * graz hook to retrieve active chain validators with given query client and optional bond status
 *
 * @param queryClient - \@cosmjs/stargate query client object with {@link StakingExtension}
 * @param status - Validator bond status string (defaults to BOND_STATUS_BONDED)
 *
 * @example
 * ```ts
 * import { useActiveChainValidators, useQueryClient } from "graz";
 * import { setupStakingExtension } from "@cosmjs/stargate";
 *
 * const queryClient = useQueryClient(setupStakingExtension);
 * const { data: response, ... } = useActiveChainValidators(queryClient);
 * ```
 */
declare const useQueryClientValidators: <T extends QueryClient & StakingExtension>(args: {
    queryClient: T | undefined;
    status?: BondStatusString;
}) => UseQueryResult<QueryValidatorsResponse>;
/**
 * graz hook to retrieve last connected chainIds
 *
 * @example
 * ```ts
 * import { useRecentChainIds, connect, mainnetChains } from "graz";
 * const { data: recentChainIds, clear } = useRecentChainIds();
 * try {
 *   connect(mainnetChains.cosmos);
 * } catch {
 *   connect(recentChainIds);
 * }
 * ```
 *
 * @see {@link useActiveChainIds}
 */
declare const useRecentChainIds: () => {
    data: string[] | null;
    clear: () => void;
};
/**
 * graz hook to retrieve last connected chains
 *
 * @example
 * ```ts
 * import { useRecentChains, connect, mainnetChains } from "graz";
 *
 * const recentChains = useRecentChains();
 * const { rpc, rest, chainId, currencies } = activeChains[0];
 * ```
 *
 * @see {@link useActiveChains}
 */
declare const useRecentChains: () => {
    data: ChainInfo[] | undefined;
    clear: () => void;
};
type UseSuggestChainArgs = MutationEventArgs<ChainInfo>;
/**
 * graz mutation hook to suggest chain to a Wallet
 *
 * @example
 * ```ts
 * import { useSuggestChain } from "graz";
 * const { suggest, isLoading, isSuccess, ... } = useSuggestChain();
 *
 * suggest({
 *    rpc: "https://rpc.cosmoshub.strange.love",
 *    rest: "https://api.cosmoshub.strange.love",
 *    chainId: "cosmoshub-4",
 *    ...
 * });
 * ```
 */
declare const useSuggestChain: ({ onError, onLoading, onSuccess }?: UseSuggestChainArgs) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    suggest: _tanstack_react_query.UseMutateFunction<ChainInfo, Error, SuggestChainArgs, unknown>;
    suggestAsync: _tanstack_react_query.UseMutateAsyncFunction<ChainInfo, Error, SuggestChainArgs, unknown>;
    status: "error" | "success" | "pending" | "idle";
};
type UseSuggestChainAndConnectArgs = MutationEventArgs<SuggestChainAndConnectArgs, ConnectResult>;
/**
 * graz mutation hook to suggest chain to a Wallet and connect account
 * afterwards
 *
 * @example
 * ```ts
 * import { useSuggestChainAndConnect } from "graz";
 *
 * // basic example
 * const { suggestAndConnect } = useSuggestChainAndConnect();
 *
 * // with event arguments
 * useSuggestChainAndConnect({
 *   onError: (err, chainInfo) => { ... },
 *   onLoading: () => { ... },
 *   onSuccess: ({ account, chain }) => { ... },
 * });
 *
 * // suggest and connect usage
 * suggestAndConnect({
 *   chainInfo: {
 *     rpc: "https://rpc.cosmoshub.strange.love",
 *     rest: "https://api.cosmoshub.strange.love",
 *     chainId: "cosmoshub-4",
 *     ...
 *   },
 *   ...
 * });
 * ```
 */
declare const useSuggestChainAndConnect: ({ onError, onLoading, onSuccess }?: UseSuggestChainAndConnectArgs) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    isSupported: boolean;
    status: "error" | "success" | "pending" | "idle";
    suggestAndConnect: _tanstack_react_query.UseMutateFunction<ConnectResult, Error, SuggestChainAndConnectArgs, unknown>;
    suggestAndConnectAsync: _tanstack_react_query.UseMutateAsyncFunction<ConnectResult, Error, SuggestChainAndConnectArgs, unknown>;
};

/**
 * graz query hook to retrieve a StargateClient.
 *
 * @example
 * ```ts
 * import { useStargateClient } from "graz";
 *
 * // single chain
 * const { data:client, isFetching, refetch, ... } = useStargateClient();
 * await client.getAccount("address")
 *
 * // multi chain
 * const { data:clients, isFetching, refetch, ... } = useStargateClient({multiChain: true, chainId: ["cosmoshub-4", "sommelier-3"]});
 * await clients["cosmoshub-4"].getAccount("address")
 *
 * ```
 */
declare const useStargateClient: <TMulti extends MultiChainHookArgs>(args?: TMulti & QueryConfig) => UseMultiChainQueryResult<TMulti, StargateClient>;
/**
 * graz query hook to retrieve a CosmWasmClient.
 *
 * @example
 * ```ts
 * import { useCosmWasmClient } from "graz";
 *
 * //single chain
 * const { data:client, isFetching, refetch, ... } = useCosmWasmClient();
 * await client.getAccount("address")
 *
 * // multi chain
 * const { data:clients, isFetching, refetch, ... } = useCosmWasmClient({multiChain: true, chainId: ["cosmoshub-4", "sommelier-3"]});
 * await clients["cosmoshub-4"].getAccount("address")
 *
 * ```
 */
declare const useCosmWasmClient: <TMulti extends MultiChainHookArgs>(args?: TMulti & QueryConfig) => UseMultiChainQueryResult<TMulti, CosmWasmClient>;
/**
 * graz query hook to retrieve a TendermintClient.
 *
 * @example
 * ```ts
 * import { useTendermintClient } from "graz";
 *
 * //single chain
 * const { data:client, isFetching, refetch, ... } = useTendermintClient({type: "tm37"});
 * await client.getAccount("address")
 *
 * // multi chain
 * const { data:clients, isFetching, refetch, ... } = useTendermintClient({type: "tm34", multiChain: true, chainId: ["cosmoshub-4", "sommelier-3"]});
 * await clients["cosmoshub-4"].getAccount("address")
 * ```
 */
declare const useTendermintClient: <T extends "tm34" | "tm37", TMulti extends MultiChainHookArgs>({ type, chainId, multiChain, enabled, }: {
    type: T;
} & TMulti & QueryConfig) => UseMultiChainQueryResult<TMulti, T extends "tm34" ? Tendermint34Client : Tendermint37Client>;

/**
 * graz mutation hook to send tokens. Note: if `senderAddress` undefined, it will use current connected account address.
 *
 * @example
 * ```ts
 * import { useSendTokens, useStargateSigningClient } from "graz";
 *
 * // basic example
 * const { data: signingClient } = useStargateSigningClient()
 * const { sendTokens } = useSendTokens();
 *
 * sendTokens({
 *    signingClient,
 *    recipientAddress: "cosmos1g3jjhgkyf36pjhe7u5cw8j9u6cgl8x929ej430";
 *    amount: [coin];
 *    ...
 * })
 * ```
 *
 * @see {@link sendTokens}
 */
declare const useSendTokens: ({ onError, onLoading, onSuccess, }?: MutationEventArgs<SendTokensArgs, DeliverTxResponse>) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    sendTokens: _tanstack_react_query.UseMutateFunction<DeliverTxResponse, Error, SendTokensArgs, unknown>;
    sendTokensAsync: _tanstack_react_query.UseMutateAsyncFunction<DeliverTxResponse, Error, SendTokensArgs, unknown>;
    status: "error" | "success" | "pending" | "idle";
};
/**
 * graz mutation hook to send IBC tokens. Note: if `senderAddress` undefined, it will use current connected account address.
 *
 *
 * @example
 * ```ts
 * import { useSendIbcTokens, useStargateSigningClient } from "graz";
 *
 * // basic example
 * const { data: signingClient } = useStargateSigningClient()
 * const { sendIbcTokens } = useSendIbcTokens();
 *
 * sendIbcTokens({
 *    signingClient,
 *    recipientAddress: "cosmos1g3jjhgkyf36pjhe7u5cw8j9u6cgl8x929ej430",
 *    transferAmount: coin,
 *    ...
 * })
 * ```
 */
declare const useSendIbcTokens: ({ onError, onLoading, onSuccess, }?: MutationEventArgs<SendIbcTokensArgs, DeliverTxResponse>) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    sendIbcTokens: _tanstack_react_query.UseMutateFunction<DeliverTxResponse, Error, SendIbcTokensArgs, unknown>;
    sendIbcTokensAsync: _tanstack_react_query.UseMutateAsyncFunction<DeliverTxResponse, Error, SendIbcTokensArgs, unknown>;
    status: "error" | "success" | "pending" | "idle";
};
type UseInstantiateContractArgs<Message extends Record<string, unknown>> = {
    codeId: number;
} & MutationEventArgs<InstantiateContractMutationArgs<Message>, InstantiateResult>;
/**
 * graz mutation hook to instantiate a CosmWasm smart contract when supported.
 *
 * @example
 * ```ts
 * import { useInstantiateContract, useCosmwasmSigningClient } from "graz"
 *
 * const { data: signingClient } = useCosmwasmSigningClient()
 * const { instantiateContract: instantiateMyContract } = useInstantiateContract({
 *   codeId: 4,
 *   onSuccess: ({ contractAddress }) => console.log('Address:', contractAddress)
 * })
 *
 * const instantiateMessage = { foo: 'bar' };
 * instantiateMyContract({
 *  signingClient,
 *  msg: instatiateMessage,
 *  label: "test"
 * });
 * ```
 */
declare const useInstantiateContract: <Message extends Record<string, unknown>>({ codeId, onError, onLoading, onSuccess, }: UseInstantiateContractArgs<Message>) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    instantiateContract: _tanstack_react_query.UseMutateFunction<InstantiateResult, Error, InstantiateContractMutationArgs<Message>, unknown>;
    instantiateContractAsync: _tanstack_react_query.UseMutateAsyncFunction<InstantiateResult, Error, InstantiateContractMutationArgs<Message>, unknown>;
    status: "error" | "success" | "pending" | "idle";
};
type UseExecuteContractArgs<Message extends Record<string, unknown>> = {
    contractAddress: string;
} & MutationEventArgs<ExecuteContractMutationArgs<Message>, ExecuteResult>;
/**
 * graz mutation hook for executing transactions against a CosmWasm smart
 * contract.
 *
 * @example
 * ```ts
 * import { useExecuteContract, useCosmWasmSigningClient } from "graz"
 *
 * interface GreetMessage {
 *   name: string;
 * }
 *
 * interface GreetResponse {
 *   message: string;
 * }
 *
 * const contractAddress = "cosmosfoobarbaz";
 *
 * const { data: signingClient } = useCosmWasmSigningClient()
 * const { executeContract } = useExecuteContract<ExecuteMessage>({ contractAddress });
 *
 * executeContract({
 *  signingClient,
 *  msg: {
 *    foo: "bar"
 *  }}, {
 *    onSuccess: (data: GreetResponse) => console.log('Got message:', data.message);
 *  });
 * ```
 */
declare const useExecuteContract: <Message extends Record<string, unknown>>({ contractAddress, onError, onLoading, onSuccess, }: UseExecuteContractArgs<Message>) => {
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
    executeContract: _tanstack_react_query.UseMutateFunction<ExecuteResult, Error, ExecuteContractMutationArgs<Message>, unknown>;
    executeContractAsync: _tanstack_react_query.UseMutateAsyncFunction<ExecuteResult, Error, ExecuteContractMutationArgs<Message>, unknown>;
    status: "error" | "success" | "pending" | "idle";
};
/**
 * graz query hook for dispatching a "smart" query to a CosmWasm smart
 * contract.
 *
 * @param address - The address of the contract to query
 * @param queryMsg - The query message to send to the contract
 * @returns A query result with the result returned by the smart contract.
 */
declare const useQuerySmart: <TData, TError>(args?: {
    address?: string;
    queryMsg?: Record<string, unknown>;
}) => UseQueryResult<TData, TError>;
/**
 * graz query hook for dispatching a "raw" query to a CosmWasm smart contract.
 *
 * @param address - The address of the contract to query
 * @param key - The key to lookup in the contract storage
 * @returns A query result with raw byte array stored at the key queried.
 */
declare const useQueryRaw: <TError>(args?: {
    address?: string;
    key?: string;
}) => UseQueryResult<Uint8Array | null, TError>;

interface SiginingClientSinglechainArgs<T> {
    multiChain?: false;
    opts?: T;
}
interface SiginingClientMultichainArgs<T> {
    multiChain?: true;
    opts?: Record<string, T>;
}
interface BaseSigningClientArgs extends QueryConfig {
    chainId?: ChainId$1;
    offlineSigner?: "offlineSigner" | "offlineSignerAuto" | "offlineSignerOnlyAmino";
}
declare function useStargateSigningClient(args?: BaseSigningClientArgs & SiginingClientSinglechainArgs<SigningStargateClientOptions>): UseQueryResult<SigningStargateClient | null>;
declare function useStargateSigningClient(args?: BaseSigningClientArgs & SiginingClientMultichainArgs<SigningStargateClientOptions>): UseQueryResult<Record<string, SigningStargateClient | null>>;
declare function useCosmWasmSigningClient(args?: BaseSigningClientArgs & SiginingClientSinglechainArgs<SigningCosmWasmClientOptions>): UseQueryResult<SigningCosmWasmClient | null>;
declare function useCosmWasmSigningClient(args?: BaseSigningClientArgs & SiginingClientMultichainArgs<SigningCosmWasmClientOptions>): UseQueryResult<Record<string, SigningCosmWasmClient | null>>;
declare function useStargateTmSigningClient(args: {
    type: "tm34" | "tm37";
} & BaseSigningClientArgs & SiginingClientSinglechainArgs<SigningStargateClientOptions>): UseQueryResult<SigningStargateClient | null>;
declare function useStargateTmSigningClient(args: {
    type: "tm34" | "tm37";
} & BaseSigningClientArgs & SiginingClientMultichainArgs<SigningStargateClientOptions>): UseQueryResult<Record<string, SigningStargateClient | null>>;
declare function useCosmWasmTmSigningClient(args: {
    type: "tm34" | "tm37";
} & BaseSigningClientArgs & SiginingClientSinglechainArgs<SigningCosmWasmClientOptions>): UseQueryResult<SigningCosmWasmClient | null>;
declare function useCosmWasmTmSigningClient(args: {
    type: "tm34" | "tm37";
} & BaseSigningClientArgs & SiginingClientMultichainArgs<SigningCosmWasmClientOptions>): UseQueryResult<Record<string, SigningCosmWasmClient | null>>;

/**
 * graz hook to retrieve current active {@link WalletType}
 *
 * @example
 * ```ts
 * import { useActiveWalletType } from "graz";
 * const { walletType } = useActiveWalletType();
 * ```
 */
declare const useActiveWalletType: () => {
    walletType: WalletType;
    isCosmostation: boolean;
    isCosmostationMobile: boolean;
    isKeplr: boolean;
    isKeplrMobile: boolean;
    isLeap: boolean;
    isLeapMobile: boolean;
    isVectis: boolean;
    isWalletConnect: boolean;
    isMetamaskSnapLeap: boolean;
    isStation: boolean;
    isCapsule: boolean;
    isCosmiframe: boolean;
};
/**
 * graz query hook to check whether given {@link WalletType} or default configured wallet is supported
 *
 * @example
 * ```ts
 * import { useCheckWallet } from "graz";
 *
 * const { data: isSupported } = useCheckWallet();
 * const { data: isKeplrSupported } = useCheckWallet("keplr");
 * ```
 */
declare const useCheckWallet: (type?: WalletType) => UseQueryResult<boolean>;

type GrazProviderProps = Partial<QueryClientProviderProps> & {
    grazOptions: ConfigureGrazArgs;
};
/**
 * Provider component which extends `@tanstack/react-query`'s {@link QueryClientProvider} with built-in query client
 * and various `graz` side effects
 *
 * @example
 * ```tsx
 * // example next.js application in _app.tsx
 * export default function CustomApp({ Component, pageProps }: AppProps) {
 *   return (
 *     <GrazProvider>
 *       <Component {...pageProps} />
 *     </GrazProvider>
 *   );
 * }
 * ```
 *
 * @see https://tanstack.com/query
 */
declare const GrazProvider: FC<GrazProviderProps>;

/**
 * Graz custom hook to track `keplr_keystorechange`, `leap_keystorechange`, `accountChanged` event and reconnect state
 *
 * **Note: only use this hook if not using graz's provider component.**
 */
declare const useGrazEvents: () => null;
/**
 * Null component to run {@link useGrazEvents} without affecting component tree.
 *
 * **Note: only use this component if not using graz's provider component.**
 */
declare const GrazEvents: FC;

export { ConfigureGrazArgs, ConnectArgs, ConnectResult, Dictionary, ExecuteContractArgs, ExecuteContractMutationArgs, GrazEvents, GrazProvider, GrazProviderProps, InstantiateContractArgs, InstantiateContractMutationArgs, KnownKeys, Maybe, OfflineSigners, ReconnectArgs, SendIbcTokensArgs, SendTokensArgs, SignAminoParams, SignDirectParams, SuggestChainAndConnectArgs, SuggestChainArgs, UseAccountArgs, UseAccountResult, UseConnectChainArgs, UseExecuteContractArgs, UseInstantiateContractArgs, UseSuggestChainAndConnectArgs, UseSuggestChainArgs, WALLET_TYPES, Wallet, WalletType, checkWallet, clearRecentChain, clearSession, configureGraz, connect, defineChainInfo, defineChains, disconnect, executeContract, getAccounts, getAvailableWallets, getChainInfo, getChainInfos, getCosmostation, getEthereumHexAddress, getKeplr, getLeap, getMetamaskSnapLeap, getOfflineSigners, getQueryRaw, getQuerySmart, getRecentChainIds, getRecentChains, getVectis, getWCCosmostation, getWCKeplr, getWCLeap, getWallet, getWalletConnect, getWalletType, instantiateContract, isCapsule, isWalletConnect, reconnect, sendIbcTokens, sendTokens, subscribeAccounts, suggestChain, suggestChainAndConnect, useAccount, useActiveChainCurrency, useActiveChainIds, useActiveChains, useActiveWalletType, useBalance, useBalanceStaked, useBalances, useCapsule, useChainInfo, useChainInfos, useCheckWallet, useConnect, useCosmWasmClient, useCosmWasmSigningClient, useCosmWasmTmSigningClient, useDisconnect, useExecuteContract, useGrazEvents, useInstantiateContract, useOfflineSigners, useQueryClientValidators, useQueryRaw, useQuerySmart, useRecentChainIds, useRecentChains, useSendIbcTokens, useSendTokens, useStargateClient, useStargateSigningClient, useStargateTmSigningClient, useSuggestChain, useSuggestChainAndConnect, useTendermintClient };
